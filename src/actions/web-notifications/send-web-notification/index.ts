'use server'

import webPush from 'web-push'

webPush.setVapidDetails(
  'mailto:seuemail@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function sendLikeNotification(
  likedUserId: string,
  likerName: string
) {
  const payload = JSON.stringify({
    title: 'Nova curtida!',
    body: `${likerName} curtiu seu perfil! 💙`,
  })

  const sub = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/eT0fdIM6t9Y:APA91bFR-NTwZaSZ_TKZ4Q_2HZohNX54slnRfMFTHycXsOa5Us30Xtr2jf2dEfrRIxnt9JIadodq9z5hjIQJzn8YOmjHklDv5xGV6GKPRybSnHWjCsK0zk-rDIuDFvBrvs5SBbg_3RZq',
    keys: {
      p256dh:
        'BJri2XMCpy7AqKxnowiAoGN1EPoCIRr6fXfIDWsxCGC/tA0x88fyOvscla7LrEKNUx9O9vLr7wFQXrkTX+0XHPw=',
      auth: '36ARhOrv2QK8mVHYqh7yWA==',
    },
  }

  await webPush.sendNotification(sub, payload)

  return { success: true }
}
