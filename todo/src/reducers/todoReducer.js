//initial state
const todoList = window.localStorage.todos ? JSON.parse(window.localStorage.todos) : [];
const todoItem = '';
export const initialState = { todoItem, todoList };
//actions
export const ADD_TASK = 'addTask';
export const ON_INPUT_CHANGE = 'onInputChange';
export const CLEAR_ALL_TASKS = 'clearAllTasks';
export const TOGGLE_COMPLETED_STATUS = 'toggleCompletedStatus';
export const CLEAR_COMPLETED_TASKS = 'clearCompletedTasks';
//reducer
export function reducer(state, action) {
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