import { SortOrder } from 'mongoose';
import { IQueryParams } from './interfaces';

type params = {[key: string]: SortOrder};

const getSortParams = (query: IQueryParams): params => {
  const keys = Object.keys(query);
  const values = Object.values(query);
  return Object.fromEntries(
    keys.map((key: string, index: number) => [key, values[index] as SortOrder]),
  );
};

export default getSortParams;
