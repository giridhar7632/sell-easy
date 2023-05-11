import { useChat } from '@/hooks/useChat'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Drawer from './common/Drawer'
import Loader from './common/Loader'

const ChatSidebar = ({ open, toggle }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  // const socket = io()
  const { isLoading, status, selectedChat, startChat } = useChat()

  console.log({ selectedChat })
  // useEffect(() => {
  //   // Listen for incoming chat messages from the server
  //   socket.on('chatMessage', (data) => {
  //     setMessages((messages) => [...messages, data])
  //   })

  //   return () => {
  //     // Clean up the socket connection when the component unmounts
  //     socket.disconnect()
  //   }
  // }, [socket])

  // const handleSendMessage = () => {
  //   // Send a chat message to the server
  //   const data = { sender: 'John', message }
  //   socket.emit('chatMessage', data)
  //   setMessages((messages) => [...messages, data])
  //   setMessage('')
  // }

  return (
    <Drawer open={open} title={`Chat`} toggle={toggle}>
      {isLoading ? (
        <Loader />
      ) : status ? (
        <div className={'mt-10 w-full text-center text-2xl font-bold text-gray-300'}>{status}</div>
      ) : (
        <div className="mt-6">
          {/* <ul>
            {messages.map((data, index) => (
              <li key={index}>
                {data.sender}: {data.message}
              </li>
            ))}
          </ul>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleSendMessage}>Send</button> */}
        </div>
      )}
    </Drawer>
  )
}

export default ChatSidebar
