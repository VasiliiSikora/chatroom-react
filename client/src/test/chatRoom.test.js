import {FrontPage} from '../components/FrontPage'
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
// https://stackoverflow.com/questions/70805929/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-compon
import { MemoryRouter } from 'react-router-dom';

const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

window.setImmediate = window.setTimeout;

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

/**
 * Setup WS & HTTP servers
 */
 beforeAll(async () => {
    httpServer = http.createServer().listen();
    httpServerAddr =  httpServer.address();
    ioServer = ioBack(httpServer);
  });

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    done();
  });
});

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});


describe('Socket.io FrontPage Join Room', () => {
  test('Should join room entered when join room clicked', (done) => {
    //https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
    window.HTMLElement.prototype.scrollTo = function() {};
    render(<FrontPage />, {wrapper: MemoryRouter});

      // Enter a "username" into the text box
    const usernameInput = screen.getByTestId('chatroom-username-input');
    fireEvent.change(usernameInput, { target: { value: "username" } });

    // Enter a "password" into the text box
    const passwordInput = screen.getByTestId('chatroom-room-input');
    fireEvent.change(passwordInput, { target: { value: "room" } });

    // Click the Login button
    fireEvent.click(screen.getByText('Join'));

    ioServer.once("join_room", (arg) => {
      expect(arg).toBe("room");
      done();
    });

    // once connected, emit Hello World
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });

});






 