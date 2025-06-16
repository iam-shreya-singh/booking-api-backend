import createTravellerHandler from '@/modules/travellers/api/createTraveller.handler';
import { requireUser } from '@/lib/middleware/requireUser';

export default requireUser(createTravellerHandler);
