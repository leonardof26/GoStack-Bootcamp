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
routes.get('/students/:id', StudentController.index)

routes.post('/sessions', SessionController.store)

routes.post('/students/:id/checkins', CheckinController.store)
routes.get('/students/:id/checkins/:page/:limit', CheckinController.index)

routes.post('/students/:id/help-orders', HelpOrderController.store)
routes.get('/students/:id/help-orders/:page/:limit', HelpOrderController.index)

routes.use(authMiddleware)
routes.put('/students/:id', StudentController.update)
routes.get('/students/:page/:limit', StudentController.index)
routes.get('/students/search/:name', StudentController.index)
routes.delete('/students/:id', StudentController.delete)

routes.post('/plans', PlanController.store)
routes.get('/plans/:page/:limit', PlanController.index)
routes.put('/plans/:id', PlanController.update)
routes.delete('/plans/:id', PlanController.delete)

routes.post('/membership', MembershipController.store)
routes.get('/membership/:page/:limit', MembershipController.index)
routes.put('/membership/:id', MembershipController.update)
routes.delete('/membership/:id', MembershipController.delete)

routes.put('/help-orders/:id/answer', HelpOrderController.update)
routes.get('/help-orders/:page/:limit', HelpOrderController.index)

export default routes
