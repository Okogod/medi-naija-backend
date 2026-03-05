import { Router } from 'express';

import { user_send_registration_code_controller } from '../../../controllers/user_controllers/user_authentication_controllers/register_controller.js';

const user_auth_router = Router();

user_auth_router.post( '/user/register', user_send_registration_code_controller );

export default user_auth_router;