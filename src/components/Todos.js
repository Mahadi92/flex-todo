import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { HiX } from "react-icons/hi";



const Todos = ({ todoGroup, todoGroups, setTodoGroups }) => {
    const [isAddTodo, setIsAddTodo] = useState(false)

    const handleTodoSubmit = (e) => {
        e.preventDefault();
        const todoTitleValue = e.target.groupTodo.value

        var indexOfGroup = todoGroups.findIndex(group => group.id === todoGroup.id);

        console.log(indexOfGroup)

        setTodoGroups([...todoGroups, todoGroups[indexOfGroup].todoList.push({ id: (new Date()).getTime(), todoTitle: todoTitleValue })]);

        e.target.reset();
    }


    return (
        <div>
            {
                todoGroup.todoList.map(todo => {
                    return (
                        <div className="todo__card">
                            <p>{todo}</p>
                            <button className="todo__action_btn">
                                <AiOutlineDelete />
                            </button>
                            <button className="todo__action_btn">
                                <FiEdit />
                            </button>
                        </div>
                    )
                })
            }

            {
                !isAddTodo ?
                    <button className="todo__add_btn" onClick={() => setIsAddTodo(true)}>
                        <FiPlus size="20px" />
                    </button>
                    :
                    <div className="todo_add__form_container">
                        <form onSubmit={(e) => handleTodoSubmit(e)} className="todo_add__form">
                            <input type="text" name="groupTodo" className="todo_add__form_input" placeholder="Todo " required />
                            <button type="submit" className="todo_add__form_btn">Add</button>
                        </form>
                        <button onClick={() => setIsAddTodo(false)} className="todo__delete_btn"><HiX /> </button>
                    </div>
            }
        </div>
    );
};

export default Todos;