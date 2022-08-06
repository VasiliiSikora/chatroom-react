import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Cookies from "universal-cookie";
import { Chat } from './Chat'
import { ChatRoom } from './ChatRoom'
import { SocketIOClient } from '../utils/SocketIOClient'

//https://github.com/auth0/jwt-decode
import jwt_decode from 'jwt-decode'
import { io, Socket } from 'socket.io-client'
import { tokenToString } from 'typescript';

const cookies = new Cookies();
const userToken = cookies.get("TOKEN")

interface user {
    username: string,
    userEmail: string
}

interface jwtObject {
    exp: number,
    iat: number,
    userEmail: string,
    userId:string
}

// connect front end to backend
// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')
const socket: SocketIOClient.Socket = io()

// Use function components since a lot of useEffects
export function FrontPage() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [isLogin, setLogin] = useState(true)
    const [showChat, setShowChat] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = cookies.get("TOKEN")
        console.log(token)
        if(token) {
            console.log('token exists')
            const decodedToken: jwtObject = jwt_decode(token)
            console.log(decodedToken)
            setUsername(decodedToken.userId)
        } else {
            navigate('/login')
        }
    },[isLogin])

    const logout = () => {
        console.log('logout')
        cookies.remove("TOKEN")
        setLogin(false)
    }

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true); // show chat after joining the room
        }
    }

    return (
        
        <Container>
            {/* <button onClick={logout}>Logout</button> */}
            {!showChat ? (
                <div className='container'>
                    <div className="joinChatContainer">
                        <h3>Join a Room</h3>
                        <input 
                            data-testid='chatroom-username-input'
                            type='text' 
                            placeholder='John...' 
                            value={username}
                            onChange={(event) => {setUsername(event.target.value)}}/>
                        <input 
                            data-testid='chatroom-room-input'
                            type='text' 
                            placeholder='Room ID...'
                            onChange={(event) => {setRoom(event.target.value)}}/>
                        <button onClick={joinRoom}>Join</button>
                    </div>
                </div>
                )
            :
                (
                <ChatRoom 
                    socket={socket} 
                    username={username} 
                    room={room}
                    logout={logout}/>
                )
            }
        </Container>
    )
}

const Container = styled.div`
    background-image: url('https://media.istockphoto.com/vectors/seamless-pattern-with-social-media-elements-vector-id1216688115?k=20&m=1216688115&s=612x612&w=0&h=3sseE8vq-XIPRsv55mVU3kq4Rv1T5hhBWxQ0UogyG0w=');
    margin: 0%;
    padding: 0%;
    width: 100vw;
    height: 100vh;
    /* background: #fff; */
    color: #212121;
    /* display: grid; */
    justify-content: center;
    align-items: center;
    .container {
        padding-top: 20%;
    }
    .joinChatContainer {
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        background-color: #fff;
        width: 280px;
        margin: auto;
        border-radius: 20px;
        border: 2px solid black;
        padding: 20px 0px;
        h3 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        input {
            width: 210px;
            height: 40px;
            margin: 7px;
            border: 2px solid #43a047;
            border-radius: 5px;
            padding: 5px;
            font-size: 16px;    
        }
        button {
            width: 225px;
            height: 50px;
            margin: 7px;
            border: none;
            border-radius: 5px;
            padding: 5px;
            font-size: 16px;
            background: #43a047;
            color: #fff;
            cursor: pointer;
            &:hover {
                background: #2e7d32;
            }
        }
    }
`;