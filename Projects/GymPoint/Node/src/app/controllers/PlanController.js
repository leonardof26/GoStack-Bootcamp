import * as Yup from 'yup'

import Plan from '../models/Plan'

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .lessThan(13)
        .moreThan(0)
        .required(),
      price: Yup.number()
        .moreThan(0)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const planExists = await Plan.findOne({ where: { title: req.body.title } })

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists' })
    }

    const { title, duration, price } = await Plan.create(req.body)

    return res.json({ title, duration, price })
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    })

    return res.json(plans)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      newTitle: Yup.string(),
      duration: Yup.number()
        .moreThan(0)
        .lessThan(13),
      price: Yup.number().moreThan(0),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { title } = req.body

    const plan = await Plan.findOne({ where: { title } })

    if (!plan) {
      return res.status(400).json({ error: 'plan does not exists' })
    }

    const { duration, price } = await plan.update(req.body)

    return res.json({ title, duration, price })
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const plan = await Plan.findOne({ where: { title: req.body.title } })

    if (!plan) {
      return res.status(400).json({ error: 'plan does not exists' })
    }

    await Plan.destroy({ where: { title: req.body.title } })

    return res.json({ message: `Plan ${req.body.title} deleted successful` })
  }
}

export default new PlanController()
