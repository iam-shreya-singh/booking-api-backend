// src/modules/travellers/api/getTravellers.handler.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getTravellersHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = (req as any).userId;

  try {
    const travellers = await prisma.traveller.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({ travellers });
  } catch (error) {
    console.error('Error fetching travellers:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
