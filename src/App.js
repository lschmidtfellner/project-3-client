import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { AuthContext } from './context/AuthContextComponent';

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/auth/signin" element={<Signin/>} />
      </Routes>
    </>
  );
}

export default App;
