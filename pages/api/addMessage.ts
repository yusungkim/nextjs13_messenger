// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@lib/redis'
import { Message } from '@lib/type'

type OkRes = {
  message: Message
}

type ErrorRes = {
  errorMessage: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OkRes | ErrorRes>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ errorMessage: "Method is not allowed" })
  }

  console.log("api called")

  const { message } = req.body

  const newMessage = {
    ...message,
    created_at: Date.now(), // replace with server time
  }

  // push to redis db
  await redis.hset("message", message.id, JSON.stringify(newMessage))

  res.status(200).json({ message: newMessage })
}
