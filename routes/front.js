import { Router } from 'express';
import * as home_controller from '../app/controllers/home_controller'
import * as member_controller from '../app/controllers/member_controller'

const route = Router();

route.get('/member/login', member_controller.login);
route.get('/project/:id', home_controller.project);
route.get('/detail/:cateid/:id', home_controller.detail);

export default route