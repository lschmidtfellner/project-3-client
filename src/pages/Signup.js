import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from '../api/auth';
import Modal from 'react-modal';

Modal.setAppElement('#root') // replace #root with the id of your application's root element

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        const response = await signup(username, email, password);
        if (response.status === 200) {
          setSignupSuccess(true);
        }
    } catch (error) {
      console.log("Error during signup:", error);
    }
  }

  function handleDismiss() {
    setSignupSuccess(false);
  }

  return (
    <div>
      <h1>Sign Up</h1>
      {console.log(signupSuccess)}
      <Modal
        isOpen={signupSuccess}
        onRequestClose={handleDismiss}
        contentLabel="Success Modal"
      >
        <h2>You've successfully signed up!</h2>
        <Link to="/auth/signin">Sign in</Link>
        <button onClick={handleDismiss}>Dismiss</button>
      </Modal>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Signup</button>
      </form>
      {!signupSuccess && (
        <span>
          {"Already a user? "}
          <Link to="/auth/signin">Go to Signin</Link>
          {" instead."}
        </span>
      )}
    </div>
  );
}
