//basic imports
import React, { useReducer, useEffect } from 'react';
//initial state
const todoList = window.localStorage.todos ? JSON.parse(window.localStorage.todos) : [];
const todoItem = '';
const initialState = { todoItem, todoList };
//actions
const ADD_TASK = 'addTask';
const ON_INPUT_CHANGE = 'onInputChange';
const CLEAR_ALL_TASKS = 'clearAllTasks';
const TOGGLE_COMPLETED_STATUS = 'toggleCompletedStatus';
const CLEAR_COMPLETED_TASKS = 'clearCompletedTasks';
//reducer
function reducer(state, action) {
    switch (action.type) {
        case ON_INPUT_CHANGE: {
            return { ...state, todoItem: action.payload };
        }
        case ADD_TASK: {
            const taskToAdd = {
                id: Date.now(),
                item: state.todoItem,
                completed: false,
            }
            return {
                todoItem: '',
                todoList: [...state.todoList, taskToAdd]
            }
        }
        case CLEAR_ALL_TASKS: {
            return { todoItem: '', todoList: [] };
        }
        case TOGGLE_COMPLETED_STATUS: {
            // debugger
            return {
                todoItem: '',
                todoList: state.todoList.map(todo => {
                    if (todo.id !== action.payload)
                        return todo;
                    return {
                        id: todo.id,
                        item: todo.item,
                        completed: !todo.completed,
                    }
                }),
            };
        }
        case CLEAR_COMPLETED_TASKS: {
            return {
                todoItem: '',
                todoList: state.todoList.filter(todo => todo.completed === false),
            }
        }
        default:
            return state;
    }
};
const Todos = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onInputChange = event => {
        dispatch({
            type: ON_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const addTask = event => {
        event.preventDefault();
        dispatch({ type: ADD_TASK });
    };
    const clearAllTasks = event => {
        dispatch({ type: CLEAR_ALL_TASKS });
    };
    const toggleComplete = id => () => {
        dispatch({
            type: TOGGLE_COMPLETED_STATUS,
            payload: id,
        })
    };
    const clearCompleted = () => {
        dispatch({ type: CLEAR_COMPLETED_TASKS });
    }
    useEffect(() => {
        window.localStorage.setItem('todos', JSON.stringify(state.todoList));
    }, [state.todoList]);
    //actual render
    return (
        <div>
            <h3>Tasks</h3>
            {
                state.todoList.length
                    ? state.todoList.map((todo) => 
                        <div key={todo.id}>
                            <span style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.item}</span>
                            <button onClick={toggleComplete(todo.id)} style={{display: todo.completed ? 'none' : 'inline'}}>Mark Done</button>
                            <button onClick={toggleComplete(todo.id)} style={{display: todo.completed ? 'inline' : 'none'}}>Mark Undone</button>
                        </div>)
                    :<div>No Task</div>
            }
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
        </div>
    )
};
export default Todos;