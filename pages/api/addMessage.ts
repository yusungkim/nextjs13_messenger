// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@lib/server/redis'
import { ApiResponse, Message } from '@lib/type'
import withMethodGuard from '@lib/server/withMethodGuard'
import { cfImage } from '@lib/client/utils'
import serverPusher from '@lib/server/pusher'

export interface MessageResponse extends ApiResponse {
  message: Message
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessageResponse>
) {
  const { id, message } = req.body

  const payload: Message = {
    id,
    message: message,
    created_at: Date.now(),
    username: 'Yusung Kim',
    profilePic: cfImage("e64b420c-5dfd-4b3b-140f-de2beab75800", "avatar"),
    email: 'yusungkim@me.com'
  }

  // push to redis db
  setTimeout(async () => {
    await redis.hset("message", payload.id, JSON.stringify(payload as Message))

    serverPusher.trigger('messages', 'new-message', payload)

    return res.status(200).json({ ok: true, message: payload })
  }, 2000)

  // redis.hset("message", payload.id, JSON.stringify(payload as Message))
  // res.status(200).json({ ok: true, message: payload })
}

export default withMethodGuard({ methods: ['POST'], handler })