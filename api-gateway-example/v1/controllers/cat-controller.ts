import { Request, Response } from "express";
import zod from "zod";
import { createZodFetcher } from "zod-fetch";

export default async function getCatImage (req: Request, res: Response) {
  const fetchWithZod = createZodFetcher();

  try {
    const data = await fetchWithZod(
      zod.array(
        zod.object({
          id: zod.string(),
          url: zod.string(),
          width: zod.number(),
          height: zod.number()
        })
      ),
      "https://api.thecatapi.com/v1/images/search"
    );
    
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

};