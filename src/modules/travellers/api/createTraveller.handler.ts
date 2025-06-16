// src/modules/travellers/api/createTraveller.handler.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createTravellerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // ✅ Fix: move log AFTER declaration
  const userId = (req as any).userId;
  console.log("Decoded userId:", userId);
  console.log("Request body:", req.body);

  const { name, age, gender, passport } = req.body;

  // ✅ Fix: Correct field names and validation
  if (!userId || !name || !age || !gender || !passport) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const traveller = await prisma.traveller.create({
      data: {
        name,
        age,
        gender,
        passport,
        userId,
      },
    });

    console.log("Traveller created:", traveller);
    return res.status(201).json({ traveller });
  } catch (error) {
    console.error('Error creating traveller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
