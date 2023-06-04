import React from 'react';
import Header from './Header';
import { useAuth } from '../../auth/AuthContext';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  const { currentUser } = useAuth();
  return currentUser ? (
    <div className='flex flex-col justify-start w-9/12 md:w-7/12 mx-auto'>
      <Header />
      <main>{children}</main>
    </div>
  ) : (
    <Navigate to='/login' />
  );
}

export default Layout;
