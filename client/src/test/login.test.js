import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Login } from '../components/Login'
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
// https://stackoverflow.com/questions/70805929/how-to-fix-error-usehref-may-be-used-only-in-the-context-of-a-router-compon
import { MemoryRouter } from 'react-router-dom';

let mockAxios;

beforeAll(() => {
  // Before we run any tests, set up the mock version of axios
  mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  // After each test, reset the mock (so one test can't interfere with another)
  mockAxios.reset();
});

afterAll(() => {
  // After we're done testing, put normal axios back where it was.
  mockAxios.restore();
});

test("has input box and translate button at start", () => {
    render(<Login />, {wrapper: MemoryRouter});

    expect(screen.getByTestId('login-username-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-password-input')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
});

test("clicking login with all data entered sends post request", async () => {

  const userData = {
    data: {
      username: 'test',
      password: 'password'
    }
  };

  mockAxios.onPost().reply(200, userData);

  render(<Login />, {wrapper: MemoryRouter});

  // Enter a "username" into the text box
  const usernameInput = screen.getByTestId('login-username-input');
  fireEvent.change(usernameInput, { target: { value: "test" } });

  // Enter a "password" into the text box
  const passwordInput = screen.getByTestId('login-password-input');
  fireEvent.change(passwordInput, { target: { value: "" } });

  // Click the Login button
  fireEvent.click(screen.getByText('Login'));

  expect(await screen.findByText("Email & Password Required")).toBeInTheDocument();
})

test("clicking login without password triggers alert", async () => {

  const userData = {
    data: {
      username: 'test',
      password: 'password'
    }
  };

  mockAxios.onPost().reply(200, userData);

  render(<Login />, {wrapper: MemoryRouter});

  // Enter a "username" into the text box
  const usernameInput = screen.getByTestId('login-username-input');
  fireEvent.change(usernameInput, { target: { value: "test" } });

  // Enter a "password" into the text box
  const passwordInput = screen.getByTestId('login-password-input');
  fireEvent.change(passwordInput, { target: { value: "password" } });

  // Click the Login button
  fireEvent.click(screen.getByText('Login'));

  expect(mockAxios.history.post.length).toEqual(1)
  // expect(await screen.findByText("Email & Password Required")).toBeInTheDocument();
})

test("Login page contains a link to register page", async () => {

  render(<Login />, {wrapper: MemoryRouter});

  const links = screen.getAllByRole("link");

  expect(links[0].textContent).toEqual("Register");
  expect(links[0].href).toContain("/register");
})