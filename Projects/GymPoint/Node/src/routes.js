import { Router } from 'express'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import MembershipController from './app/controllers/MembershipController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/students', StudentController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)
routes.put('/students', StudentController.update)

routes.post('/plans', PlanController.store)
routes.get('/plans', PlanController.index)
routes.put('/plans', PlanController.update)
routes.delete('/plans', PlanController.delete)

routes.post('/membership', MembershipController.store)
routes.get('/membership', MembershipController.index)
routes.put('/membership', MembershipController.update)
routes.delete('/membership', MembershipController.delete)

export default routes
