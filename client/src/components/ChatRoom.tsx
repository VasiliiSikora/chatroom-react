import React, { useEffect, useState } from 'react'
import { SocketIOClient } from '../utils/SocketIOClient'
import { chatRoomTypes } from '../utils/chatrooms'
import { Chat } from './Chat'
import styled from 'styled-components'

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
          <h1>{chat.roomName}</h1>
        )
      })
    }
    
    const Chats: chatRoomTypes.chatRoom[] = [
      {
          roomName: 'Global',
          favourited: false
      },
      {
        roomName: 'Animals',
        favourited: false
      },
      {
        roomName: 'Gaming',
        favourited: false
      },
      {
        roomName: 'Cooking',
        favourited: false
      },
      {
        roomName: 'Programming',
        favourited: false
      },
      {
        roomName: 'Meetups',
        favourited: false
      },
    ]

    const logout = () => {} // won't be needed in Chat

    return (
      <Container>
        <div className='chatInterface'>
            <div className='chatRooms'>
                <h1 className='sectionTitleList'>Chat Rooms</h1>
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
      </Container>
    )
}

const Container = styled.div`
  .chatInterface {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: stretch;
    justify-content: space-around;
    .chatRooms {
      position: relative;
      flex: 1 0 33.333333%;
      height: 100%;
      padding: 3.6em 0 0;
      overflow-y: scroll;
      background-color: #f0f0f0;
      .sectionTitleList {
        width: 33.333333%;
        left: 0;
        position: fixed;
        top: 0;
        z-index: 10;
        background-color: #777;
        color: white;
        text-align: center;
        font-size: 0.75em;
        padding: 0.5em;
        margin: 0 0 0.1em;
        letter-spacing: 0.3em;
        text-transform: uppercase;
      }
    }
    .chatDetails {
      flex: 0 1 66.666666%;
      background-color: #f0f0f0;
    }
    .roomListFilters {
      position: fixed;
      top: 1.6em;
      left: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      width: 33.333333%;
      .chatListFilter {
        flex-grow: 1;
        background-color: #bbb;
        color: white;
        text-align: center;
        font-size: 0.75em;
        font-weight: bold;
        padding: 0.5em;
        margin: 0 0 0.1em;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        border:none;
        &:hover {
          background-color: hsl(177, 70%, 46%);
        }
        &:active {
          background-color: rgb(40, 205, 197);
        }
      }
      .isActive {
        background-color: lightseagreen;
      }
      .sectionCount {
        display: inline-block;
        background-color: white;
        color: black;
        text-align: center;
        /* padding: 0.25em 0.25em 0.25em 0.5em; */
        border-radius: 20%;
        /* margin-left: 0.5em; */
        font-weight: bold;
      }
    }
    .chatDetails {
      position: relative;
      overflow-y: scroll;
    }
  }
`;