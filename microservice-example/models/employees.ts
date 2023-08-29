import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { createEmployeeZodSchema } from "../util/schemas/employeeZodSchema";
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
    From
      employees
    ${paginatedQuery};`;
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("employee_id", "employees");
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};

export const addEmployee = async (reqBody: any) => {
  try {
    const createEmployeeSchema = await createEmployeeZodSchema.parse(reqBody);

    const {
      employee_id,
      last_name,
      first_name,
      title,
      title_of_courtesy,
      birth_date,
      hire_date,
      address,
      city,
      region,
      postal_code,
      country,
      home_phone,
      extension,
      photo,
      notes,
      reports_to,
      photo_path,
      territory_id
    } = createEmployeeSchema;
    
    const databaseQuery = 
    `BEGIN;
    INSERT INTO
      employees (employee_id, last_name, first_name, title, title_of_courtesy, birth_date, hire_date, address, city, region, postal_code, country, home_phone, extension, photo, notes, reports_to, photo_path)
    VALUES (${employee_id}, ${last_name}, ${first_name}, ${title}, ${title_of_courtesy}, ${birth_date}, ${hire_date}, ${address}, ${city}, ${region}, ${postal_code}, ${country}, ${home_phone}, ${extension}, ${photo}, ${notes}, ${reports_to}, ${photo_path});
    INSERT INTO
      employee_territories (employee_id, territory_id)
    VALUES (${employee_id}, ${territory_id});
    COMMIT;`;
    const queryData = await client.query(databaseQuery);
    return queryData;
  } catch (error) {
    throw error;
  }
};