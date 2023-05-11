import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import useFetcher from './useFetcher'
import useToast from './useToast'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedChat, setSelectedChat] = useState()
  const [notification, setNotification] = useState([])
  const [chats, setChats] = useState([])
  const [status, setStatus] = useState('')
  const { isAuth, user } = useAuth()
  const fetcher = useFetcher()
  const toast = useToast()

  const toggleChat = () => setChatOpen(!chatOpen)

  const startChat = async (userId) => {
    setIsLoading(true)
    try {
      const res = await fetcher('/api/conversations', {
        token: isAuth,
        body: { userId },
      })
      if (!chats.find((c) => c._id === res._id)) setChats((prev) => [...prev, res])
      setSelectedChat(res)
    } catch (error) {
      error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
    }
    setIsLoading(false)
  }

  const fetchChats = async () => {
    setIsLoading(true)
    try {
      const res = await fetcher('/api/conversations', { token: isAuth })
      setChats(res)
    } catch (error) {
      error?.message ? setStatus(error.message) : setStatus('Something went wrong! 😕')
    }
    setIsLoading(false)
  }

  const getSender = (users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name
  }

  const getSenderDetails = (users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name
  }

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
        chatOpen,
        toggleChat,
        startChat,
        fetchChats,
        isLoading,
        status,
        getSender,
        getSenderDetails,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
