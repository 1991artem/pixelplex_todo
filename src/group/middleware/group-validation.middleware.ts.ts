import { Schema } from 'express-validator';
import { SORT_FIELD, SORT_TYPE } from '../../helps/enums';

export default class GroupValidation {
  static  validationCreateGroupBody: Schema = {
      name: {
        notEmpty: true,
        trim: true,
        unescape: true,
        errorMessage: 'Name cannot be missing',
      },
      description: {
        trim: true,
        unescape: true,
      }
    }

    static  validationPaginationQueryParams: Schema = {
      'pagination.[limit]': {
        in: "query",
        trim: true,
        unescape: true,
        isInt: true,
        toInt: true,
        optional: true,
        custom: {
          options: value => value >=0
        },
        errorMessage: 'Pagination params is wrong',
      },
      'pagination.[offset]': {
        in: "query",
        trim: true,
        unescape: true,
        isInt: true,
        toInt: true,
        optional: true,
        custom: {
          options: value => value >=0
        },
        errorMessage: 'Pagination params is wrong',
      },
      'sort.[type]': {
        in: "query",
        isIn: {
          options: [Object.values(SORT_TYPE)],
        },
        trim: true,
        unescape: true,
        optional: true,
        errorMessage: 'Sort params is wrong',
      },
      'sort.[field]': {
        in: "query",
        isIn: {
          options: [Object.values(SORT_FIELD)],
        },
        trim: true,
        unescape: true,
        optional: true,
        errorMessage: 'Sort params is wrong',
      }
    }

    static  validationIdParams: Schema = {
      id: {
        in: 'params',
        trim: true,
        isInt: true,
        toInt: true,
        errorMessage: 'ID is wrong',
      }
    }

    static  validationUserIdGroupIdInBody: Schema = {
      userId: {
        trim: true,
        isInt: true,
        unescape: true,
        notEmpty: true,
        errorMessage: 'userId is wrong',
      },
      groupId: {
        trim: true,
        isInt: true,
        unescape: true,
        notEmpty: true,
        errorMessage: 'groupId is wrong',
      }
    }
}
