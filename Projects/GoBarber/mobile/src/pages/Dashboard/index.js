import React, { useState, useEffect } from 'react'
import { withNavigationFocus } from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Background from '~/components/Background'
import Appointment from '~/components/Appointment'

import api from '~/services/api'

import { Container, Title, List } from './styles'

function Dashboard({ isFocused }) {
  const [appointmentsList, setAppointmentsList] = useState([])

  async function loadAppointments() {
    const response = await api.get('/appointments')

    setAppointmentsList(response.data)
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments()
    }
  }, [isFocused])

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`)

    setAppointmentsList(
      appointmentsList.map(appointment =>
        appointment.id === id
          ? { ...appointment, canceled_at: response.data.canceled_at }
          : appointment
      )
    )
  }

  return (
    <Background>
      <Container>
        <Title> Agendamentos</Title>

        <List
          data={appointmentsList}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  )
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
}

export default withNavigationFocus(Dashboard)
