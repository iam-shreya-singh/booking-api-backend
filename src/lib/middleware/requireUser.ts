import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { verifyAccessToken } from '../jwt';

export function requireUser(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyAccessToken(token) as { userId: string };
      (req as any).userId = decoded.userId;
      return handler(req, res);
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
}
