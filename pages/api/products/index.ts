// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { connectDatabase } from "@lib/database";

import Product from "@models/product";
import Features from "@lib/classes/api-features";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  await connectDatabase();
  switch (method) {
    case "POST":
      try {
        const product = await Product.create(body);
        res.status(200).json({
          message: "Product has been added successfully.",
          product,
        });
      } catch (error) {
        res.status(500).json(error);
      }
    case "GET":
      try {
        const apiFeature = new Features(
          Product.find(),
          req.query as { keyword: string }
        )
          .search()
          .filter();
        const products = await apiFeature.query;
        res.status(200).json({
          message: "Products fetched successfully.",
          products,
        });
      } catch (error) {
        res.status(401).json(error);
      }
  }
}
