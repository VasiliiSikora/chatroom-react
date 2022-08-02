import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Cookies from "universal-cookie";
import { Channels, channel } from './Channels'
import { Chat } from './Chat'
import { SocketIOClient } from '../utils/SocketIOClient'

//https://github.com/auth0/jwt-decode
import jwt_decode from 'jwt-decode'
import { io, Socket } from 'socket.io-client'

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
const socket: SocketIOClient.Socket = io('http://localhost:3001')

// Use function components since a lot of useEffects
export function FrontPage() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [currentUser, setCurrentUser] = React.useState<user | undefined>(undefined)
    const [isLogin, setLogin] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = cookies.get("TOKEN")
        if(token) {
            const decodedToken: jwtObject = jwt_decode(token)
            console.log(decodedToken)
            setCurrentUser({
                username: decodedToken.userId,
                userEmail: decodedToken.userEmail
            })
            setLogin(true)
        } else {
            setLogin(false)
            navigate('/login')
        }
    },[])

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room)
        }
    }

    return (
        
        <Container>
            <div className="joinChatContainer">
                <h3>Join a Chatroom</h3>
                <input 
                    type='text' 
                    placeholder='John...' 
                    onChange={(event) => {setUsername(event.target.value)}}/>
                <input 
                    type='text' 
                    placeholder='Room ID...'
                    onChange={(event) => {setRoom(event.target.value)}}/>
                <button onClick={joinRoom}>Join</button>
            </div>
            <Chat 
                socket={socket} 
                username={username} 
                room={room} />
        </Container>
    )
}

const Container = styled.div`
    margin: 0%;
    padding: 0%;
    .joinChatContainer {
        display: flex;
        flex-direction: column;
        text-align: center;
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