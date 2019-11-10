import { Router } from 'express'

import SessionController from './app/controllers/SessionController'
import StudentController from './app/controllers/StudentController'
import PlanController from './app/controllers/PlanController'
import MembershipController from './app/controllers/MembershipController'
import CheckinController from './app/controllers/CheckinController'
import HelpOrderController from './app/controllers/HelpOrderController'

import authMiddleware from './app/middlewares/auth'

const routes = new Router()

routes.post('/students', StudentController.store)
routes.post('/sessions', SessionController.store)

routes.post('/students/:id/checkins', CheckinController.store)
routes.get('/students/:id/checkins', CheckinController.index)

routes.post('/students/:id/help-orders', HelpOrderController.store)
routes.get('/students/:id/help-orders', HelpOrderController.index)

routes.use(authMiddleware)
routes.put('/students', StudentController.update)
routes.get('/students/:student', StudentController.index)

routes.post('/plans', PlanController.store)
routes.get('/plans', PlanController.index)
routes.put('/plans', PlanController.update)
routes.delete('/plans', PlanController.delete)

routes.post('/membership', MembershipController.store)
routes.get('/membership', MembershipController.index)
routes.put('/membership', MembershipController.update)
routes.delete('/membership', MembershipController.delete)

routes.put('/help-orders/:id/answer', HelpOrderController.update)
routes.get('/help-orders', HelpOrderController.index)

export default routes
