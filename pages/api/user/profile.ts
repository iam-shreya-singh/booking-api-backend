import { requireUser } from '@/lib/middleware/requireUser';
import profileHandler from '@/modules/user/api/profile.handler';

export default requireUser(profileHandler);
