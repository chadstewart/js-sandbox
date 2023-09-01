import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { addOrdersZodSchema } from "../util/schemas/addOrdersZodSchema";
import { totalPaginationPages } from "../util/total-pagination-pages";

export const orders = async (page = 1) => {
  const paginatedQuery = addPagination(page);
  
  const databaseQuery =
  `SELECT
      order_id,
      order_date,
      shipped_date,
      ship_via
    FROM
      orders
    ${paginatedQuery};`;
  
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("order_id", "orders");
  
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

  return await client.query(databaseQuery);
};

export const addOrderNewCustomer = async (reqBody: any) => {
  try {
    const addOrdersSchema = addOrdersZodSchema.parse(reqBody);

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
    
    const latestCustomerIdsQuery = 
    `SELECT
      customer_id
    FROM
      customers
    ORDER BY
      customer_id DESC
    LIMIT 1;`;
  
    const latestOrderIdsQuery = 
    `SELECT
      order_id
    FROM
      orders
    ORDER BY
      order_id DESC
    LIMIT 1;`;
  
    const newOrderId = (await client.query(latestOrderIdsQuery)).rows[0].order_id + 1;
    const newCustomerId = (await client.query(latestCustomerIdsQuery)).rows[0].customer_id + 1;
  
    const databaseQuery = 
    `BEGIN;
    INSERT INTO
      order_details (order_id, employee_id, order_date, required_date, shipped_date, ship_via, frieght, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
    VALUES (${newOrderId}, ${employee_id}, ${order_date}, ${required_date}, ${shipped_date}, ${ship_via}, ${frieght}, ${ship_name}, ${ship_address}, ${ship_city}, ${ship_region}, ${ship_postal_code}, ${ship_country});
    INSERT INTO
      orders (order_id, customer_id, product_id, unit_price, quantity, discount)
    VALUES (${newOrderId}, ${newCustomerId} ${product_id}, ${unit_price}, ${quantity}, ${discount});
    INSERT INTO
      customers (customer_id company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax)
    VALUES (${newCustomerId} ${company_name}, ${contact_name}, ${contact_title}, ${address}, ${city}, ${region}, ${postal_code}, ${country}, ${phone}, ${fax});
    END;`;

    return await client.query(databaseQuery);
  } catch (error) {
    throw error;
  }
};

export const addOrderExistingCustomer = async (reqBody: any) => {
  try {
    const addOrdersSchema = addOrdersZodSchema.parse(reqBody);

    const {
      orders: {
        customer_id,
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
      order_details (order_id, employee_id, order_date, required_date, shipped_date, ship_via, frieght, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
    VALUES (${newOrderId}, ${employee_id}, ${order_date}, ${required_date}, ${shipped_date}, ${ship_via}, ${frieght}, ${ship_name}, ${ship_address}, ${ship_city}, ${ship_region}, ${ship_postal_code}, ${ship_country});
    INSERT INTO
      orders (order_id, customer_id, product_id, unit_price, quantity, discount)
    VALUES (${newOrderId}, ${customer_id} ${product_id}, ${unit_price}, ${quantity}, ${discount});
    END;`;

    return await client.query(databaseQuery);
  } catch (error) {
    throw error;
  }
};