import { NextApiRequest, NextApiResponse } from 'next';
import Traveller from '../../../models/traveller.model';
import dbConnect from '../../../lib/dbConnect';
import { requireUser } from '../../../lib/middleware/requireUser';
import mongoose from 'mongoose';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const userId = (req as any).userId;

  if (req.method === 'GET') {
    try {
      const travellers = await Traveller.find({
        userId: new mongoose.Types.ObjectId(userId),
      });

      return res.status(200).json(travellers);
    } catch (error) {
      console.error('Traveller GET error:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default requireUser(handler);
