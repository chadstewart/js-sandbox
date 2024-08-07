import { client } from "../services/database";
import { ROW_LIMIT } from "./row-limit";

export const totalPaginationPages = async (columnName: string, tableName: string, inputtedRowLimit = ROW_LIMIT) => {
  const totalCountQuery = `SELECT COUNT(${columnName}) FROM ${tableName};`;
  const totalCountData = await client.query(totalCountQuery);
  const totalPages = Math.ceil(Number(totalCountData.rows[0].count) / inputtedRowLimit);
  return totalPages;
};