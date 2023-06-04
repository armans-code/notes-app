import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './auth/AuthContext';
import Layout from './components/Layout/Layout';
import CreateNote from './pages/CreateNote';
import EditNote from './pages/EditNote';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
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
