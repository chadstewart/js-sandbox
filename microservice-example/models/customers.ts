import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { totalPaginationPages } from "../util/total-pagination-pages";

export const customers = async (page = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery =
  `SELECT
      customer_id,
      company_name,
      contact_name,
      contact_title
    FROM
      customers
    ${paginatedQuery};`;
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("product_id", "products");
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};

export const customerDetails = async (customerId: string) => {
  const databaseQuery =
  `Select
      customers.customer_id,
      company_name,
      contact_name,
      contact_title,
      customer_desc    
    From
      customers
    LEFT JOIN
      customer_customer_demo on customers.customer_id=customer_customer_demo.customer_id
    LEFT JOIN
      customer_demographics on customer_customer_demo.customer_type_id=customer_demographics.customer_type_id
    WHERE
      customers.customer_id='${customerId}';`;
  const queryData = await client.query(databaseQuery);
  return queryData;
};