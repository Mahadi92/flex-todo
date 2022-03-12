import React, { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { HiX } from "react-icons/hi";

const GroupTodo = ({ todoGroups, setTodoGroups }) => {
    const [isAddGroup, setIsAddGroup] = useState(false);

    const handleGrpTodoSubmit = (e) => {
        e.preventDefault();
        const grpTitleValue = e.target.groupTodo.value

        setTodoGroups([...todoGroups, { id: (new Date()).getTime(), grpTitle: grpTitleValue, todoList: [] }]);


        e.target.reset();
    }

    return (
        <div className="grp_todo__container">

            {todoGroups.length > 0 &&
                todoGroups.map((todoGroup, grpI) => {
                    return (
                        <div key={grpI} className="grp_todo">
                            <div className="grp_todo__title_container">
                                <span className="grp_todo__title">{todoGroup.grpTitle}</span>
                                <span className="grp_todo__length">{todoGroup.todoList?.length}</span>
                            </div>
                            <button className="todo__add_btn">
                                <FiPlus size="20px" />
                            </button>
                        </div>
                    )
                })
            }

            {!isAddGroup ?
                <button onClick={() => setIsAddGroup(true)} className="grp_todo__add_btn">
                    <FiPlus size="20px" />
                    <span>Add Todo Group </span>
                </button>
                :
                <div className="grp_todo__form_container">
                    <button onClick={() => setIsAddGroup(false)} className="grp_todo__delete_btn"><HiX /> </button>
                    <form onSubmit={(e) => handleGrpTodoSubmit(e)} className="grp_todo__form">

                        <input type="text" name="groupTodo" className="grp_todo__form_input" placeholder="Enter group name" required />
                        <button type="submit" className="grp_todo__form_btn">Add</button>
                    </form>
                </div>
            }
        </div>
    );
};

export default GroupTodo;