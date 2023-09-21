import { prisma } from "../services/database";
import { prismaPaginationHelper } from "../util/pagination-helper";
import { updateCustomerZodSchema } from "../util/schemas/update-customer-zod-schema";

export const customers = async (page = 1) => {
  const { skip, take } = prismaPaginationHelper(page);
  const queryData = await prisma.customers.findMany({
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
    queryData,
    totalPages
  };
  return data;
};

export const customerDetails = async (customerId: string) => {
  const queryData = await prisma.customers.findMany({
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

    const queryData = await prisma.customers.update({
      where: {
        customer_id: customerId
      },
      data: {
        contact_name,
        contact_title,
        address,
        city,
        region,
        postal_code,
        country,
        phone,
        fax
      }
    });
    return queryData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};