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
    // https://stackoverflow.com/questions/64798809/how-to-setstate-with-an-array-and-object-in-typescript
    const [messageHistory, setMessageHistory] = React.useState<Array<messageData>>([])

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
        setMessageHistory((history) => [...history, messageData])
    }
}

// use useEffect to receive messages
useEffect(() => {
    props.socket.on("receive_message", (data: messageData) => {
        // https://stackoverflow.com/questions/64798809/how-to-setstate-with-an-array-and-object-in-typescript
        setMessageHistory((history) => [...history, data])
    })
}, [props.socket])

    return (
        <div>
            <Container>
                <div className='chatWindow'>
                    <div className='chatHeader'>
                        <p>Chatroom: {props.room}</p>
                    </div>
                    <div className='chatBody'>
                        {messageHistory.map((messageContent) => {
                            return <h1>{messageContent.message}</h1>
                        })}
                    </div>
                    <div className='chatInput'>
                        <input 
                            type="text" 
                            placeholder='Message...'
                            onChange={(event) => {
                                setCurrentMessage(event.target.value)
                            }}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

const Container = styled.div`
    margin: 0%;
    padding: 0%;
    width: 100vw;
    height: 100vh;
    background: #fff;
    color: #212121;
    display: grid;
    justify-content: center;
    align-items: center;
    .chatWindow {
        width: 80vw;
        height: 75vh;
        p {
            margin: 0;
        }
        .chatHeader {
            height: 45px;
            border-radius: 6px;
            background: #263238;
            position: relative;
            display: flex;
            justify-content: center;
            cursor: pointer;
            p {
                display: block;
                padding: 0 1em 0 2em;
                color: #fff;
                font-weight: 700;
                line-height: 45px;
            }
        }
        .chatBody {
            height: calc(75vh - (45px + 70px));
            border: 1px solid #263238;
            background: #fff;
            position: relative;
            .message-container {
                width: 100%;
                height: 100%;
            }
            .message {
                height: auto;
                padding: 10px;
                display: flex;
                .messageContent {
                    width: auto;
                    height: auto;
                    min-height: 40px;
                    max-width: 120px;
                    background-color: #43a047;
                    border-radius: 5px;
                    color: white;
                    display: flex;
                    align-items: center;
                    margin-right: 5px;
                    margin-left: 5px;
                    padding-right: 5px;
                    padding-left: 5px;
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
                    overflow-wrap: break-word;
                    word-break: break-word;
                }
            }
        }
        .chatInput {
                height: 40px;
                border: 1px solid #263238;
                border-top: none;
                display: flex;
                input {
                    height: 100%;
                    flex: 85%;
                    border: 0;
                    padding: 0 0.7em;
                    font-size: 1em;
                    border-right: 1px dotted #607d8b;
                    outline: none;
                    font-family: "Open Sans", sans-serif;
                }
                button {
                    border: 0;
                    display: grid;
                    place-items: center;
                    cursor: pointer;
                    flex: 15%;
                    height: 100%;
                    background: transparent;
                    outline: none;
                    font-size: 25px;
                    color: lightgray;
                    &:hover {
                        background-color: #43a047;
                    }
                }
            }
    }
`;