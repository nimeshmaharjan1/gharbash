import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { image, title, description, price, guests, beds, baths, country, state, address } = body;
        const home = await prisma.home.create({
          data: { image, title, description, price, guests, beds, baths, country, state, address },
        });
        res.status(201).json({ home, message: "Home has been added successfully" });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong please try again.", error });
      }
  }
}
