import React, { useContext, useState } from 'react';
import { auth } from './firebase';
import { useEffect } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from '../gql/queries';
import { Account } from '../types/types';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  currentUser: User | null;
  account: Account | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}

function setAccessToken(user: User) {
  user.getIdToken().then((token: string) => localStorage.setItem('accessToken', token));
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const [getUser, { error }] = useLazyQuery(GET_PROFILE, {
    fetchPolicy: 'network-only',
  });

  async function login(email: string, password: string): Promise<void> {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return setAccessToken(res.user);
  }

  async function logout(): Promise<void> {
    await signOut(auth);
    return localStorage.removeItem('accessToken');
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      console.log(user);

      getUser({
        variables: { id: user?.uid },
      })
        .then((data) => {
          setAccount(data?.data?.user);
        })
        .catch((e) => console.log(e));

      if (error) console.log(error);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    currentUser,
    account,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
