import zod from "zod";
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

export const updateCustomerTableZodSchema = zod.object({
  company_name: zod.string(),
  contact_name: zod.string(),
  contact_title: zod.string(),
  address: zod.string(),
  city: zod.string(),
  region: zod.string(),
  postal_code: zod.string(),
  country: zod.string(),
  phone: zod.string(),
  fax: zod.string()
});

export const updateCustomer = async (customerId: string, reqBody: any) => {
  try {
    await updateCustomerTableZodSchema.parse(reqBody);

    const {
      company_name,
      contact_name,
      contact_title,
      address,
      city,
      region,
      postal_code,
      country,
      phone,
      fax
    } = reqBody;

    const databaseQuery =
    `UPDATE
      customers
    SET
      company_name='${company_name}',
      contact_name='${contact_name}',
      contact_title='${contact_title}',
      address='${address}',
      city='${city}',
      region='${region}',
      postal_code='${postal_code}',
      country='${country}',
      phone='${phone}',
      fax='${fax}'
    WHERE
      customer_id='${customerId}'`;
    return await client.query(databaseQuery);
  } catch (error) {
    console.log(error);
    throw error;
  }
};