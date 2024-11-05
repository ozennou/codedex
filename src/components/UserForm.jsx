import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const [formStyle, setFormStyle] = useState({
    backgroundColor: 'lightcoral',
  })
  const { setName } = useContext(UserContext);

  function handleChange(e) {
    if (e.target.value.trim().length < 3) {
      setFormStyle({
          backgroundColor: 'lightcoral',
      })
    } else {
      setFormStyle({
        backgroundColor: 'white',
      })
    }

    setInputName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    setInputName('')
    window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);  // Dispatch a navigation event
  }

  return (
    <div>
        <form onSubmit={handleSubmit} style={formStyle}>
            <label htmlFor='name'>Enter your name: </label>
            <input type='text' id='name' value={inputName} onChange={handleChange}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  );
}