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

    const { title, duration, price } = await Plan.create({
      ...req.body,
      active: true,
    })

    return res.json({ title, duration, price })
  }

  async index(req, res) {
    if (req.route.path === '/plans/actives') {
      const plans = await Plan.findAll({
        where: { active: true },
        attributes: ['id', 'title', 'duration', 'price', 'active'],
      })

      return res.json(plans)
    }

    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price', 'active'],
    })

    return res.json(plans)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      title: Yup.string().required(),
      duration: Yup.number()
        .moreThan(0)
        .lessThan(13),
      price: Yup.number().moreThan(0),
    })

    const { id } = req.params

    if (!(await schema.isValid({ id, ...req.body }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const plan = await Plan.findByPk(id)

    if (!plan) {
      return res.status(400).json({ error: 'plan does not exists' })
    }

    const { title, duration, price } = await plan.update(req.body)

    return res.json({ title, duration, price })
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    })

    const { id } = req.params

    if (!(await schema.isValid({ id }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const plan = await Plan.findByPk(id)

    if (!plan) {
      return res.status(400).json({ error: 'plan does not exists' })
    }

    await plan.update({ active: false })

    return res.json({ message: `Plan ${id} desativated successful` })
  }
}

export default new PlanController()
