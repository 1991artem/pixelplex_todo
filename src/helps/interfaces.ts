import { Document, SchemaDefinitionProperty } from 'mongoose';

export interface IConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  connectTimeoutMS?: number;
}

export interface IUser extends Document {
  _id?: SchemaDefinitionProperty<string>;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  groups: Array<SchemaDefinitionProperty<string>>
}