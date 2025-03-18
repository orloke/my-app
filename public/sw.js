self.addEventListener('install', (event) => {
  console.log("🚀 ~ self.addEventListener ~ event:", event)
  console.log('⚙️ Service Worker Instalado!')
  self.skipWaiting() // Força a ativação imediata
})

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker Ativado!')
  event.waitUntil(self.clients.claim()) // Garante que o SW assume o controle da página
})

self.addEventListener('push', (event) => {
  console.log('📩 Push recebido!', event)

  if (!event.data) {
    console.error('❌ Push recebido sem dados!')
    return
  }

  const data = event.data.json()
  const options = {
    body: data.body || 'Você recebeu uma nova notificação!',
    icon: '/icon.png',
    badge: '/badge.png',
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.focus) return client.focus()
        }
        return clients.openWindow(event.notification.data?.url || '/')
      }),
  )
})
