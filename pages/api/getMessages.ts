// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '@lib/server/redis'
import { ApiResponse, Message } from '@lib/type'
import withMethodGuard from '@lib/server/withMethodGuard'

export interface MessagesResponse extends ApiResponse {
  messages: Message[]
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MessagesResponse>
) {
  try {
    const messagesRes = await redis.hvals("message")
    const messages: Message[] = messagesRes.map((message) => JSON.parse(message)).sort((a, b) => b.created_at - a.created_at)

    res.status(200).json({ ok: true, messages })
  } catch (e) {
    res.status(500).json({ ok: false, messages: [] })
  }

}

export default withMethodGuard({ methods: ['GET'], handler })