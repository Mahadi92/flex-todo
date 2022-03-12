import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { HiX } from "react-icons/hi";

const GroupTodo = ({ todoGroups, setTodoGroups }) => {
    const [isAddGroup, setIsAddGroup] = useState(false);
    const [editGroupTodo, setEditGroupTodo] = useState(0);

    const handleGrpTodoSubmit = (e) => {
        e.preventDefault();
        const grpTitleValue = e.target.groupTodo.value

        setTodoGroups([...todoGroups, { id: (new Date()).getTime(), grpTitle: grpTitleValue, todoList: [] }]);

        e.target.reset();
    }

    const handleDeleteGroupTodo = (id) => {
        const restTodoGroups = todoGroups.filter(todo => todo.id !== id);
        setTodoGroups(restTodoGroups)
    }
    const handleEditGroupTodo = (e, id, list) => {
        e.preventDefault();
        const value = e.target.editGroupTodo.value;

        const foundTodoIndex = todoGroups.findIndex(todo => todo.id === id);
        todoGroups[foundTodoIndex] = { id: id, grpTitle: value, todoList: list };
        setEditGroupTodo(0)
        console.log(todoGroups)
    }

    return (
        <div className="grp_todo__container">

            {todoGroups.length > 0 &&
                todoGroups.map((todoGroup, grpI) => {
                    return (
                        <div key={grpI} className="grp_todo">
                            <button onClick={(e) => handleDeleteGroupTodo(todoGroup?.id)} className="grp_todo__delete_btn"><HiX /> </button>
                            {editGroupTodo === todoGroup.id ?

                                // Update Group todo title
                                <div className="grp_todo__form_container">
                                    <form onSubmit={(e) => handleEditGroupTodo(e, todoGroup?.id, todoGroup?.todoList)} className="grp_todo__form">
                                        <input type="text" name="editGroupTodo" className="grp_todo__form_input" placeholder="Update group name" defaultValue={todoGroup.grpTitle} required />
                                        <button type="submit" className="grp_todo__form_btn">Update</button>
                                        <button onClick={() => setEditGroupTodo(0)} className="grp_todo__form_btn">Cancel</button>
                                    </form>
                                </div>
                                :
                                <div onDoubleClick={(e) => setEditGroupTodo(todoGroup.id)} className="grp_todo__title_container">
                                    <span className="grp_todo__title">{todoGroup.grpTitle}</span>
                                    <span className="grp_todo__length">{todoGroup.todoList?.length}</span>
                                </div>

                            }
                            <button className="todo__add_btn">
                                <FiPlus size="20px" />
                            </button>
                        </div>
                    )
                })
            }

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