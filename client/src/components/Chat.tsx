import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Cookies from "universal-cookie";

//https://github.com/auth0/jwt-decode
import jwt_decode from 'jwt-decode'

const cookies = new Cookies();
const userToken = cookies.get("TOKEN")
console.log(jwt_decode(userToken))

// Use function components since a lot of useEffects
export function Chat() {
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [isLogin, setLogin] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const token = cookies.get("TOKEN")
        if(token) {
            setLogin(true)
        } else {
            setLogin(false)
            navigate('/login')
        }
    },[])

    return (
        
        <Container>
            <div className='Container'>

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