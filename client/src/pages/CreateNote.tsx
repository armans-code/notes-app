import { useMutation } from '@apollo/client';
import { CREATE_NOTE } from '../gql/mutations';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const { account } = useAuth();
  const [newNote] = useMutation(CREATE_NOTE);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [charColor, setCharColor] = useState('text-red-600');
  const navigate = useNavigate();

  useEffect(() => {
    description.length < 20 || description.length > 300
      ? setCharColor('text-red-500')
      : setCharColor('text-gray-700');
  }, [description]);

  const handleSubmit = () => {
    if (description.length >= 20 && description.length <= 300)
      newNote({
        variables: {
          createNoteInput: {
            userId: account?.id,
            description,
          },
        },
      })
        .then((data) => {
          console.log(data.data?.createNote);
          navigate('/');
        })
        .catch((e) => {
          console.log(e.message);
          setError(e.message);
        });
    else setError('Note length must be within the 20-300 character range');
  };

  return (
    <div className='flex justify-center mx-auto'>
      <div className='w-full mx-auto p-5'>
        <div className='text-center mb-16 mt-4'>
          <h3 className='text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900 font-poppins'>
            Create a new <span className='text-indigo-600'>Note</span>
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
                {description.length}/300
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
            className='w-full md:w-fit transition-colors shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded'
            onClick={handleSubmit}
          >
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
