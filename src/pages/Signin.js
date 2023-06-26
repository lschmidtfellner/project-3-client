import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../api/auth';
import { AuthContext } from '../context/AuthContextComponent';
import LottieAnimation from '../components/LottieAnimation';

export default function Signin() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // New state variable for error message
  const navigate = useNavigate()
  const { setIsLoggedIn, setUser } = useContext(AuthContext)



  async function handleSubmit(e) {
    e.preventDefault()

    try {
      // Make a request to the server to authenticate the user
      const response = await signin(text, password)

      setUser(response.user)

      if (response.error) {
        // Authentication failed - user does not exist
        setErrorMessage('User does not exist.')
      } else {
        // Authentication succeeded
        const { token } = response
        // Store the token in local storage
        localStorage.setItem('token', token)
        localStorage.setItem('loggedIn', true)
        // Set the authentication state to true
        setIsLoggedIn(true)
        // Set user

        // Redirect the user to the authenticated route
        navigate('/')
      }
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication failed:', error)
      setErrorMessage('Authentication failed. Please try again.') // Set a generic error message
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-max">
      <div className="lg:w-1/3 md:w-1/3 w-full mx-auto bg-white">
        {/* <LottieAnimation />Render the LottieAnimation component */}
        <LottieAnimation />
      </div>
      <form onSubmit={handleSubmit} className="placeholder:">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600 mt-16 mb-10">
          Sign in to your account
        </h2>
        <div className="lg:w-2/5 md:w-2/5 w-full mx-auto">
          <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="username"
            placeholder="name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-8"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-8">
            <button type="submit" className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-2 w-1/3  text-white font-bold  hover:text-black mt-4">Sign In</button>{' '}
            {/* Specify the type as "submit" */}
            <span className="ml-2 mt-4 lg:w-1/6 md:w-1/6">
              {'Not a user yet? '}
              <Link to="/auth/signup" className="text-indigo-600 hover:text-black">Sign Up</Link>
            </span>
          </div>
        </div>
      </form>

    </div>
  )
}
