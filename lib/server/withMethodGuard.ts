import type { NextApiRequest, NextApiResponse } from 'next'

type Method = 'GET' | 'POST'

interface MethodGuardProps {
  methods: Method[]
  handler: (req: NextApiRequest, res: NextApiResponse) => void
}

export default function withMethodGuard(
  {
    methods,
    handler
  }: MethodGuardProps
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).json({ ok: false, message: 'Method is not allowed.' })
    }

    try {
      handler(req, res)
    } catch (e) {
      console.error(e)
      res.status(500).json({ ok: false, message: 'server error' })
    }
  }
}
