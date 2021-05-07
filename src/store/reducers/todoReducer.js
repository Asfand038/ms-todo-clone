import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TASKS:
            return {
                todos : action.todos
            };
        case actionTypes.ADD_TASK:
            return {
                todos: [...state.todos, [
                    action.id, {
                        title: action.title,
                        completed: false,
                        important: action.important,
                        myDay: [action.myDay, action.myDayDate],
                        creationDate: action.creationDate,
                        dueDate: action.dueDate,
                        steps: []
                    }
                ]]
            };
        case actionTypes.DELETE_TASK:
            return {
                todos: state.todos.filter(todo => todo[0] !== action.id)
            };
        case actionTypes.COMPLETE_TASK:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.id) {
                        todo[1].completed = !todo[1].completed;
                    }
                    return todo;
                })
            };
        case actionTypes.IMPORTANT_TASK:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.id) {
                        todo[1].important = !todo[1].important;
                    }
                    return todo;
                })
            };
        case actionTypes.CHANGE_TITLE:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.id) {
                        todo[1].title = action.title
                    }
                    return todo;
                })
            }
        case actionTypes.MY_DAY_TASK:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.id) {
                        todo[1].myDay = [action.status, action.myDayDate] 
                    }
                    return todo;
                })
            };
        case actionTypes.ADD_STEP:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.id) {
                        todo[1].steps = [...action.steps, [action.stepId, {title: action.title, completed: false}]]
                    }
                    return todo;
                })
            };
        case actionTypes.COMPLETE_STEP:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.todoId) {
                        todo[1].steps.map(step => {
                            if(step) {
                                if(step[0] === action.stepId) {
                                    step[1].completed = !step[1].completed
                                }
                            }
                            return step;
                        })
                    }
                    return todo;
                })
            };
        case actionTypes.DELETE_STEP:
            return {
                todos: state.todos.map(todo => {
                    if(todo[0] === action.todoId) {
                        const filteredStepsArray = todo[1].steps.filter(step => step !== null);
                        const newSteps = filteredStepsArray.filter(step => step[0] !== action.stepId);
                        todo[1].steps = newSteps;
                    }
                    return todo;    
                })
            };
        default:
            return state;
    }
};

export default reducer;