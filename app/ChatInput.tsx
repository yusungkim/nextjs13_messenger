'use client'

import useMutation from '@lib/client/useMutation'
import { MessageResponse } from 'pages/api/addMessage'
import { FormEvent, useState } from 'react'

function ChatInput() {
  const [input, setInput] = useState('')

  const [messageSend, { loading, data, error }] = useMutation<MessageResponse>('/api/addMessage')

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input) return

    // for optimisitc behavior
    const message = input
    setInput('')

    messageSend({ message })
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
        disabled={!input || loading}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput