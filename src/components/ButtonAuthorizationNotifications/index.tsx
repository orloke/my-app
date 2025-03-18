'use client'

import { usePushNotifications } from '@/actions/web-notifications'
import { sendLikeNotification } from '@/actions/web-notifications/send-web-notification'
import { useState } from 'react'


export const ButtonAuthorizationNotifications = () => {
  const { subscribeUser } = usePushNotifications()

  const [text, setText] = useState('Enviando')


  return (
    <div className="flex items-center gap-2">
      <button
        onClick={async () => {
          const response = await subscribeUser()
          console.log("🚀 ~ onClick={ ~ response:", response)
          setText(JSON.stringify(response))
        }}
      >
        Notificação
      </button>

      <p>{text}</p>
      <button
        onClick={() =>
          sendLikeNotification('oiiii', 'Junior Dering')
        }
      >
        enviando notificacao
      </button>
    </div>
  )
}
