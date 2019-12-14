import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert, ActivityIndicator, View } from 'react-native'

import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '../../services/api'

import {
  Container,
  CheckInButton,
  CheckInList,
  CkeckInInfo,
  CheckInNumber,
  CheckInDate,
} from './styles'

export default function Checkin() {
  const [checkinList, setCheckinList] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user.profile)

  async function loadCheckinList() {
    if (lastPage) {
      return
    }

    setLoading(true)

    const response = await api.get(`/students/${user.id}/checkins/${page}/10`)

    let checkinCounter = (page - 1) * 10

    const checkins = response.data.map(checkin => {
      checkinCounter += 1
      return {
        ...checkin,
        formattedData: formatRelative(
          parseISO(checkin.created_at),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
        checkinNumber: checkinCounter,
      }
    })

    setPage(page + 1)
    setCheckinList([...checkinList, ...checkins])

    if (response.data.length === 0) {
      setLastPage(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    loadCheckinList()
  }, [])

  async function handleCheckin() {
    try {
      await api.post(`/students/${user.id}/checkins`)
    } catch (error) {
      if (
        error.response.data.error === 'Student can only checkin 5 times a week'
      ) {
        Alert.alert('Atenção', 'Número maximo de checkins semanais atingido')
      }
    }

    loadCheckinList()
  }

  function renderFooter() {
    if (!loading) return null
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <Container>
      <CheckInButton onPress={handleCheckin}>Novo check-in</CheckInButton>
      <CheckInList
        data={checkinList}
        onEndReached={loadCheckinList}
        onEndReachedThreshold={0.1}
        keyExtractor={item => String(item.id)}
        renderItem={({ item: checkin }) => (
          <CkeckInInfo>
            <CheckInNumber>{`Check-In #${checkin.checkinNumber}`}</CheckInNumber>
            <CheckInDate>{checkin.formattedData}</CheckInDate>
          </CkeckInInfo>
        )}
        ListFooterComponent={renderFooter}
      />
    </Container>
  )
}
