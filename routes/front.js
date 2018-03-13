import { Router } from 'express';
import * as home_controller from '../app/controllers/home_controller'

const route = Router();

route.get('/project/:id', home_controller.project);
route.get('/detail/:cateid/:id', home_controller.detail);

export default route