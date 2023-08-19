import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";

export const orders = (page = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery = `SELECT * FROM orders${paginatedQuery};`;
  return client.query(databaseQuery);
};