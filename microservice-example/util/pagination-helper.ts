import { ROW_LIMIT } from "./row-limit";

export const addPagination = (inputtedRowLimit = ROW_LIMIT, pageNumber = 1) => {
  const offsetForQuery = pageNumber * inputtedRowLimit;
  const query = " " + `LIMIT ${inputtedRowLimit} OFFSET ${offsetForQuery}`;
  return query;
};