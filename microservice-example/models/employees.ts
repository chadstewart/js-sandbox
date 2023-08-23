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

export const employeeFromTerritories = async (page = 1, territoryId = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery =
  `Select
      employees.employee_id,
      first_name,
      last_name,
      title
      hire_date,
      photo,
      territory_description,
      region_description
    From
      employee_territories
    LEFT JOIN employees on employees.employee_id=employee_territories.employee_id
    LEFT JOIN territories on employee_territories.territory_id=territories.territory_id
    LEFT JOIN region on territories.region_id=region.region_id;`;
    //${paginatedQuery}
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("employee_id", "employees");
  const data = {
    ...queryData,
    //totalPages
  };
  return data;
};