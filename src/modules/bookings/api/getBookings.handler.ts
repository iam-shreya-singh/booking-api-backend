import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function getBookingsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = (req as any).userId;
  const { status } = req.query;

  if (!status || (status !== 'upcoming' && status !== 'completed')) {
    return res.status(400).json({ message: 'Invalid or missing status. Use "upcoming" or "completed".' });
  }

  const today = new Date();

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId,
        date: status === 'upcoming'
          ? { gte: today }
          : { lt: today },
      },
      orderBy: { date: 'asc' },
    });

    return res.status(200).json({ bookings });
  } catch (err) {
    console.error('Booking fetch error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
