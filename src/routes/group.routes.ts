import { Router, Response, Request } from 'express';
import { check, validationResult } from 'express-validator';
import { Group } from '../models/groups';
import { User } from '../models/user';
import { IGroup, IUser, IGroupApi, IQueryParams, IPaginationsParams } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';
import getPaginationsParams from '../helps/getPaginationsParams';

export default class GroupApi implements IGroupApi {
  private router = Router();
  groupRouter():Router {
    this.createGroup();
    this.showGroups();
    this.showGroupById();
    this.deleteGroupById();
    this.updateTaskById();
    return this.router;
  }
  createGroup():void {
    //endpoint ===> /api/group/create
    this.router.post(
      '/group/create',
      autorization,
      [
        check('name', 'Name is empty').notEmpty(), // validation group name
      ],
      async (req: Request, res: Response) => {
        try {
          const errors = validationResult(req); // check register tamplated validation
          if (!errors.isEmpty()) {
            serverMessage(res, 400, { message: 'Incorrect data' });
            return;
          }
          const { name, description } = req.body;
          const isMatch: IGroup = await Group.findOne({ name }) as IGroup; // check group in DB
          if (isMatch) {
            serverMessage(res, 400, { message: 'This group already exists' });
            return;
          }
          const userId: string = getIdByHeaderToken(res, req) as string;
          const admin: IUser = await User.findById(userId) as IUser;
          if (!admin.admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const group = new Group({ name, description, owner: userId }) as IGroup; // create new group
          await group.save();
          serverMessage(res, 201, { message: 'Group created' });
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' + e });
        }
      });
  }
  showGroups():void {
    //endpoint ===> /api/groups
    this.router.get(
      '/groups',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const query: IQueryParams = req.query;
          const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
          const sort = {
            [Object.keys(query)[0]]: Object.values(query)[0],
          };
          const groups: IGroup[] = await Group.find()
            .limit(pagination.limit)
            .skip(pagination.skip)
            .sort(sort) as IGroup[];
          res.json(groups);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  showGroupById():void {
    //endpoint ===> /api/group/:id
    this.router.get(
      '/group/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group: IGroup = await Group.findById(req.params?.id) as IGroup;
          res.json(group);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  deleteGroupById():void {
    //endpoint ===> /api/group/delete/:id
    this.router.delete(
      '/group/delete/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const deletedId = req.params.id;
          const userId: string = getIdByHeaderToken(res, req) as string;
          const admin: IUser = await User.findById(userId) as IUser;
          if (!admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const isEmpty: boolean = await this.checkUsersInGroup(deletedId);
          if (isEmpty) {
            serverMessage(res, 400, { message: 'Group not empty' });
            return;
          }
          const group: IGroup = await Group.findById(deletedId) as IGroup;
          if (!group) {
            serverMessage(res, 400, { message: 'Group not faund' });
            return;
          }
          await User.updateMany({
            groups: {
              $elemMatch: {
                $eq: group,
              },
            },
          },
          {
            $pull: {
              groups: deletedId,
            },
          });
          await group.delete();
          serverMessage(res, 200, { message: 'Group deleted' });
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  updateTaskById():void {
    //endpoint ===> /api/group/edit/:id
    this.router.put(
      '/group/edit/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser = await User.findById(userId) as IUser;
          const isEmpty: boolean = await this.checkUsersInGroup(req.params?.id);
          if (isEmpty) {
            serverMessage(res, 400, { message: 'Group not empty' });
            return;
          }
          if (user.admin) {
            const group: IGroup = await Group.findById(req.params?.id) as IGroup;
            const { name, description } = req.body;
            const updateParams = {
              name,
              description,
            };
            await group.updateOne( updateParams);
            await group.save();
            serverMessage(res, 200, { message: 'Group update' });
          } else {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
          }
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  async checkUsersInGroup(group_id: string): Promise<boolean> {
    const users: IUser[] = await User.find({
      groups: {
        $elemMatch: {
          $eq: group_id,
        },
      },
    }) as IUser[];
    return users.length ? true : false;
  }
}
