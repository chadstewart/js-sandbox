import { prisma } from "../services/database";
import { prismaPaginationHelper } from "../util/pagination-helper";

export const employeeFromTerritories = async (page = 1, territoryId = 1) => {
  const { skip, take } = prismaPaginationHelper(page);
  const query = await prisma.employee_territories.findMany({
    include: {
      employees: {
        select: {
          employee_id: true,
          last_name: true,
          first_name: true,
          title: true,
          hire_date: true,
          photo: true
        }
      },
      territories: {
        include: {
          region: {
            select: {
              region_description: true
            }
          }
        }
      }
    },
    where: {
      territory_id: `${territoryId}`
    },
    skip,
    take
  });
  const totalRows = await prisma.employees.count();
  const data = {
    query,
    totalRows
  };
  return data;
};