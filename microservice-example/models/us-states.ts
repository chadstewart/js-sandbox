import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { totalPaginationPages } from "../util/total-pagination-pages";

export const usStates = async (page = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery =
  `SELECT
      state_id,
      state_name,
      state_abbr,
      state_region
    FROM
      us_states
    ${paginatedQuery};`;
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("state_id", "us_states");
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};