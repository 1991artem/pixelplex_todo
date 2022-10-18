import { IGroup, ITask, IUser, SortDataFunction } from './interfaces';

type Sort = IGroup | IUser | ITask;

const sortData: SortDataFunction = (query, data) => {
  const sortData = data;
for(const params in query){
  if(query[params] > 0){
    sortData.sort((a: Sort,b: Sort)=> a[params] < b[params] ? -1 : 1);
  } else {
    sortData.sort((a: Sort,b: Sort)=> a[params] > b[params] ? -1 : 1);
  }
  }
  return sortData;
}

export default sortData;