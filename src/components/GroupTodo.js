import React, { useRef, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Todos from './Todos';

const GroupTodo = ({ todoGroups, setTodoGroups }) => {
    const [isAddGroup, setIsAddGroup] = useState(false);
    const [editGroupTodo, setEditGroupTodo] = useState(0);
    const [dragging, setDragging] = useState(false)


    // Drag and Drop Functions 
    const dragItem = useRef();
    const dragNode = useRef();

    // Drag start func
    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    // Drag end func
    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }

    // Drag enter func 
    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            setTodoGroups((oldList) => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].todoList.splice(params.todoI, 0, newList[currentItem.grpI].todoList.splice(currentItem.todoI, 1)[0]); //Main array element switching logic
                dragItem.current = params;
                return newList
            })
        }
    }

    // Dragging time bg styles func
    const dragStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grpI === params.grpI && currentItem.todoI === params.todoI) {
            return "current_todo__card todo__card"
        }
        return "todo__card"
    }


    // group todo CRUD functions 

    // Add Todo Groups
    const handleGrpTodoSubmit = (e) => {
        e.preventDefault();
        const grpTitleValue = e.target.groupTodo.value

        setTodoGroups((prev) => [...prev, { id: (new Date()).getTime(), grpTitle: grpTitleValue, todoList: [] }]);

        e.target.reset();
    }

    // Delete Todo group
    const handleDeleteGroupTodo = (id) => {
        const restTodoGroups = todoGroups.filter(todo => todo.id !== id);
        setTodoGroups(restTodoGroups)
    }

    // Edit Todo group
    const handleEditGroupTodo = (e, id, list) => {
        e.preventDefault();
        const value = e.target.editGroupTodo.value;

        const foundTodoIndex = todoGroups.findIndex(todo => todo.id === id);
        todoGroups[foundTodoIndex] = { id: id, grpTitle: value, todoList: list };
        setEditGroupTodo(0)
    }

    return (
        <div className="grp_todo__container">

            {todoGroups.length > 0 &&
                todoGroups.map((todoGroup, grpI) => {
                    return (
                        <div key={grpI}
                            className="grp_todo"
                            onDragEnter={dragging && !todoGroup.todoList.length ? (e) => handleDragEnter(e, { grpI, todoI: 0 }) : null}
                        >
                            {/* Group edit and delete buttons */}
                            <button onClick={() => handleDeleteGroupTodo(todoGroup?.id)} className="grp_todo__delete_btn"><HiX /> </button>
                            <button onClick={() => setEditGroupTodo(todoGroup.id)} className="grp_todo__edit_btn"><FiEdit /> </button>

                            {/*  Update Group todo title */}
                            {editGroupTodo === todoGroup.id ?
                                <div className="grp_todo__form_container">
                                    <form onSubmit={(e) => handleEditGroupTodo(e, todoGroup?.id, todoGroup?.todoList)} className="grp_todo__form">
                                        <input type="text" name="editGroupTodo" className="grp_todo__form_input" placeholder="Update group name" defaultValue={todoGroup.grpTitle} required />
                                        <button type="submit" className="grp_todo__form_btn">Update</button>
                                        <button onClick={() => setEditGroupTodo(0)} className="grp_todo__form_btn">Cancel</button>
                                    </form>
                                </div>
                                :
                                <div onDoubleClick={(e) => setEditGroupTodo(todoGroup.id)} className="grp_todo__title_container" title="Double click to edit group">
                                    <span className="grp_todo__title">{todoGroup.grpTitle}</span>
                                    {/* <span className="grp_todo__length">{todoGroup.todoList.length}</span> */}
                                </div>
                            }

                            {/* Todos */}
                            <Todos todoGroup={todoGroup} todoGroups={todoGroups} grpI={grpI} dragging={dragging} setDragging={setDragging} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} dragStyles={dragStyles} />

                        </div>
                    )
                })
            }

            {/* Add group todo  */}
            {
                !isAddGroup ?
                    <button onClick={() => setIsAddGroup(true)} className="grp_todo__add_btn">
                        <FiPlus size="20px" />
                        <span>Add Todo Group </span>
                    </button>
                    :
                    <div className="grp_add__form_container">
                        <button onClick={() => setIsAddGroup(false)} className="grp_todo__delete_btn"><HiX /> </button>
                        <form onSubmit={(e) => handleGrpTodoSubmit(e)} className="grp_add__form">
                            <input type="text" name="groupTodo" className="grp_add__form_input" placeholder="Enter group name" required />
                            <button type="submit" className="grp_add__form_btn">Add</button>
                        </form>
                    </div>
            }
        </div >
    );
};

export default GroupTodo;