import * as Yup from 'yup'

import HelpOrder from '../models/HelpOrder'

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
    return res.json({ message: 'index' })
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

    await helpOrder.update(req.body)

    const { question } = helpOrder

    return res.json({ question, answer })
  }
}

export default new HelpOrderController()
