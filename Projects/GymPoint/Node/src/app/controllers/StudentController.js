import * as Yup from 'yup'
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
      student: Yup.string().required(),
    })

    const { student } = req.params

    if (!(await schema.isValid({ student })) && student) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const response = student
      ? await Student.findAll({ where: { name: student } })
      : await Student.findAll()

    return res.json(response)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' })
    }

    const { email, newEmail } = req.body

    const student = await Student.findOne({ where: { email } })

    if (newEmail) {
      const studentExists = await Student.findOne({
        where: { email: newEmail },
      })

      if (studentExists) {
        return res.status(400).json({ error: 'student already exists' })
      }
    }

    const { id, name, age, height, weight } = await student.update(req.body)

    return res.json({ id, name, email, age, height, weight })
  }
}

export default new StudentController()
