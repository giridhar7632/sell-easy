import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import Loader from './common/Loader'
import useFetcher from '@/hooks/useFetcher'
import { useChat } from '@/hooks/useChat'
import { ArrowLeft, Send } from './icons'
import Input from './common/Input'

const SingleChat = () => {
  const { isAuth, user } = useAuth()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { selectedChat, setSelectedChat } = useChat()
  const fetcher = useFetcher()

  const fetchMessages = async (id) => {
    setIsLoading(true)
    try {
      const res = await fetcher(`/api/messages/${id}`, { token: isAuth })
      setMessages(res)
    } catch (error) {
      error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!selectedChat) return

    fetchMessages(selectedChat._id)
  }, [])

  return (
    <div className={'flex flex-1 flex-col rounded-xl bg-gray-100'}>
      <header className="flex items-center gap-2 bg-white p-2">
        <button
          className={
            'inline-flex items-center rounded-xl p-2 font-bold hover:ring hover:ring-gray-100'
          }
          onClick={() => setSelectedChat()}
        >
          <ArrowLeft className={'text-gray-600'} width={24} />
        </button>
        {selectedChat.chatName.toUpperCase()}
      </header>

      <div className="flex-1 overflow-y-hidden">
        {isLoading ? (
          <div className="m-auto h-full w-full">
            <Loader />
          </div>
        ) : messages.length > 0 ? (
          <div></div>
        ) : (
          <div className="m-auto w-full">No messages!</div>
        )}
      </div>
      <div className="flex gap-2 bg-white p-2">
        <Input divClass={'flex-1'} placeholder={'Type something...'} />
        <button
          className={
            'inline-flex items-center rounded-xl p-1 font-bold hover:ring hover:ring-gray-100'
          }
          // onClick={() => setSelectedChat()}
        >
          <Send className={'text-gray-600'} width={24} />
        </button>
      </div>
    </div>
  )
}

export default SingleChat
