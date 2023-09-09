import { client, prisma } from "../services/database";
import { generateCustomerId } from "../util/generate-customer-id";
import { addPagination, prismaPaginationHelper } from "../util/pagination-helper";
import { addOrdersExistingCustomerZodSchema, addOrdersNewCustomerZodSchema } from "../util/schemas/add-orders-zod-schema";
import { totalPaginationPages } from "../util/total-pagination-pages";

export const orders = async (page = 1) => {
  const { skip, take } = prismaPaginationHelper(page);
  const queryData = await prisma.orders.findMany({
    select: {
      order_id: true,
      order_date: true,
      shipped_date: true,
      ship_via: true
    },
    skip,
    take
  });

  const totalPages = await prisma.orders.count();
  
  const data = {
    ...queryData,
    totalPages
  };

  return data;
};

export const orderDetails = async (orderId = 0) => {
  const databaseQuery = 
  `SELECT
      order_details.order_id,
      products.product_name,
      order_details.unit_price,
      order_details.quantity,
      orders.order_date,
      orders.shipped_date
    FROM
      order_details
    LEFT JOIN
      products on order_details.product_id=products.product_id
    LEFT JOIN
      orders on order_details.order_id=orders.order_id
    WHERE
      order_details.order_id='${orderId}';`;

  const data = await client.query(databaseQuery);
  return data;
};

export const addOrderNewCustomer = async (reqBody: any) => {
  try {
    const addOrdersSchema = await addOrdersNewCustomerZodSchema.parse(reqBody);

    const {
      orders: {
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        frieght,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country
      },
      order_details: {
        product_id,
        unit_price,
        quantity,
        discount
      },
      customers: {
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
      }
    } = addOrdersSchema;
  
    const latestOrderIdsQuery = 
    `SELECT
      order_id
    FROM
      orders
    ORDER BY
      order_id DESC
    LIMIT 1;`;
  
    const newOrderId = (await client.query(latestOrderIdsQuery)).rows[0].order_id + 1;

    const newCustomerId = generateCustomerId(contact_name);
  
    const databaseQuery = 
    `BEGIN;
    INSERT INTO
      customers (customer_id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax)
    VALUES ('${newCustomerId}', '${company_name}', '${contact_name}', '${contact_title}', '${address}', '${city}', '${region}', '${postal_code}', '${country}', '${phone}', '${fax}');
    INSERT INTO
      orders (order_id, customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
    VALUES (${newOrderId}, '${newCustomerId}', ${employee_id}, '${order_date}', '${required_date}', '${shipped_date}', '${ship_via}', '${frieght}', '${ship_name}', '${ship_address}', '${ship_city}', '${ship_region}', '${ship_postal_code}', '${ship_country}');
    INSERT INTO
      order_details (order_id, product_id, unit_price, quantity, discount)
    VALUES (${newOrderId}, ${product_id}, ${unit_price}, ${quantity}, ${discount});
    END;`;

    const data = await client.query(databaseQuery);
    return data;
  } catch (error) {
    throw error;
  }
};

export const addOrderExistingCustomer = async (reqBody: any, customer_id: string) => {
  try {
    const addOrdersSchema = await addOrdersExistingCustomerZodSchema.parse(reqBody);
    
    const {
      orders: {
        employee_id,
        order_date,
        required_date,
        shipped_date,
        ship_via,
        frieght,
        ship_name,
        ship_address,
        ship_city,
        ship_region,
        ship_postal_code,
        ship_country
      },
      order_details: {
        product_id,
        unit_price,
        quantity,
        discount
      }
    } = addOrdersSchema;

    const latestOrderIdsQuery = 
    `SELECT
      order_id
    FROM
      orders
    ORDER BY
      order_id DESC
    LIMIT 1;`;
  
    const newOrderId = (await client.query(latestOrderIdsQuery)).rows[0].order_id + 1;
  
    const databaseQuery = 
    `BEGIN;
    INSERT INTO
      orders (order_id, customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
    VALUES (${newOrderId}, '${customer_id}', ${employee_id}, '${order_date}', '${required_date}', '${shipped_date}', '${ship_via}', '${frieght}', '${ship_name}', '${ship_address}', '${ship_city}', '${ship_region}', '${ship_postal_code}', '${ship_country}');
    INSERT INTO
      order_details (order_id, product_id, unit_price, quantity, discount)
    VALUES (${newOrderId}, ${product_id}, ${unit_price}, ${quantity}, ${discount});
    END;`;

    const data = await client.query(databaseQuery);
    return data;
  } catch (error) {
    throw error;
  }
};