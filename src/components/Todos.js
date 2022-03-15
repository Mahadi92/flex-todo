import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";
import { VscLock } from "react-icons/vsc";
import { VscUnlock } from "react-icons/vsc";
import { HiLockClosed } from 'react-icons/hi';
// import { MdDragIndicator } from 'react-icons/hi';



const Todos = ({ todoGroup, todoGroups, grpI, dragging, handleDragStart, handleDragEnter, dragStyles }) => {
    const [todos, setTodos] = useState(todoGroup.todoList)
    console.log("todos >>>", todos);
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [editTodo, setEditTodo] = useState(0);
    const [isDraggable, setIsDraggable] = useState([])

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
        setEditTodo(0);
    }

    return (
        <div>
            {todoGroup.todoList.length > 0 &&
                todoGroup.todoList?.map((todo, todoI) => {
                    return (
                        <div key={todoI}>
                            {todo.id !== editTodo ?
                                <div
                                    className={dragging ? dragStyles({ grpI, todoI }) : "todo__card"}
                                    draggable={isDraggable.includes(todo.id) ? false : true}
                                    onDragStart={(e) => (isDraggable.includes(todo.id) ? null : handleDragStart(e, { grpI, todoI }))}
                                    onDragEnter={(e) => dragging ? handleDragEnter(e, { grpI, todoI }) : null}
                                    onDoubleClick={() => setEditTodo(todo.id)}
                                >
                                    {isDraggable.includes(todo.id) &&
                                        <span className="todo__lock_indicator">
                                            <HiLockClosed size="12px" />
                                        </span>
                                    }

                                    {/*<<<<< Lock and Unlock Button >>>>>>>>> */}
                                    {isDraggable.includes(todo.id) ?
                                        <button className="todo__lock_btn" onClick={() => setIsDraggable((prev) => (prev.filter(id => id !== todo.id)))}>
                                            <VscLock />
                                        </button>
                                        :
                                        <button className="todo__lock_btn" onClick={() => setIsDraggable((prev) => ([...prev, todo.id]))}>
                                            <VscUnlock />
                                        </button>

                                    }

                                    <p>{todo.todoTitle}</p>

                                    {/*<<<<< Delete and Edit single todo Button >>>>>>>>> */}
                                    <button className="todo__action_btn" onClick={(e) => handleDeleteTodo(todo.id)}>
                                        <AiOutlineDelete />
                                    </button>
                                    <button className="todo__action_btn" onClick={() => setEditTodo(todo.id)}>
                                        <FiEdit />
                                    </button>
                                </div>
                                :
                                <div className="todo_add__form_container">
                                    <form onSubmit={(e) => handleEditTodo(e, todo.id)} className="todo_add__form">
                                        <input type="text" defaultValue={todo.todoTitle} name="todo" className="todo_add__form_input" placeholder="Update title" required />
                                        <button type="submit" className="todo__edit_form_btn">Update</button>
                                    </form>
                                    <button onClick={() => setEditTodo(0)} className="todo__edit_form_del_btn"><ImCancelCircle /></button>
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
                            <input type="text" name="groupTodo" className="todo_add__form_input" placeholder="Enter title" required />
                            <button type="submit" className="todo_add__form_btn">Add</button>
                        </form>
                        <button onClick={() => setIsAddTodo(false)} className="todo__delete_btn"><HiX /> </button>
                    </div>
            }
        </div>
    );
};

export default Todos;