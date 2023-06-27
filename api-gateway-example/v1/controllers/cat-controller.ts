import { Request, Response } from "express";

interface CatImageApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default async function getCatImage (req: Request, res: Response) {
  try {
    const apiResponse = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await apiResponse.json() as unknown as CatImageApiResponse[];
    const catImgUrl = data[0].url;

    return res.status(200).json({
      status: "success",
      data: {
        catImgUrl: catImgUrl
      }
    });
  } catch ( error ) {
    return res.status(500).json({
      status: "failed",
      data: {
        error: error
      }
    })
  }
}