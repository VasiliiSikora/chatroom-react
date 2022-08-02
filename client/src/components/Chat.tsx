import React, { useEffect } from 'react';
import { SocketIOClient } from '../utils/SocketIOClient'
import {useState} from 'react'
import { Socket } from 'socket.io-client';
import styled from 'styled-components'

interface props {
    socket: SocketIOClient.Socket
    username: string
    room: string
}

interface messageData {
    room: string
    author: string
    message: string
    time: string
}

export function Chat(props: props) {
    const [currentMessage, setCurrentMessage] = useState("")

const sendMessage = async () => {
    if (currentMessage !== "") {
        // create necessary object with room, message, date, user
        const messageData: messageData = {
            room: props.room,
            author: props.username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
        }

        await props.socket.emit("send_message", messageData)
    }
}

// use useEffect to receive messages
useEffect(() => {
    props.socket.on("receive_message", (data: messageData) => {
        console.log(data)
    })
}, [props.socket])

    return (
        <div>
            <Container>
                <div className='chat-header'>
                    <p>Chatroom</p>
                </div>
                <div className='chat-body'>

                </div>
                <div className='chat-footer'>
                    <input 
                        type="text" 
                        placeholder='Message...'
                        onChange={(event) => {
                            setCurrentMessage(event.target.value)
                        }}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </Container>
        </div>
    );
};

const Container = styled.div`
    
`;