// src/modules/travellers/api/updateTraveller.handler.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function updateTravellerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = (req as any).userId;
  const { traveller_id } = req.query;
  const { name, age, gender, passport } = req.body;

  if (!traveller_id) {
    return res.status(400).json({ message: 'Traveller ID is required' });
  }

  try {
    // Check if the traveller belongs to the user
    const existing = await prisma.traveller.findUnique({
      where: { id: String(traveller_id) },
    });

    if (!existing || existing.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this traveller' });
    }

    const updated = await prisma.traveller.update({
      where: { id: String(traveller_id) },
      data: {
        name,
        age,
        gender,
        passport,
      },
    });

    return res.status(200).json({ traveller: updated });
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
