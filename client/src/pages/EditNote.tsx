import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_NOTE } from '../gql/queries';
import { UPDATE_NOTE } from '../gql/mutations';
import { useEffect, useState } from 'react';

function EditNote() {
  const { id } = useParams();
  const { account } = useAuth();

  const [findNote] = useLazyQuery(GET_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);

  const [description, setDescription] = useState('Loading...');
  const [charColor, setCharColor] = useState('text-red-600');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    findNote({
      variables: {
        findNoteInput: {
          id,
        },
      },
    })
      .then((data) => {
        if (!data?.data) navigate('/'); // if user id doesn't match up with note id
        else setDescription(data?.data?.note?.description);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  }, []);

  const handleSubmit = () => {
    updateNote({
      variables: {
        updateNoteInput: {
          id,
          description,
        },
      },
    })
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  useEffect(() => {
    description?.length < 20 || description?.length > 300
      ? setCharColor('text-red-500')
      : setCharColor('text-gray-700');
  }, [description]);

  return (
    <div className='flex justify-center w-9/12 mx-auto'>
      <div className='w-full mx-auto p-5'>
        <div className='text-center mb-16 mt-4'>
          <h3 className='text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 font-poppins'>
            Edit <span className='text-indigo-600'>Note</span>
          </h3>
        </div>
        <div className='flex flex-wrap -mx-3 mb-4'>
          <div className='w-full px-3'>
            <div className='flex items-center justify-between w-full'>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                Note Description
              </label>
              <label
                className={`block uppercase tracking-wide ${charColor} text-xs font-bold mb-2`}
              >
                {description?.length}/300
              </label>
            </div>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={
                'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-[#fafafa]'
              }
              placeholder='This is a note for...'
            />
          </div>
        </div>
        <p className='text-red-500 text-center'>{error}</p>
        <div className='flex justify-end mt-8 w-full'>
          <button
            className='transition-colors shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded'
            onClick={handleSubmit}
          >
            Update Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
