import { useState } from 'react';
import GroupTodo from './components/GroupTodo';
import './styles/global.scss';
import './styles/style.scss';


function App() {
  const [todoGroups, setTodoGroups] = useState([]);

  return (
    <main>
      <header className="wrapper">
        <div className="container">
          <GroupTodo todoGroups={todoGroups} setTodoGroups={setTodoGroups} />
        </div>
      </header>

    </main>
  );
}

export default App;
