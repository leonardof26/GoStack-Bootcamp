import * as Yup from 'yup'
import { addMonths, parseISO } from 'date-fns'

import Membership from '../models/Membership'
import Student from '../models/Student'
import Plan from '../models/Plan'

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
      ],
    })

    return res.json(mbrships)
  }

  async update(req, res) {
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

    if (!mbrshipExists) {
      return res
        .status(400)
        .json({ error: 'Student does not have a membership' })
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

    return res.json(membership)
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const mbrshipExists = await Membership.findOne({
      where: { student_id: req.body.studentId },
    })

    if (!mbrshipExists) {
      return res
        .status(400)
        .json({ error: 'Student does not have a membership' })
    }

    await Membership.destroy({ where: { student_id: req.body.studentId } })

    return res.json({
      message: `Membership from student: ${req.body.studentId} deleted successful`,
    })
  }
}

export default new MembershipController()
