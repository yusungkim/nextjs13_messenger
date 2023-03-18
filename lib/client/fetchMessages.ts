import { Message } from "@lib/type"

const fetcher = async () => {
  const res = await fetch('api/getMessages')
  const data = await res.json()
  if (data.ok) {
    const messages: Message[] = data.messages
    return messages
  }
  return []
}

export default fetcher