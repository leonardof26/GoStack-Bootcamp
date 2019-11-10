import * as Yup from 'yup'
import { subDays, addDays } from 'date-fns'
import { Op } from 'sequelize'

import Checkin from '../models/Checkin'

class CheckinController {
  async store(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
    })

    if (!(await schema.isValid({ studentId: req.params.id }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const studentId = req.params.id
    const initialPeriod = subDays(new Date(), 7)
    const endPeriod = addDays(new Date(), 1)

    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId,
        created_at: { [Op.between]: [initialPeriod, endPeriod] },
      },
      order: [['created_at', 'DESC']],
      limit: 6,
      attributes: ['id', 'student_id', 'created_at'],
    })

    if (checkins.length > 4) {
      return res
        .status(400)
        .json({ error: 'Student can only checkin 5 times a week' })
    }

    const checkin = await Checkin.create({ student_id: studentId })

    return res.json(checkin)
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
    })

    if (!(await schema.isValid({ studentId: req.params.id }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const userId = req.params.id

    const checkins = await Checkin.findAll({
      where: { student_id: userId },
      order: [['created_at', 'DESC']],
      limit: 6,
      attributes: ['id', 'student_id', 'created_at'],
    })

    return res.json(checkins)
  }
}

export default new CheckinController()
