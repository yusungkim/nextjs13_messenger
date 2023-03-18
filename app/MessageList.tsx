'use client'

import fetcher from "@lib/client/fetchMessages"
import useSWR from "swr"

function MessageList() {
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)
  console.log("messages: ", messages)
  return (
    <>
      {messages?.map((msg, idx) => (
        <div key={idx}>
          {msg.message}
        </div>
      ))}
    </>
  )
}

export default MessageList