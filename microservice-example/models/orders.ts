import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { ROW_LIMIT } from "../util/row-limit";

export const orders = (page = 1) => {
  const paginatedQuery = addPagination(ROW_LIMIT, page);
  const databaseQuery = `SELECT * FROM orders${paginatedQuery};`;
  return client.query(databaseQuery);
};