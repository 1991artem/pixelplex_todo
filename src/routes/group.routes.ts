import { Router, Response, Request } from 'express';
import { check, validationResult } from 'express-validator';
import { Group } from '../models/groups';
import { User } from '../models/user';
import { IGroup, IUser, IGroupApi, IQueryParams, IPaginationsParams } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';
import getPaginationsParams from '../helps/getPaginationsParams';
import getSortParams from '../helps/getSortParams';

export default class GroupApi implements IGroupApi {
  private router = Router();
  groupRouter():Router {
    this.createGroup();
    this.showGroups();
    this.showGroupById();
    this.deleteGroupById();
    this.updateGroupById();
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
          const sort = query ? getSortParams(query) : {};
          const groups: IGroup[] = await Group.find()
            .limit(pagination.limit)
            .skip(pagination.skip)
            .sort(sort) as IGroup[];
          const response = await Promise.all(groups.map(async (group: IGroup) => {
            const users: IUser[] = await this.checkUsersInGroup(group._id?.toString() as string);
            return {
              _id: group._id?.toString() as string,
              name: group.name,
              description: group.description,
              create: group.create,
              users: users.length,
            };
          }));
          res.json(response);
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
          const response = {
            _id: group._id?.toString() as string,
            name: group.name,
            description: group.description,
            create: group.create,
            users: await this.checkUsersInGroup(group._id?.toString() as string),
          };
          res.json(response);
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
          const usersArray: IUser[] = await this.checkUsersInGroup(req.params?.id) as IUser[];
          if (usersArray.length) {
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
  updateGroupById():void {
    //endpoint ===> /api/group/edit/:id
    this.router.patch(
      '/group/edit/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser = await User.findById(userId) as IUser;
          const usersArray: IUser[] = await this.checkUsersInGroup(req.params?.id) as IUser[];
          if (usersArray.length) {
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
  async checkUsersInGroup(group_id: string): Promise<IUser[]> {
    const users: IUser[] = await User.find({
      groups: {
        $elemMatch: {
          $eq: group_id,
        },
      },
    }) as IUser[];
    return users;
  }
}
