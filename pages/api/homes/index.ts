import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    const { method, body } = req;
    switch (method) {
        case 'POST':
            try {
                const { image, title, description, price, guests, beds, baths, country, state, address } = body;
                const user = await prisma.user.findUnique({
                    where: { email: session.user?.email as string },
                });
                const priceInt = parseInt(price);
                const guestsInt = parseInt(guests);
                const bedsInt = parseInt(beds);
                const bathsInt = parseInt(baths);
                const home = await prisma.home.create({
                    data: {
                        image,
                        title,
                        description,
                        price: priceInt,
                        guests: guestsInt,
                        beds: bedsInt,
                        baths: bathsInt,
                        country,
                        state,
                        address,
                        ownerId: user?.id as any,
                    },
                });
                res.status(201).json({ home, message: 'Home has been added successfully' });
            } catch (error) {
                console.log('error after uploading: ', error);
                res.status(500).json({ message: 'Something went wrong please try again.', error });
            }
    }
}
