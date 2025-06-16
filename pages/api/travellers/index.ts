import { requireUser } from '@/lib/middleware/requireUser';
import createTravellerHandler from '@/modules/travellers/api/createTraveller.handler';
import getTravellersHandler from '@/modules/travellers/api/getTravellers.handler';

export default requireUser(async (req, res) => {
  if (req.method === 'POST') return createTravellerHandler(req, res);
  if (req.method === 'GET') return getTravellersHandler(req, res);
  return res.status(405).json({ message: 'Method Not Allowed' });
});
