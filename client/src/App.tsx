import './App.css';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './auth/AuthContext';
import Layout from './components/Layout/Layout';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';
import { getAuth } from 'firebase/auth';

function App() {
  const { currentUser } = getAuth();
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: currentUser?.uid?.length ?? `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'include',
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/create'
            element={
              <Layout>
                <CreateNote />
              </Layout>
            }
          />
          <Route
            path='/edit/:id'
            element={
              <Layout>
                <EditNote />
              </Layout>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
