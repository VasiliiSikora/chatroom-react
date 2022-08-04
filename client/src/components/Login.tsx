import { useState, useEffect, Component } from 'react'
import styled from 'styled-components'
import { Link, useNavigate, NavigateFunction, Navigate } from 'react-router-dom'
// https://fkhadra.github.io/react-toastify/installation
import { ToastContainer, toast, ToastOptions} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Cookies from "universal-cookie";

const cookies = new Cookies();

// //https://reactrouter.com/docs/en/v6/hooks/use-navigate
// let navigate = useNavigate()

// Set interfaces to be used for state and ReactToastify, need to be outside of Register class
interface RegisterState {
    username: String,
    password: String,
    shouldRedirect: boolean,
    isLogin: boolean
}

const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
} 


export class Login extends Component<{}, RegisterState> {
// Props: https://stackoverflow.com/questions/71668651/withnavigation-on-class-component-with-typescript
    constructor(props: {}) {
        super(props)
        this.state = {
            username: '',
            password: '',
            shouldRedirect: false,
            isLogin: false,
        }
    }

    // Use componentDidMount & componentWillUnmount in place of useEffect since class components can't use hooks
    componentDidMount() {
        // const token = cookies.get("TOKEN")
        // if(token) {
        //     this.setState({...this.state, shouldRedirect: true, isLogin: true})
        // }
    }

    componentWillUnmount() {

    }

    handlePasswordConfirm = () => {
        const {username, password} = this.state;
        if (username.length === 0) {
            toast.error(
                'Email & Password Required', toastOptions
            )
            return false;
        } else if (password.length === 0) {
            toast.error(
                'Email & Password Required', toastOptions
            )
            return false;
        } 
        return true;
    }

    // Set type for events https://stackoverflow.com/questions/42081549/typescript-react-event-types
    handleSubmit = async (event: React.FormEvent): Promise<any> => {
        event.preventDefault();
        if (this.handlePasswordConfirm()) {
            const {username, password} = this.state;
            const {data} = await axios.post('/api/auth/login', {
                username, 
                password
            });
            if (data.status===false) {
                toast.error(data.msg, toastOptions)
            }
            if (data.status===true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                // https://reactrouter.com/docs/en/v6/hooks/use-navigate
                const state = {...this.state}
                cookies.set("TOKEN", data.token, {
                    path: "/",
                });
                this.setState({...state, shouldRedirect: true, isLogin: true})
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
                                type="password" 
                                placeholder='Password' 
                                name='password' 
                                onChange={(event) => this.handleChange(event)}
                            />
                            <button type='submit'>Login</button>
                            <span>
                                Need to sign-up? 
                                <Link to='/register'>Register</Link>
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

