// pages/api/travellers/[traveller_id].ts

import updateTravellerHandler from '@/modules/travellers/api/updateTraveller.handler';
import authMiddleware from '@/lib/middleware/authMiddleware';

export default authMiddleware(updateTravellerHandler);
