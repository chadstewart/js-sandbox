import { prismaPaginationHelper } from "../util/pagination-helper";
import { prisma } from "../services/database";

export const usStates = async ( page = 1 ) => {
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
  const num_of_states = await prisma.us_states.count();
  const data = {
    queryData,
    num_of_states
  };
  return data;
}