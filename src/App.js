import { useState, useEffect } from 'react';
import { TaskRow } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';
import './App.css';

function App() {

  const [userName, setUserName] =  useState('Rober'); 
  const [taskItems, setTaskItems] = useState([
    {name: 'Task One', done: false },    
    {name: 'Task Two', done: false },    
    {name: 'Task Three', done: true },    
    {name: 'Task Four', done: false },    
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if(data != null){
      setTaskItems(JSON.parse(data))
    }else{
      setUserName('Rober Example')
      setTaskItems([
        {name: 'Task One Exmaple', done: false },    
        {name: 'Task Two Exmaple', done: false },    
        {name: 'Task Three Exmaple', done: true },    
        {name: 'Task Four Exmaple', done: false },    
      ]);
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks',JSON.stringify(taskItems));
  }, [taskItems])

  const createNewTask = TaskName => { 
    if(!taskItems.find(t => t.name === TaskName)){
      setTaskItems([...taskItems, {name: TaskName, done: false}])
    }
  }

  const toggleTask = task => setTaskItems(taskItems.map(t =>  (t.name === task.name ? {...t, done: !t.done } : t )))

  const taskTableRows = (doneValue) => {
   return taskItems
   .filter(task => task.done === doneValue)   
   .map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    )); 
  }

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Done</th>
          </tr>   
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table> 

      <div>
        <VisibilityControl 
          description="Completed Task"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>

      {
        showCompleted && (
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
