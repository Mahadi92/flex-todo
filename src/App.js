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
        todoTitle: "Coding"
      },
      {
        id: 1,
        todoTitle: "Gaming"
      },
      {
        id: 2,
        todoTitle: "Jumping"
      },
      {
        id: 3,
        todoTitle: "Running"
      },
    ]
  },
  {
    id: 1,
    grpTitle: "In progress",
    todoList: [
      {
        id: 0,
        todoTitle: "Yoga"
      },
      {
        id: 1,
        todoTitle: "song"
      }
    ]
  },
  {
    id: 2,
    grpTitle: "done",
    todoList: [
      {
        id: 0,
        todoTitle: "sleep"
      }
    ]
  }
]

function App() {
  const [todoGroups, setTodoGroups] = useState(defaultData);

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
