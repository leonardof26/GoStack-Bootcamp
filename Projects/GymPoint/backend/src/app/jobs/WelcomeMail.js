import Mail from '../../lib/Mail'

class WelcomeMail {
  get key() {
    return 'WelcomeMail'
  }

  async handle({ data }) {
    const { plan, membership, student, formattedEndDate } = data

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Bem-vindo ao GymPoint',
      template: 'welcome',
      extname: '.hbs',
      context: {
        student: student.name,
        plan: plan.title,
        endDate: formattedEndDate,
        price: membership.price,
      },
    })
  }
}

export default new WelcomeMail()
