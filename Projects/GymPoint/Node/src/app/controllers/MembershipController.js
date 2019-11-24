import * as Yup from 'yup'
import { addMonths, parseISO, format } from 'date-fns'

import Membership from '../models/Membership'
import Student from '../models/Student'
import Plan from '../models/Plan'

import Queue from '../../lib/Queue'
import WelcomeMail from '../jobs/WelcomeMail'

class MembershipController {
  async store(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
      planId: Yup.number().required(),
      startDate: Yup.date().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { studentId, planId, startDate } = req.body

    const mbrshipExists = await Membership.findOne({
      where: { student_id: studentId },
    })

    if (mbrshipExists) {
      return res
        .status(400)
        .json({ error: 'Student already have a membership' })
    }

    const student = await Student.findByPk(studentId)

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' })
    }

    const plan = await Plan.findByPk(planId)

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' })
    }

    const endDate = addMonths(parseISO(startDate), plan.duration)

    const price = plan.duration * plan.price

    const membership = await Membership.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      price,
    })

    const formattedEndDate = format(membership.end_date, 'dd/MM/yyyy')

    await Queue.add(WelcomeMail.key, {
      membership,
      student,
      plan,
      formattedEndDate,
    })

    return res.json(membership)
  }

  async index(req, res) {
    const mbrships = await Membership.findAll({
      attributes: [
        'id',
        'student_id',
        'plan_id',
        'start_date',
        'end_date',
        'price',
        'active',
      ],
      include: [
        { model: Student, attributes: ['id', 'name'] },
        { model: Plan, attributes: ['id', 'title'] },
      ],
    })

    return res.json(mbrships)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      studentId: Yup.number().required(),
      planId: Yup.number().required(),
      startDate: Yup.date().required(),
    })

    const { id } = req.params

    if (!(await schema.isValid({ id, ...req.body }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { studentId, planId, startDate } = req.body

    const membership = await Membership.findByPk(id)

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exists' })
    }

    if (membership.student_id !== studentId) {
      const userMembership = await Membership.findOne({
        where: { student_id: studentId },
      })

      if (userMembership) {
        return res
          .status(400)
          .json({ error: 'Student already has activated membership' })
      }
    }

    const plan = await Plan.findByPk(planId)

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' })
    }

    const endDate = addMonths(parseISO(startDate), plan.duration)

    const price = plan.duration * plan.price

    const newMembership = await membership.update({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      price,
    })

    return res.json(newMembership)
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    })

    const { id } = req.params

    if (!(await schema.isValid({ id }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const mbrshipExists = await Membership.findByPk(id)

    if (!mbrshipExists) {
      return res.status(400).json({ error: 'Membership does not exists' })
    }

    await Membership.destroy({ where: { id } })

    return res.json({
      message: `Membership: ${id} deleted successfully`,
    })
  }
}

export default new MembershipController()
