import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';
import NoteCard from '../components/Home/NoteCard';
import { useQuery } from '@apollo/client';
import { GET_USER_NOTES } from '../gql/queries';
import { Note } from '../types/types';
import { useState } from 'react';

function Home() {
  const [search, setSearch] = useState('');
  const { account } = useAuth();

  const { loading, data, error } = useQuery(GET_USER_NOTES, {
    variables: {
      id: account?.id,
    },
    fetchPolicy: 'network-only',
  });
  if (error) console.log(error);
  return (
    <div className='mx-auto flex flex-col items-center'>
      <div className='mt-10 w-full flex flex-col md:flex-row items-center gap-4'>
        <input
          placeholder='Search for a note'
          className='w-full flex-grow h-full border outline-none py-2 px-3 rounded-md'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to='/create'
          className='w-full md:w-min text-white bg-indigo-600 rounded-md py-2 px-3 gap-1 whitespace-nowrap flex items-center justify-center font-semibold shadow transition hover:scale-105 '
        >
          Create Note
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      <div className='mt-4 flex flex-col gap-4 items-center w-full'>
        {data?.user.notes.map((note: Note) => {
          if (
            note.description.includes(search) ||
            note.createdAt.slice(0, 10).includes(search) ||
            note.updatedAt.slice(0, 10).includes(search)
          )
            return <NoteCard key={note?.id} note={note} />;
        })}
      </div>
    </div>
  );
}

export default Home;
