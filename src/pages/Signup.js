import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import Modal from 'react-modal';
import LottieAnimation from '../components/LottieAnimation';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!username || !email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return; // Exit the function early if not all fields are filled
    }

    try {
      const response = await signup(username, email, password);
      if (response.status === 200) {
        setSignupSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        Swal.fire({
          icon: 'success',
          title: 'Successfully signed up!'
        }).then(() => {
          navigate('/auth/signin');
        });
      }
    } catch (error) {
      console.log("Error during signup:", error);
    }
  }

  function handleDismiss() {
    setSignupSuccess(false);
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-max">
      <div className="lg:w-1/3 md:w-1/3 w-full mx-auto bg-white">
        <LottieAnimation />
      </div>
      <form onSubmit={handleSubmit} className="placeholder:">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600 mt-16 mb-10">
          Create an account
        </h2>
        <div className="lg:w-2/5 md:w-2/5 w-full mx-auto">
          <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-8"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-8"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="mb-8">
            <button type="submit" className="rounded-full pink-bg w- lg:w-1/6 md:w-1/6 py-2 w-1/3  text-white font-bold  hover:text-black mt-4">Signup</button>{' '}
            {!signupSuccess && (
              <span className="ml-2 mt-4 lg:w-1/6 md:w-1/6">
                {"Already a user? "}
                <Link to="/auth/signin" className="text-indigo-600 hover:text-black">Signin</Link>
                {/* {" instead."} */}
              </span>
            )}
          </div>
        </div>
      </form >
    </div>

  )
}


