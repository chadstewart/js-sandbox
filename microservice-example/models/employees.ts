import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { totalPaginationPages } from "../util/total-pagination-pages";

export const employees = async (page = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery =
  `Select
      employee_id,
      first_name,
      last_name,
      title
      hire_date,
      photo
    From employees${paginatedQuery};`;
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("employee_id", "employees");
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};