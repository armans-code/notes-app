import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function Header() {
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className='w-full'>
      <div className='flex items-center justify-between py-4 relative'>
        <Link to='/'>
          <p className='text-3xl font-bold text-indigo-600'>Notes</p>
        </Link>
        <div className='hidden md:flex items-center gap-2'>
          <Link to='/' className='p-2 mx-4 hover:text-indigo-700 transition-colors duration-300'>
            Notes
          </Link>
          <Link
            to='/create'
            className='p-2 mx-4 hover:text-indigo-700 transition-colors duration-300'
          >
            Create Note
          </Link>
          <div
            onClick={handleLogout}
            className='border rounded hover:bg-gray-50 transition-colors py-2 px-6 hover:cursor-pointer'
          >
            Sign Out
          </div>
        </div>
        <button className='md:hidden focus:outline-none' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className='md:hidden flex flex-col items-start gap-2'>
          <Link
            to='/'
            className='p-2 mx-4 hover:text-indigo-700 transition-colors duration-300'
            onClick={() => setIsMenuOpen(false)}
          >
            Notes
          </Link>
          <Link
            to='/create'
            className='p-2 mx-4 hover:text-indigo-700 transition-colors duration-300'
            onClick={() => setIsMenuOpen(false)}
          >
            Create Note
          </Link>
          <div
            onClick={handleLogout}
            className='border rounded hover:bg-gray-50 transition-colors py-2 px-6 hover:cursor-pointer'
          >
            Sign Out
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
