//basic imports
import React, { useReducer, useEffect } from 'react';
import * as TDR from '../reducers/todoReducer';
import moment from 'moment';
const Todos = () => {
    console.log(moment().format('MMMM Do YYYY') < 'October 5th 2018');
    const [state, dispatch] = useReducer(TDR.reducer, TDR.initialState);
    const onInputChange = event => {
        dispatch({
            type: TDR.ON_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const addTask = event => {
        event.preventDefault();
        dispatch({ type: TDR.ADD_TASK });
    };
    const clearAllTasks = event => {
        dispatch({ type: TDR.CLEAR_ALL_TASKS });
    };
    const toggleComplete = id => () => {
        dispatch({
            type: TDR.TOGGLE_COMPLETED_STATUS,
            payload: id,
        })
    };
    const clearCompleted = () => {
        dispatch({ type: TDR.CLEAR_COMPLETED_TASKS });
    }
    useEffect(() => {
        window.localStorage.setItem('todos', JSON.stringify(state.todoList));
    }, [state.todoList]);
    //actual render
    return (
        <div>
            <h1>ToDo List</h1>
            <form>
                <input
                    type='text'
                    placeholder='Enter Task'
                    value={state.todoItem}
                    onChange={onInputChange}
                    name='task'
                />
                <button disabled={state.todoItem ? false : true} onClick={addTask}>Add Task</button>
            </form>
            <button onClick={clearAllTasks}>Clear All Tasks</button>
            <button onClick={clearCompleted}>Clear Completed Tasks</button>
            <h3>Tasks</h3>
            {
                state.todoList.length
                    ? state.todoList.map((todo) => 
                        <div key={todo.id}>
                            <span
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                Item: {todo.item}
                            </span>
                            <br />
                            <span
                                style={{ display: todo.completed ? 'inline' : 'none' }}>
                                Completed on: {moment().format('MMMM Do YYYY, h:mm:ss a')}
                            </span>
                            <br />
                            <button onClick={toggleComplete(todo.id)} style={{display: todo.completed ? 'none' : 'inline'}}>Mark Done</button>
                            <button onClick={toggleComplete(todo.id)} style={{display: todo.completed ? 'inline' : 'none'}}>Mark Undone</button>
                        </div>)
                    :<div>No Task</div>
            }            
        </div>
    )
};
export default Todos;