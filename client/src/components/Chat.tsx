import React, { useEffect } from 'react';
import { SocketIOClient } from '../utils/SocketIOClient'
import {useState} from 'react'
import { Socket } from 'socket.io-client';
import styled from 'styled-components'

interface props {
    socket: SocketIOClient.Socket
    username: string
    room: string
    logout: () => void
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
            // https://stackoverflow.com/questions/8513032/less-than-10-add-0-to-number && https://bobbyhadz.com/blog/javascript-get-hours-and-minutes-from-date#:~:text=To%20get%20the%20hours%20and,minutes%20in%20the%20specified%20date.
            time: new Date(Date.now()).getHours() + ':' + ('0' + new Date(Date.now()).getMinutes()).slice(-2)
        }

        await props.socket.emit("send_message", messageData)
        setMessageHistory((history) => [...history, messageData])
        setCurrentMessage('')
    }
}

// use useEffect to receive messages
useEffect(() => {
    props.socket.on("receive_message", (data: messageData) => {
        // https://stackoverflow.com/questions/64798809/how-to-setstate-with-an-array-and-object-in-typescript
        setMessageHistory((history) => [...history, data])
    })
}, [props.socket])

// auto scroll: https://stackoverflow.com/questions/42261524/how-to-window-scrollto-with-a-smooth-effect && https://codesandbox.io/s/8l2y0o24x9?file=/src/index.js:652-846
const ref = React.createRef<HTMLDivElement>();

const scrollToMyRef = () => {
    if (ref && ref.current) {
        const scroll =
            ref.current.scrollHeight -
            ref.current.clientHeight;
            ref.current.scrollTo({top: scroll, behavior: 'smooth'});
    }
};

const setLogout = props.logout

React.useEffect(() => {
    scrollToMyRef()
}, [messageHistory]);

    return (
        <div>
            <Container>
                <div className='chatWindow'>
                    <div className='chatHeader'>
                        <p>Chatroom: {props.room}</p>
                        <button onClick={() => setLogout()}>Logout</button>
                    </div>
                    <div className='chatBody' ref={ref}>
                        {messageHistory.map((messageContent) => {
                            return (
                                <div className='message' id={props.username === messageContent.author ? "you" : "other"}>
                                    <div>
                                        <div className='messageContent'>
                                            <p>{messageContent.message}</p>
                                        </div>
                                        <div className='timeAndUser'>
                                            <p>{messageContent.time}</p>
                                            <p className='author'>{messageContent.author}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='chatInput'>
                        <input id="inputID" 
                            type="text" 
                            placeholder='Message...'
                            value={currentMessage}
                            onChange={(event) => {
                                setCurrentMessage(event.target.value)
                            }}
                            // https://stackoverflow.com/questions/13987300/how-to-capture-enter-key-press
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    sendMessage();
                                    // event.target.value=""
                                    // setCurrentMessage("")
                                }
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
            overflow-y: scroll;
            overflow-x: hidden;
            &::-webkit-scrollbar {
                display: none;
            }
            .messageContainer {
                width: 100%;
                height: 100%;
                // https://www.w3schools.com/cssref/css3_pr_overflow-y.asp
                overflow-y: scroll;
                overflow-x: hidden;
                &::-webkit-scrollbar {
                    display: none;
                }
            }
            .message {
                height: auto;
                padding: 10px;
                display: flex;
                div {
                    max-width: 80%;
                }
                .messageContent {
                    width: auto;
                    height: auto;
                    min-height: 40px;
                    max-width: 100%;
                    border-radius: 5px;
                    color: #000000;
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
                .timeAndUser {
                    display: flex;
                    gap: 5px;
                    max-width: 100%;
                    font-size: 14px;
                    .author {
                        font-weight: bold;
                    }
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
    #you {
        // CSS ideas from here: https://www.cometchat.com/tutorials/how-to-build-a-chat-app-with-socket-io-node-js BUT instead of text-align flex works better
        justify-content: flex-end;
        .messageContent {
            justify-content: center;
            background-color: #c3e099;
        }
        .timeAndUser {
            justify-content: flex-end;
            margin-right: 5px;
        }
    }
    #other {
        justify-content: flex-start;
        .messageContent {
            justify-content: center;
            background-color: #a9cbe1;
        }
        .timeAndUser {
            justify-content: flex-start;
            margin-left: 5px;
        }
    }
`;