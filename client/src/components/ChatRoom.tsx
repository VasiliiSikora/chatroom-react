import React, { useEffect, useState } from 'react'
import { SocketIOClient } from '../utils/SocketIOClient'
import { chatRoomTypes } from '../utils/chatrooms'
import { Chat } from './Chat'

interface props {
  socket: SocketIOClient.Socket
  username: string
  room: string
  logout: () => void
}

export function ChatRoom(props: props) {
    const [filter, setFilter] = useState('all')
    const [chatList, setchatList] = useState()
    const [selectedChat, setselectedChat] = useState(props.room)
    const [favChats, setfavChats] = useState([])

    const renderList = (list:any) => {
      return list.map((chat:any, index:any) => {
        return (
          <div></div>
        )
      })
    }
    
    const Chats = {}

    const logout = () => {} // won't be needed in Chat

    return (
        <div className='chatInterface'>
            <div className='chatRooms'>
                <h1 className='sectionTitle'>Chat Rooms</h1>
                <div className='roomListFilters'>
                    <button className='chatListFilter isActive' onClick={() => setFilter('all')}>ALL</button>
                    <span className="sectionCount">{}</span>
                    <button className='chatListFilter' onClick={() => setFilter('faves')}>FAVES</button>
                    <span className="sectionCount">{}</span>
                </div>
                {(filter === 'all') ? renderList(Chats) : renderList(favChats)}
            </div>
            <div className='chatDetails'>
              <Chat 
                socket={props.socket} 
                username={props.username} 
                room={props.room}
                logout={logout}
              />
            </div>

        </div>
    )
}