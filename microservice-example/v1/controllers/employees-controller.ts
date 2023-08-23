import { Request, Response, NextFunction } from "express";
import { employeeFromTerritories, employees } from "../../models/employees";

export async function getEmployees (req: Request, res: Response, next: NextFunction) {
  let page = 1;

  const isPageNumberInRoute = req.params.page;
  if(isPageNumberInRoute) page = Number(req.params.page);

  const isPageNumberNaN = Number.isNaN(page);
  if(isPageNumberNaN) return res.status(400).json({
    status: "failed",
    error: "employees/'page' must be a number"
  });

  const data = await employees(page);

  return res.status(200).json({
    status: "success",
    data: data
  });
};

export async function getEmployeesByTerritories (req: Request, res: Response, next: NextFunction) {
  const data = await employeeFromTerritories();

  return res.status(200).json({
    status: "success",
    data: data
  });
};