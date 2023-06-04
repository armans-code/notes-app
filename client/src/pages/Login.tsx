import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login(email, password).then(() => navigate('/'));
    } catch (error: any) {
      console.log(error?.code);
      setError(error?.code);
    }
  };
  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12'>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <div className='flex flex-col gap-4 mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <p className='text-red-400'>{error}</p>
          <div>
            <label className='text-gray-900'>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full border px-2 rounded-md py-1 text-gray-900'
            />
          </div>
          <div>
            <label className='text-gray-900'>Password</label>
            <input
              value={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              className='w-full border px-2 rounded-md py-1 text-gray-900'
            />
          </div>
          <p>
            No account?{' '}
            <Link to='/register' className='text-indigo-600'>
              Register here
            </Link>
          </p>
          <div>
            <button
              onClick={handleSubmit}
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
