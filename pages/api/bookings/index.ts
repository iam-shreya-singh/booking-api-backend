import { requireUser } from '@/lib/middleware/requireUser';
import getBookingsHandler from '@/modules/bookings/api/getBookings.handler';

export default requireUser(getBookingsHandler);
