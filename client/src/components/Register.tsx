import { useState, useEffect, Component } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, NavigateFunction, Navigate } from 'react-router-dom'
// https://fkhadra.github.io/react-toastify/installation
import { ToastContainer, toast, ToastOptions} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Cookies from "universal-cookie";
import logo from '../logo.png'

const cookies = new Cookies();

// //https://reactrouter.com/docs/en/v6/hooks/use-navigate
// let navigate = useNavigate()

// Set interfaces to be used for state and ReactToastify, need to be outside of Register class
interface RegisterState {
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    shouldRedirect: boolean
}

const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
} 


export class Register extends Component<{}, RegisterState> {
// Props: https://stackoverflow.com/questions/71668651/withnavigation-on-class-component-with-typescript
    constructor(props: {}) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            shouldRedirect: false
        }
    }

    // Use componentDidMount & componentWillUnmount in place of useEffect since class components can't use hooks
    componentDidMount() {
        const token = cookies.get("TOKEN")
        if(token) {
            this.setState({...this.state, shouldRedirect: true})
        }
    }

    handlePasswordConfirm = () => {
        const {username, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword) {
            toast.error(
                'Passwords do not match', toastOptions
            )
            return false;
        } else if (username.length<3) {
            toast.error(
                'Username should be at least 4 characters', toastOptions
            )
            return false;
        } else if (password.length<3) {
            toast.error(
                'Password should be at least 8 characters', toastOptions
            )
            return false;
        } else if (email==="") {
            toast.error(
                'Enter a valid email', toastOptions
            )
            return false;
        }
        return true;
    }

    // Set type for events https://stackoverflow.com/questions/42081549/typescript-react-event-types
    handleSubmit = async (event: React.FormEvent): Promise<any> => {
        event.preventDefault();
        if (this.handlePasswordConfirm()) {
            const {username, email, password} = this.state;
            const {data} = await axios.post('/api/auth/register', {
                username, 
                email, 
                password
            });
            if (data.status===false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status===true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                // https://reactrouter.com/docs/en/v6/hooks/use-navigate
                const state = {...this.state}
                this.setState({...state, shouldRedirect: true})
            }
        }
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
            {this.state.shouldRedirect ? // https://stackoverflow.com/questions/47679941/redirect-in-react-with-typescript
                <Navigate to='/' /> :
                <>
                    <FormContainer>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <div className='logo'>
                                <img src={logo} alt="" />
                                <h1>Waffle</h1>
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
            }
            </>
        )
    }

}

// react-styled-components to set form styling
const FormContainer = styled.div`
    background-image: url('https://media.istockphoto.com/vectors/seamless-pattern-with-social-media-elements-vector-id1216688115?k=20&m=1216688115&s=612x612&w=0&h=3sseE8vq-XIPRsv55mVU3kq4Rv1T5hhBWxQ0UogyG0w=');
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: centre;
    align-items: center;
    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 15px;
        img {
            height: 90px;
        }
        h1 {
            color: #000000;
            font-size: 40px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        /* background-color: #ffffff; */
        border-radius: 30px;
        padding: 20px;
        text-align: center;
        align-items: center;
        background-color: #fff;
        width: 260px;
        margin: auto;
        border-radius: 20px;
        border: 2px solid black;
        /* gap: 10px; */
        input {
            width: 210px;
            height: 40px;
            margin: 7px;
            border: 2px solid #43a047;
            border-radius: 5px;
            padding: 5px;
            font-size: 16px; 
        }
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
    span {
        color: #000000;
        a {
            color: #43a047;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;

