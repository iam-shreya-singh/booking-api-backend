import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyRefreshToken, signAccessToken } from '@/lib/jwt';

export default async function refreshHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token required' });
  }

  try {
    const payload: any = verifyRefreshToken(refreshToken);

    // Assuming the payload contains userId (as in login)
    const newAccessToken = signAccessToken({ userId: payload.userId });

    return res.status(200).json({
      message: 'New access token issued',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Refresh error:', error);
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
}
