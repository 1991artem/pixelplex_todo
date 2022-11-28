import { checkSchema, Schema } from 'express-validator';
import { SORT_FIELD, SORT_TYPE } from '../../types/enums';

export default class GroupParamsValidation {
  static  validationCreateGroupBody = checkSchema({
      name: {
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: 'Name cannot be missing',
      },
      description: {
        trim: true,
        escape: true,
      }
    })

    static  validationUpdateGroupBody = checkSchema({
      name: {
        notEmpty: true,
        trim: true,
        escape: true,
        optional: true,
        errorMessage: 'Name cannot be missing',
      },
      description: {
        trim: true,
        escape: true,
        optional: true,
      }
    })

    static  validationPaginationQueryParams = checkSchema({
      'pagination.[limit]': {
        in: "query",
        trim: true,
        escape: true,
        isInt: true,
        optional: true,
        custom: {
          options: value => value >=0
        },
        errorMessage: 'Pagination params is wrong',
      },
      'pagination.[offset]': {
        in: "query",
        trim: true,
        escape: true,
        isInt: true,
        optional: true,
        custom: {
          options: value => value >=0
        },
        errorMessage: 'Pagination params is wrong',
      },
      'sort.[type]': {
        in: "query",
        toLowerCase: true,
        isIn: {
          options: [Object.values(SORT_TYPE)],
        },
        trim: true,
        escape: true,
        optional: true,
        errorMessage: 'Sort params is wrong',
      },
      'sort.[field]': {
        in: "query",
        toLowerCase: true,
        isIn: {
          options: [Object.values(SORT_FIELD)],
        },
        trim: true,
        escape: true,
        optional: true,
        errorMessage: 'Sort params is wrong',
      }
    })

    static  validationIdParams = checkSchema({
      id: {
        in: 'params',
        trim: true,
        isInt: true,
        errorMessage: 'ID is wrong',
      }
    })

    static  validationUserIdGroupIdInBody = checkSchema({
      userId: {
        trim: true,
        isInt: true,
        escape: true,
        notEmpty: true,
        errorMessage: 'userId is wrong',
      },
      groupId: {
        trim: true,
        isInt: true,
        escape: true,
        notEmpty: true,
        errorMessage: 'groupId is wrong',
      }
    })
}
