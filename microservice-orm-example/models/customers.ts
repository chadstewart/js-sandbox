import { client, prisma } from "../services/database";
import { prismaPaginationHelper } from "../util/pagination-helper";
import { updateCustomerZodSchema } from "../util/schemas/update-customer-zod-schema";

export const customers = async (page = 1) => {
  const { skip, take } = prismaPaginationHelper(page);
  const queryData = prisma.customers.findMany({
    select: {
      customer_id: true,
      company_name: true,
      contact_name: true,
      contact_title: true
    },
    skip,
    take
  });
  const totalPages = prisma.customers.count();
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};

export const customerDetails = async (customerId: string) => {
  const queryData = prisma.customers.findMany({
    select: {
      customer_id: true,
      company_name: true,
      contact_name: true,
      contact_title: true,
      customer_customer_demo: {
        select: {
          customer_demographics: true
        }
      }
    },
    where: {
      customer_id: customerId
    }
  });
  return queryData;
};

export const updateCustomer = async (customerId: string, reqBody: any) => {
  try {
    const updateCustomerSchema = await updateCustomerZodSchema.parse(reqBody);

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
    } = updateCustomerSchema;

    const databaseQuery =
    `UPDATE
      customers
    SET
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
      customer_id='${customerId}';`;
    return await client.query(databaseQuery);
  } catch (error) {
    console.log(error);
    throw error;
  }
};