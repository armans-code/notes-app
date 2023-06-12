import { Link } from 'react-router-dom';
import { Note } from '../../types/types';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { REMOVE_NOTE } from '../../gql/mutations';
import { useAuth } from '../../auth/AuthContext';
import { GET_USER_NOTES } from '../../gql/queries';

function NoteCard({ note }: { note: Note }) {
  const { account } = useAuth();
  const [deleteNote] = useMutation(REMOVE_NOTE);

  const handleDelete = () => {
    deleteNote({
      variables: {
        removeNoteInput: {
          id: note?.id,
        },
      },
      refetchQueries: [GET_USER_NOTES],
    }).catch((e) => console.log(e));
  };

  return (
    <div className='shadow flex flex-col items-start bg-white py-4 px-6 w-full rounded-2xl overflow-hidden'>
      <div className='flex items-center justify-between w-full'>
        <p className='max-w-full break-words font-bold'>
          {note?.createdAt == note?.updatedAt
            ? `Created ${moment(note?.createdAt).toISOString().slice(0, 10)}`
            : `Created ${moment(note?.createdAt).toISOString().slice(0, 10)}, Updated ${moment(
                note?.updatedAt,
              )
                .toISOString()
                .slice(0, 10)}`}
        </p>
        <p className='text-gray-500 max-w-full break-words'>{moment(note?.createdAt).fromNow()}</p>
      </div>
      <div className='mt-6'>
        <p className='text-left max-w-full break-words'>{note?.description}</p>
      </div>
      <div className='mt-6 flex w-full items-center gap-3'>
        <Link to={`/edit/${note?.id}`}>
          <button className='flex bg-[#f9f9f9] hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300 border border-gray-200 items-center px-3.5 py-1.5 gap-3 rounded-lg'>
            <p className='text-gray-700 max-w-full break-words'>Edit Note</p>
          </button>
        </Link>
        <button
          className='flex border-red-500 bg-white hover:bg-gray-200 transition-colors duration-300 border items-center px-3.5 py-1.5 gap-3 rounded-lg'
          onClick={handleDelete}
        >
          <p className='text-red-500 max-w-full break-words'>Delete Note</p>
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
