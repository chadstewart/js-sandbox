import { ROW_LIMIT } from "./row-limit";

export const addPagination = (pageNumber = 1, inputtedRowLimit = ROW_LIMIT) => {
  const offsetForQuery = pageNumber * inputtedRowLimit;
  const query = " " + `LIMIT ${inputtedRowLimit} OFFSET ${offsetForQuery}`;
  return query;
};