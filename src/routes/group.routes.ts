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
  private check_create_form =       [
    check('name', 'Name is empty').notEmpty(), // validation group name
  ]
  private router = Router();
  groupRouter():Router {
    this.router.post('/group/create', autorization, this.check_create_form, this.create_group_controller)
    this.showGroups();
    this.showGroupById();
    this.deleteGroupById();
    this.updateGroupById();
    return this.router;
  }
  async create_group_controller(req: Request, res: Response):Promise<void> {
        try {
          const errors = validationResult(req); // check register tamplated validation
          if (!errors.isEmpty()) {
            serverMessage(res, 400, { errors: errors.array(), message: 'Incorrect data' });
            return;
          }
          const { name, description } = req.body;
          const group_exists: IGroup | null = await Group.findOne({ name }); // check group in DB
          if (group_exists) {
            serverMessage(res, 400, { message: 'This group already exists' });
            return;
          }
          const userId: string = getIdByHeaderToken(res, req);
          const user: IUser | null = await User.findById(userId);
          if (!user?.admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const group = new Group({ name, description, owner: userId }); // create new group
          await group.save();
          serverMessage(res, 201, { message: 'Group created' });
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
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
            .sort(sort);
          const response = await Promise.all(groups.map(async (group: IGroup) => {
            if (!group._id?.toString()) {
              return {};
            }
            const users: IUser[] = await this.checkUsersInGroup(group._id?.toString());
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
          const group: IGroup | null = await Group.findById(req.params?.id);
          if (!group) {
            serverMessage(res, 404, { message: 'Not found 404' });
            return;
          };
          if (!group._id?.toString()) {
            serverMessage(res, 500, { message: 'Server Error' });
            return;
          };
          const response = {
            _id: group._id?.toString(),
            name: group.name,
            description: group.description,
            create: group.create,
            users: await this.checkUsersInGroup(group._id?.toString()),
          };
          res.json(response);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  deleteGroupById():void {
    //endpoint ===> /api/group/:id
    this.router.delete(
      '/group/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const deletedId = req.params.id;
          const userId: string = getIdByHeaderToken(res, req);
          const admin: IUser | null = await User.findById(userId);
          if (!admin?.admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const usersArray: IUser[] = await this.checkUsersInGroup(req.params?.id);
          if (usersArray.length) {
            serverMessage(res, 400, { message: 'Group not empty' });
            return;
          }
          const group: IGroup | null = await Group.findById(deletedId);
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
    //endpoint ===> /api/group/:id
    this.router.patch(
      '/group/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser | null = await User.findById(userId) as IUser;
          const usersArray: IUser[] = await this.checkUsersInGroup(req.params?.id);
          if (usersArray.length) {
            serverMessage(res, 400, { message: 'Group not empty' });
            return;
          }
          if (user.admin) {
            const group: IGroup | null = await Group.findById(req.params?.id);
            if (!group) {
              serverMessage(res, 404, { message: 'Not found 404' });
              return;
            }
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
