import SingleChat from '@/components/SingleChat'
import Input from '@/components/common/Input'
import Loader from '@/components/common/Loader'
import { ArrowLeft } from '@/components/icons'
import Layout from '@/components/layout'
import { useAuth } from '@/hooks/useAuth'
import { useChat } from '@/hooks/useChat'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'

const Chats = () => {
  const { selectedChat, setSelectedChat, chats, isLoading, getSender, status, fetchChats } =
    useChat()

  useEffect(() => {
    fetchChats()
  }, [])

  console.log({ chats })

  return (
    <Layout meta={{ name: 'Chat history' }}>
      <div className="flex h-full min-h-[80vh] gap-2">
        <div className={'hidden w-72 rounded-lg md:block'}>
          {isLoading ? (
            <Loader />
          ) : status ? (
            <div className={'mt-10 w-full text-center text-2xl font-bold text-gray-300'}>
              {status}
            </div>
          ) : (
            <div className={'flex flex-col'}>
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  className={clsx(
                    'my-2 cursor-pointer rounded-lg px-3 py-2 font-medium',
                    selectedChat === chat ? 'bg-teal-100 font-semibold text-teal-600' : 'bg-gray-50'
                  )}
                  onClick={() => setSelectedChat(chat)}
                >
                  {/* <Image
                    width={small ? 30 : 48}
                    height={small ? 30 : 48}
                    className="h-10 w-10 rounded-full"
                    src={profileImage || `https://api.multiavatar.com/${name}.png`}
                    alt={name}
                    placeholder={'blur'}
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  /> */}
                  <p>{getSender(chat.users)}</p>
                  <div
                    className={clsx(
                      'flex items-end justify-between text-sm font-normal',
                      selectedChat === chat ? 'text-teal-500' : 'text-gray-400'
                    )}
                  >
                    <p className={'truncate'}>{chat.latestMessage.content}</p>
                    <p className="text-xs">{format(chat.latestMessage.updatedAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedChat ? (
          <SingleChat />
        ) : (
          <div className="my-12 w-full px-12 font-semibold text-gray-300">
            Select a chat to start conversation!
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Chats
