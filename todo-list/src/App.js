import TaskEditor from './components/TaskEditor';
import TaskList from './components/TaskList';
import './style.scss';

function App() {
  return (
    <div className='App'>
      <TaskEditor />
      <TaskList />
    </div>
  );
}

export default App;
