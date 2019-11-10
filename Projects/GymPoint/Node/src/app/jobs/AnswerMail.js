import Mail from '../../lib/Mail'

class AnswerMail {
  get key() {
    return 'AnswerMail'
  }

  async handle({ data }) {
    const { helpOrder, student } = data

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Pergunta respondida',
      template: 'answer',
      extname: '.hbs',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
      },
    })
  }
}

export default new AnswerMail()
