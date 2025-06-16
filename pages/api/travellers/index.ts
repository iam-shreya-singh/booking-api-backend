import { requireUser } from '@/lib/middleware/requireUser';
import createTravellerHandler from '@/modules/travellers/api/createTraveller.handler';

export default requireUser(createTravellerHandler);
