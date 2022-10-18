import { connectDatabase } from "@lib/database";
import Product from "@models/product";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDatabase();
  const {
    method,
    query: { id },
    body,
  } = req;
  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);
        if (!product) {
          res.status(404).json({
            message: "Product not found.",
          });
        }
        return res.status(200).json({
          message: "Product has been fetched successfully",
          product,
        });
      } catch (error) {
        res.status(500).json(error);
      }
    case "PUT":
      try {
        let product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({
            message: "Product not found.",
          });
        }
        product = await Product.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        return res.status(200).json({
          message: "Product has been updated successfully.",
          product,
        });
      } catch (error) {
        res.status(500).json(error);
      }
    case "DELETE":
      try {
        const product = await Product.findById(id);
        if (!product) {
          return res.status(404).json({
            message: "Product not found.",
          });
        }
        await product.remove();
        return res.status(200).json({
          message: "Product has been successfully deleted.",
        });
      } catch (error) {
        res.status(500).json(error);
      }
  }
};
export default handler;
