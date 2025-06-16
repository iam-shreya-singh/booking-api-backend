import updateTravellerHandler from '@/modules/travellers/api/updateTraveller.handler';
import { requireUser } from '@/lib/middleware/requireUser';

export default requireUser(updateTravellerHandler);
