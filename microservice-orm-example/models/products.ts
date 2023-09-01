import { client } from "../services/database";
import { addPagination } from "../util/pagination-helper";
import { totalPaginationPages } from "../util/total-pagination-pages";

export const products = async (page = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery =
  `SELECT
      product_id,
      product_name,
      unit_price,
      units_in_stock,
      units_on_order,
      discontinued
    FROM
      products
    ${paginatedQuery};`;
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("product_id", "products");
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};

export const productDetails = async (productId = 1) => {
  const databaseQuery =
  `Select
      suppliers.supplier_id,
      categories.category_id,
      products.product_id,
      product_name,
      unit_price,
      category_name,
      description,
      company_name,
      contact_name,
      contact_title,
      homepage    
    From
      products
    LEFT JOIN
      categories on products.category_id=categories.category_id
    LEFT JOIN
      suppliers on products.supplier_id=suppliers.supplier_id
    WHERE
      products.product_id='${productId}';`;
  const queryData = await client.query(databaseQuery);
  return queryData;
};