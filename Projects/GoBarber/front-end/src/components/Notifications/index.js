import React, { useState, useEffect, useMemo } from 'react'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { MdNotifications } from 'react-icons/md'
import api from '~/services/api'

import {
  Container,
  Badget,
  NotificationList,
  Notification,
  Scroll,
} from './styles'

export default function Notifications() {
  const [visible, setVisibble] = useState(false)
  const [notifications, setNotifications] = useState([])

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  )

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications')

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }))

      setNotifications(data)
    }

    loadNotifications()
  }, [])

  function handleToggleVisible() {
    setVisibble(!visible)
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`)

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    )
  }

  return (
    <Container>
      <Badget onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={15} />
      </Badget>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida{' '}
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  )
}
