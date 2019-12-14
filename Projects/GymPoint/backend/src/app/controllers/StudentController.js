import * as Yup from 'yup'
import { Op } from 'sequelize'

import Student from '../models/Student'

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .lessThan(150)
        .moreThan(10)
        .required(),
      weight: Yup.number()
        .moreThan(10.0)
        .required(),
      height: Yup.number()
        .moreThan(1.0)
        .lessThan(3.0)
        .required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    })

    if (studentExists) {
      return res.status(400).json({ error: 'student already exists' })
    }

    const { id, name, email, age, height, weight } = await Student.create(
      req.body
    )

    return res.json({ id, name, email, age, height, weight })
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      page: Yup.number(),
      limit: Yup.number(),
      id: Yup.number(),
    })

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { name, page, limit, id } = req.params

    const offset = (page - 1) * limit

    if (id) {
      const student = await Student.findByPk(id)

      if (!student) {
        return res.status(400).json({ error: 'Student does not exist' })
      }

      return res.json(student)
    }

    if (name) {
      const students = await Student.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      })

      return res.json(students)
    }

    const students = await Student.findAll({
      limit: limit + 1,
      offset,
    })

    return res.json(students)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      newEmail: Yup.string().email(),
      age: Yup.number()
        .lessThan(150)
        .moreThan(10),
      weight: Yup.number().moreThan(10.0),
      height: Yup.number()
        .moreThan(1.0)
        .lessThan(3.0),
    })

    const { id } = req.params

    if (!(await schema.isValid({ ...req.body, id }))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'student does not exist' })
    }

    const { email } = req.body

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      })

      if (studentExists) {
        return res.status(400).json({ error: 'email already taken' })
      }
    }

    const { name, age, height, weight } = await student.update(req.body)

    return res.json({ id, name, email, age, height, weight })
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { id } = req.params

    const student = Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' })
    }

    await Student.destroy({ where: { id } })

    return res.json({
      message: `Student: ${student.id} deleted successful`,
    })
  }
}

export default new StudentController()
