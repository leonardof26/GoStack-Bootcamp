import * as Yup from 'yup'

import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'

import Queue from '../../lib/Queue'
import AnswerMail from '../jobs/AnswerMail'

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number().required(),
      question: Yup.string().required(),
    })

    const studentId = req.params.id
    const { question } = req.body

    if (!(await schema.isValid({ studentId, question }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const helpOrder = await HelpOrder.create({
      student_id: studentId,
      question,
    })

    return res.json({ id: helpOrder.id })
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
      page: Yup.number().required(),
      limit: Yup.number().required(),
    })

    const studentId = req.params.id

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { page, limit } = req.params

    const offset = (page - 1) * limit

    const helpOrders = studentId
      ? await HelpOrder.findAll({
          where: { student_id: studentId },
          include: [{ model: Student, attributes: ['id', 'name'] }],
          limit,
          offset,
        })
      : await HelpOrder.findAll({
          include: [{ model: Student, attributes: ['id', 'name'] }],
          limit: limit + 1,
          offset,
        })

    return res.json(helpOrders)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      answer: Yup.string().required(),
    })

    const { id } = req.params
    const { answer } = req.body

    if (!(await schema.isValid({ answer, id }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const helpOrder = await HelpOrder.findByPk(id)

    if (!helpOrder) {
      return res.status(400).json({ error: 'Question not found' })
    }

    if (helpOrder.answer) {
      return res
        .status(400)
        .json({ error: 'Question already answered by someonelse' })
    }

    await helpOrder.update({ ...req.body, answer_at: new Date() })

    const student = await Student.findByPk(helpOrder.student_id)

    await Queue.add(AnswerMail.key, { helpOrder, student })

    const { question } = helpOrder

    return res.json({ question, answer })
  }
}

export default new HelpOrderController()
