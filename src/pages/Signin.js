import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { signin } from '../api/auth';
import { AuthContext } from '../context/AuthContextComponent';
import LottieAnimation from '../components/LottieAnimation';

export default function Signin() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await signin(text, password);

      setUser(response.user);

      if (response.error) {
        setErrorMessage('User does not exist.');

        // Display SweetAlert for login failure
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User does not exist.',
        });
      } else {
        const { token } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('loggedIn', true);
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      
      // Set a generic error message
      setErrorMessage('Authentication failed. Please try again.');

      // Display SweetAlert for login failure
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Authentication failed. Please try again.',
      });
    }
  }

  return (
    <div className="bg-off-white min-h-[100vh]">
      <div className="flex flex-col items-center justify-center w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] mx-auto overflow-x-hidden pt-32 sm:pt-48">
      </div>
      <form className='flex flex-col mx-auto justify-center items-center' onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl leading-9 tracking-tight mt-16 mb-10">
          Sign in to your account
        </h2>
        <div className="w-72">
          <input
            className="w-full p-3 border border-black mb-6 bg-off-white placeholder-black"
            type="text"
            name="username"
            placeholder="name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="w-full p-3 border border-black bg-off-white placeholder-black"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className=" flex flex-col justify-center items-center">
            <button type="submit" className="mt-12 w-48 lg:w-60 border bg-off-red border-black p-2 font-bold">Sign In</button>
            <span className="mt-8">
              {'Not a user yet? '}
              <Link to="/auth/signup" className="text-indigo-600 hover:text-black">Sign Up</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
