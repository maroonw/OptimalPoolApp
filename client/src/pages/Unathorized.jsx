import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className='container'>
      <h2>You do not have permission to view this page.</h2>
      <p>Please sign in or sign up to continue.</p>
      <div>
        <button onClick={() => navigate('/sign-in')}>Sign In</button>
        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
      </div>
    </div>
  );
}

