'use client'

import fetcher from "@lib/client/fetchMessages"
import clientPusher from "@lib/client/pusher"
import { Message } from "@lib/type"
import { useEffect } from "react"
import useSWR from "swr"
import MessageComponent from "./MessageComponent"

function MessageList() {
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

  useEffect(() => {
    const channel = clientPusher.subscribe('messages')

    channel.bind('new-message', async (newMessage: Message) => {
      // check is already there (for sender's browser)
      if (messages?.find((message) => message.id == newMessage.id)) {
        return
      }

      if (messages) {
        mutate(fetcher, {
          optimisticData: [...messages || [], newMessage],
          rollbackOnError: true,
        })
      }
    })
  }, [messages, mutate, clientPusher])

  return (
    <div className="space-y-3 px-5 pt-8 max-w-2xl xl:max-w-4xl mx-auto pb-24">
      {messages?.map((message, idx) => (
        <MessageComponent key={idx} message={message} />
      ))}
    </div>
  )
}

export default MessageList