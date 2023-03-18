'use client'

import fetcher from "@lib/client/fetchMessages"
import useSWR from "swr"
import MessageComponent from "./MessageComponent"

function MessageList() {
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)
  console.log("messages: ", messages)
  return (
    <>
      {messages?.map((message, idx) => (
        <MessageComponent key={idx} message={message} />
      ))}
    </>
  )
}

export default MessageList