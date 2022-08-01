import React from 'react';
import { SocketIOClient } from '../utils/SocketIOClient'

interface props {
    socket: SocketIOClient.Socket
    username: string
    room: string
}

export function Chat(props: props) {
    return (
        <div>
            <div className='chat-header'>
                <p>Chatroom</p>
            </div>
            <div className='chat-body'>

            </div>
            <div className='chat-footer'>
                <input type="text" />
            </div>
        </div>
    );
};
