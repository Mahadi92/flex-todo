import { useState } from 'react';
import GroupTodo from './components/GroupTodo';
import './styles/global.scss';
import './styles/style.scss';

const defaultData = [
  {
    id: 0,
    grpTitle: "Todo",
    todoList: [
      {
        id: 0,
        title: "Coding"
      },
      {
        id: 1,
        title: "Gaming"
      },
      {
        id: 2,
        title: "Jumping"
      },
      {
        id: 3,
        title: "Running"
      },
    ]
  },
  {
    id: 1,
    grpTitle: "In progress",
    todoList: [
      {
        id: 0,
        title: "Yoga"
      },
      {
        id: 1,
        title: "song"
      }
    ]
  },
  {
    id: 2,
    grpTitle: "done",
    todoList: [
      {
        id: 0,
        title: "sleep"
      }
    ]
  }
]

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
