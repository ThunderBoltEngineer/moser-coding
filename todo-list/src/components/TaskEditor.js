import { useState } from 'react';
import { connect } from 'react-redux';
import { ADD_TASK } from '../store/actions';

function TaskEditor({ addTask }) {
  const [note, setNote] = useState('');

  const onChange = (e) => {
    setNote(e.target.value);
  }

  const onAdd = (e) => {
    e.preventDefault();
    
    addTask(note);
    setNote('');
  }

  return (
    <form className='task-editor' onSubmit={onAdd}>
      <textarea
        value={note}
        placeholder='Add a note'
        onChange={onChange}
        required
      />
      <button type='submit'>Add</button>
    </form>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: note => dispatch({ type: ADD_TASK, payload: note }),
  };
};

export default connect(null, mapDispatchToProps)(TaskEditor);
