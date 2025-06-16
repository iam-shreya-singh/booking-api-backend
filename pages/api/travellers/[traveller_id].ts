import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { requireUser } from '@/lib/middleware/requireUser'; // ✅ double-check path

const prisma = new PrismaClient();

async function updateTravellerHandler(req: NextApiRequest, res: NextApiResponse) {
  const travellerId = req.query.traveller_id as string;

  if (req.method === 'PUT') {
    const { name, age, passportNumber } = req.body;

    try {
      const updated = await prisma.traveller.update({
        where: { id: travellerId },
        data: { name, age, passportNumber },
      });

      return res.status(200).json({ traveller: updated });
    } catch (error) {
      console.error('PUT Error:', error);
      return res.status(500).json({ message: 'Something went wrong.' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default requireUser(updateTravellerHandler); // ✅ with auth wrapper
