import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (req as any).userId;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ user });
    } catch (err) {
      console.error('Profile fetch error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  if (req.method === 'PUT') {
    const { name } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      return res.status(200).json({ message: 'Profile updated', user: updatedUser });
    } catch (err) {
      console.error('Profile update error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // fallback for other HTTP verbs
  return res.status(405).json({ message: 'Method Not Allowed' });
}
