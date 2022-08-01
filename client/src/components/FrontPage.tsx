import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Cookies from "universal-cookie";
import { Channels, channel } from './Channels'
import { Chat } from './Chat'

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

// https://stackoverflow.com/questions/14084406/typescript-and-socket-io

declare module SocketIOClient {
    interface Socket {
        on(event: string, fn: Function): Socket;
        once(event: string, fn: Function): Socket;
        off(event?: string, fn?: Function): Socket;
        emit(event: string, ...args: any[]): Socket;
        listeners(event: string): Function[];
        hasListeners(event: string): boolean;
        connected: boolean;
    }

    interface ManagerStatic {
        (url: string, opts: any): SocketIOClient.Manager;
        new (url: string, opts: any): SocketIOClient.Manager;
    }

    interface Manager {
        reconnection(v: boolean): Manager;
        reconnectionAttempts(v: boolean): Manager;
        reconnectionDelay(v: boolean): Manager;
        reconnectionDelayMax(v: boolean): Manager;
        timeout(v: boolean): Manager;
    }
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
            <Chat 
                socket={socket} 
                username={username} 
                room={room} />
        </Container>
    )
}

const Container = styled.div`
    
`;