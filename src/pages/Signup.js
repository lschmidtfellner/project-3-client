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
    <div className="bg-off-white min-h-[100vh]">
      <div className="flex flex-col items-center justify-center w-[90%]  mx-auto overflow-x-hidden pt-32 sm:pt-48">
      </div>
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col justify-center items-center w-72">
        <h2 className="text-center text-2xl leading-9 tracking-tight mt-16 mb-10">
          Create an account
        </h2>
        <div className="w-full mx-auto">
          <input className="w-full p-3 border border-black mb-6 bg-off-white placeholder-black"
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
          <input className="w-full p-3 border border-black mb-6 bg-off-white placeholder-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input className="w-full p-3 border border-black bg-off-white placeholder-black"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="mb-8 flex flex-col jusify-center items-center">
            <button type="submit" className="mt-12 w-48 lg:w-60 border bg-off-red border-black p-2 font-bold">Signup</button>{' '}
            {!signupSuccess && (
              <span className="mt-8">
                {"Already a user? "}
                <Link to="/auth/signin" className="text-indigo-600 hover:text-black">Sign In</Link>
                {/* {" instead."} */}
              </span>
            )}
          </div>
        </div>
      </form >
    </div>

  )
}


