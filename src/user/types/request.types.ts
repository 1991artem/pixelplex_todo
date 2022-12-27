import { Request } from 'express';
import { GetStatisticsParams } from './params.types';
/*
1. Params
2. Response
3. Body
4. Query
*/

export type GetStatisticsRequest = Request<GetStatisticsParams>;
