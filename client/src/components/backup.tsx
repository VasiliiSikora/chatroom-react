import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Cookies from "universal-cookie";
import { Channels, channel } from './Channels'

//https://github.com/auth0/jwt-decode
import jwt_decode from 'jwt-decode'

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

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

// Use function components since a lot of useEffects
export function Chat() {
    const [contacts, setContacts] = useState([])
    const [channels, setChannels] = React.useState<channel[]>([])
    const [channel, setChannel] = React.useState<channel | undefined>(undefined)

    const [currentUser, setCurrentUser] = React.useState<user | undefined>(undefined)
    const [isLogin, setLogin] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = cookies.get("TOKEN")
        const decodedToken: jwtObject = jwt_decode(token)
        console.log(decodedToken)
        if(token) {
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

    const handleChatChange = (channel:channel) => {
        setChannel(channel);
      };

    return (
        
        <Container>
            <div className='Container'>
                <Channels 
                    channels={channels}
                    changeChat={handleChatChange}
                />

            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #1d1d1d;
    .container {
        height: 85vh;
        width: 85vh;
        background-color: black;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width:720px) and (max-width:1080px) {
            grid-template-columns: 35% 65%;

        }
            
    }
`;