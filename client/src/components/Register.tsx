import { useState, useEffect, Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// https://fkhadra.github.io/react-toastify/installation
import { ToastContainer, toast, ToastOptions} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Set interfaces to be used for state and ReactToastify, need to be outside of Register class
interface RegisterState {
    username: String,
    email: String,
    password: String,
    confirmPassword: String
}

const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
} 

export class Register extends Component<{}, RegisterState> {

    constructor() {
        super({})
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handlePasswordConfirm = () => {
        const {username, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', toastOptions)
        }
    }

    // Set type for events https://stackoverflow.com/questions/42081549/typescript-react-event-types
    handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        this.handlePasswordConfirm()
    }

    handleChange = (event: React.ChangeEvent): void => {
        // Set type for event.target https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
        const target = event.target as HTMLTextAreaElement;
        this.setState({...this.state, [target.name]: target.value})
    }

    render() {
        return (
            // to have parent element use <>
            <> 
            {/* FormContainer used for react-styled-components */}
                <FormContainer>
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <div className='logo'>
                            <img src="" alt="" />
                            <h1>ChatRoom</h1>
                        </div>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            name='username' 
                            onChange={(event) => this.handleChange(event)}
                        />
                        <input 
                            type="text" 
                            placeholder='Email' 
                            name='email' 
                            onChange={(event) => this.handleChange(event)}
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            name='password' 
                            onChange={(event) => this.handleChange(event)}
                        />
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            name='confirmPassword' 
                            onChange={(event) => this.handleChange(event)}
                        />
                        <button type='submit'>Create User</button>
                        <span>
                            Already have an account? 
                            <Link to='/login'>Login</Link>
                            </span>
                    </form>
                </FormContainer>
                <ToastContainer />
            </>
        )
    }

}

// react-styled-components to set form styling
const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: centre;
    align-items: center;
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        h1 {
            color: white;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        background-color: black;
        border-radius: 30px;
        padding: 45px 75px;
        input {
            background-color: transparent;
            padding: 15px;
            border: 2px solid white;
            border-radius: 8px;
            color: white;
            width: 100%;
        }
    }
    button {
        background-color: black;
        color: white;
        padding: 15px 30px;
        cursor: pointer;
        border-radius: 8px;
        &:hover {
            background-color: #494949;
        }
    }
    span {
        color: white;
        a {
            color: blue;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;