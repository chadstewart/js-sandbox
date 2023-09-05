import { client } from "../services/database";
import { addPagination, prismaPaginationHelper } from "../util/pagination-helper";
import { totalPaginationPages } from "../util/total-pagination-pages";
import { prisma } from "../services/database";

export const usStates = async (page = 1) => {
  const paginatedQuery = addPagination(page);
  const databaseQuery =
  `SELECT
      state_id,
      state_name,
      state_abbr,
      state_region
    FROM
      us_states
    ${paginatedQuery};`;
  const queryData = await client.query(databaseQuery);
  const totalPages = await totalPaginationPages("state_id", "us_states");
  const data = {
    ...queryData,
    totalPages
  };
  return data;
};

export const usStatesPrisma = async ( page = 1 ) => {
  const { skip, take } = prismaPaginationHelper(page);
  const queryData = await prisma.us_states.findMany({
    select: {
      state_id: true,
      state_name: true,
      state_abbr: true,
      state_region: true
    },
    skip,
    take
  });
  const num_of_states = await prisma.us_states.count({
    select: {
      state_id: true
    }
  });
  const data = {
    queryData,
    num_of_states
  };
  return data;
}