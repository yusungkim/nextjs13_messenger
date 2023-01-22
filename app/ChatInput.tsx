'use client'

import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '@lib/type'

function ChatInput() {
  const [input, setInput] = useState('')

  

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("send button pressed")

    if (!input) return

    console.log("sending...")

    // for optimisitc behavior
    const messageToSend = input
    setInput('')

    const id = uuid()
    const payload: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(), //client time zone
      username: 'Yusung Kim',
      profilePic: ''
    }

    const uploadMessageToUpstash = async () => {
      const res = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: payload
        })
      })
  
      const data = await res.json()
      console.log("data sent", data)
    }

    uploadMessageToUpstash()
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