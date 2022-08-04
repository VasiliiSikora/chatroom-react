import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from './components/Register'
import { Chat } from './components/Chat'
import { Login } from './components/Login'
import { io, Socket } from 'socket.io-client'
import { FrontPage } from './components/FrontPage';

// interfaces for socekt.io types: https://socket.io/docs/v4/typescript/
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}
// connect front end to backend
// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3001')

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<FrontPage />} />
      </Routes>
    </BrowserRouter>
  );
}

