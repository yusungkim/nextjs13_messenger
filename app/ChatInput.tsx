'use client'

import fetcher from '@lib/client/fetchMessages'
import useMutation from '@lib/client/useMutation'
import { cfImage } from '@lib/client/utils'
import { MessageResponse } from 'pages/api/addMessage'
import { FormEvent, useState } from 'react'
import useSWR from 'swr'

function ChatInput() {
  const [input, setInput] = useState('')

  // const [messageSend, { loading, data: newMessageRes }] = useMutation<MessageResponse>('/api/addMessage')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input) return

    // for optimisitc behavior
    const message = input
    setInput('')
    const dummyMessage = {
      id: 'undefined-yet',
      message: message + " <Sending>",
      created_at: Date.now(),
      username: 'Yusung Kim',
      profilePic: cfImage("e64b420c-5dfd-4b3b-140f-de2beab75800", "avatar"),
      email: 'yusungkim@me.com'
    }
    // mutate((prev) => {
    //   if (prev) {
    //     return [
    //       dummyMessage,
    //       ...messages!
    //     ]
    //   }
    // }, false)

    const sendAndGetLatestMessages = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      })
      const addedMessage = await res.json()
      if (addedMessage?.ok && messages) {
        const newOne = [...messages, addedMessage.message]
        return newOne
      } else {
        return messages
      }
    }

    mutate(
      sendAndGetLatestMessages, {
      optimisticData: [...messages!, dummyMessage],
      rollbackOnError: true
    })

    // send message
    // messageSend({ message })
  }

  return (
    <form
      className='fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100'
      onSubmit={sendMessage}
    >
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter message here..."
        className='flex-1 rounded border border-gray-300 px-5 py-3
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed'
      />

      <button
        type="submit"
        disabled={!input}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput