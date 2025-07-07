import { useState } from 'react';
import Button from '../../ui/Button';
import {updatename} from '../../../userSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
const dispatch = useDispatch()
const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    if(!username) return 

    dispatch(updatename(username))
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm sm:text-base'>👋 Welcome! Please start by telling us your name:</p>

      <input
      className='w-72 sm:w-80 input'
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button to='/menu'>Start Odreing</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
