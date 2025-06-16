// src/modules/travellers/api/createTraveller.handler.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createTravellerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = (req as any).userId;
  const { name, age, passportNumber } = req.body;

  if (!name || !age || !passportNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const traveller = await prisma.traveller.create({
      data: {
        name,
        age,
        passportNumber,
        userId,
      },
    });

    return res.status(201).json({ traveller });
  } catch (error) {
    console.error('Error creating traveller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
