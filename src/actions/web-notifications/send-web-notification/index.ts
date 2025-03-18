'use server'

import webPush from 'web-push'

webPush.setVapidDetails(
  'mailto:seuemail@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

export async function sendLikeNotification(
  likedUserId: string,
  likerName: string,
) {
  const payload = JSON.stringify({
    title: 'Nova curtida!',
    body: `${likerName} curtiu seu perfil! 💙`,
  })

  const sub = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/eLnE6oroHpU:APA91bF_wutnMVo0WwmIZ4L7LzHxs3MC_wvTsCYtf0Cmov5ORyO8bTTc5FbJxvhoey8ZcQ2-tt4V2fYVtu49k-90Upvt539lcPWbsR7kXvKP4QQSVIwwz18hM7UhsHns-D0G-S2zFoJV',
    keys: {
      auth: '+RNoKJwwRGBhVI6khmD+iQ==',
      p256dh:
        'BGxUQE9tccjysokaTZYb0/iaaATDtKtzYHik8+YTgT5sUYJQno6Q7rTA/IRh2aYkCjYCnanx3vOXovi1MY1hQX4=',
    },
  }

  await webPush.sendNotification(sub, payload)

  return { success: true }
}
