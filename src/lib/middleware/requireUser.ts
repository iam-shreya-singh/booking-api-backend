import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { verifyAccessToken } from '/workspaces/booking-api-backend/src/lib/jwt.ts'; // Adjust this import based on where your jwt helper is

export const requireUser = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest & { userId?: string }, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized – no token' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyAccessToken(token); // Your JWT decode helper
      req.userId = decoded.userId;
      return handler(req, res);
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Unauthorized – invalid token' });
    }
  };
};
