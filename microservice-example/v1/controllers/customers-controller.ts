import { Request, Response, NextFunction } from "express";
import { customers, customerDetails } from "../../models/customers";

export async function getCustomers (req: Request, res: Response, next: NextFunction) {
  let page = 1;

  const isPageNumberInRoute = req.params.page;
  if(isPageNumberInRoute) page = Number(req.params.page);

  const isPageNumberNaN = Number.isNaN(page);
  if(isPageNumberNaN) return res.status(400).json({
    status: "failed",
    error: "customers/'page' must be a number"
  });

  const data = await customers(page);

  return res.status(200).json({
    status: "success",
    data: data
  });
};

export async function getCustomerDetails (req: Request, res: Response, next: NextFunction) {
  let customerId = "";

  const isCustomerIdInRoute = req.params.customer_id;
  if(isCustomerIdInRoute) customerId = req.params.customer_id;

  const data = await customerDetails(customerId);

  return res.status(200).json({
    status: "success",
    data: data
  });
};