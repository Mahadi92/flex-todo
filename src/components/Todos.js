import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { HiX } from "react-icons/hi";



const Todos = ({ todoGroup, todoGroups, grpI, dragging, handleDragStart, handleDragEnter, dragStyles }) => {
    const [todos, setTodos] = useState(todoGroup.todoList)
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [isEditTodo, setIsEditTodo] = useState(false);

    const indexOfGroup = todoGroups.findIndex(group => group.id === todoGroup.id);

    // Add todo
    const handleAddTodo = (e) => {
        e.preventDefault();

        const todoTitleValue = e.target.groupTodo.value;

        setTodos((prev) => ([...prev, { id: (new Date()).getTime(), todoTitle: todoTitleValue }]));


        todoGroups[indexOfGroup].todoList.push({ id: (new Date()).getTime(), todoTitle: todoTitleValue })

        e.target.reset();
    }

    // Delete todo
    const handleDeleteTodo = (id) => {

        const restTodos = todoGroups[indexOfGroup].todoList.filter(todo => todo.id !== id);
        setTodos(restTodos);

        todoGroups[indexOfGroup].todoList.splice(0, todoGroups[indexOfGroup].todoList.length, ...restTodos)
    }

    // Edit todo
    const handleEditTodo = (e, id) => {
        e.preventDefault();
        const value = e.target.todo.value;
        const indexOfTodo = todoGroup.todoList.findIndex(todo => todo.id === id);

        todoGroups[indexOfGroup].todoList[indexOfTodo] = { id: id, todoTitle: value };
        setIsEditTodo(false);
    }

    return (
        <div>
            {todoGroup.todoList.length > 0 &&
                todoGroup.todoList?.map((todo, todoI) => {
                    return (
                        <div key={todoI}>
                            {!isEditTodo && todoI ?
                                <div
                                    className={dragging ? dragStyles({ grpI, todoI }) : "todo__card"}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, { grpI, todoI })}
                                    onDragEnter={(e) => dragging ? handleDragEnter(e, { grpI, todoI }) : null}
                                    onDoubleClick={() => setIsEditTodo(true)}
                                >
                                    <p>{todo.todoTitle}</p>
                                    <button className="todo__action_btn" onClick={(e) => handleDeleteTodo(todo.id)}>
                                        <AiOutlineDelete />
                                    </button>
                                    <button className="todo__action_btn" onClick={() => setIsEditTodo(true)}>
                                        <FiEdit />
                                    </button>
                                </div>
                                :
                                <div className="todo_add__form_container">
                                    <form onSubmit={(e) => handleEditTodo(e, todo.id)} className="todo_add__form">
                                        <input type="text" defaultValue={todo.todoTitle} name="todo" className="todo_add__form_input" placeholder="Todo " required />
                                        <button type="submit" className="grp_todo__form_btn">Update</button>
                                    </form>
                                    <button onClick={() => setIsEditTodo(false)} className="grp_todo__form_btn">Cancel</button>
                                </div>
                            }
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
                        <form onSubmit={(e) => handleAddTodo(e)} className="todo_add__form">
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