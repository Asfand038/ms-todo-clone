import { v4 as uuidv4 } from 'uuid';

import * as actionTypes from './actionTypes';
import axios from '../../axios-todos';

export const setTasks = (todos) => {
    return {
        type: actionTypes.SET_TASKS,
        todos: Object.entries(todos)
    }
}

export const initTasks = () => {
    return dispatch => {
        axios.get( '/todos.json' )
            .then( response => {
                if (response.data) {
                    dispatch(setTasks(response.data));
                }
            })
    };
};

export const addTask = (id, title, creationDate, isImportant, isMyDay, myDayDate, dueDate) => {
    return {
        type: actionTypes.ADD_TASK,
        id: id,
        title: title,
        creationDate: creationDate,
        important: isImportant,
        myDay: isMyDay,
        myDayDate: myDayDate,
        dueDate: dueDate
    }
}

export const addTaskRequest = (title, identifier) => {
    let isImportant = false;
    if (identifier === 'IMPORTANT') {
        isImportant = true;     
    }
    let isMyDay = false;
    let myDayDate = null;
    if (identifier === 'MY_DAY') {
        isMyDay = true;
        myDayDate = new Date().getDate();
    }
    let dueDate = null;
    if (identifier === 'DUE_TODAY') {
        dueDate = new Date();
    }
    const creationDate = new Date();
    const task = {
        title: title,
        completed: false,
        important: isImportant,
        creationDate: creationDate,
        myDay: [isMyDay, myDayDate],
        dueDate: dueDate,
        steps: []
    }
    return dispatch => {
        axios.post('/todos.json', task)
            .then(res => {
                dispatch(addTask(res.data.name, title, creationDate, isImportant, isMyDay, myDayDate, dueDate));
        });  
    }
}

export const deleteTask = (id) => {
    return {
        type: actionTypes.DELETE_TASK,
        id: id
    }
}

export const deleteTaskRequest = (id) => {
    return dispatch => {
        axios.delete(`/todos/${id}.json`)
            .then(res => {
                dispatch(deleteTask(id));
            });
    }
}

export const markComplete = (id) => {
    return {
        type: actionTypes.COMPLETE_TASK,
        id: id
    }
}

export const markCompleteRequest = (id, currStatus) => {
    return dispatch => {
        axios.patch(`/todos/${id}.json`, {completed: !currStatus})
            .then(res => {
                dispatch(markComplete(id));
            });
    }
}

export const markImportant = (id) => {
    return {
        type: actionTypes.IMPORTANT_TASK,
        id: id
    }
}

export const markImportantRequest = (id, currStatus) => {
    return dispatch => {
        axios.patch(`/todos/${id}.json`, {important: !currStatus})
            .then(res => {
                dispatch(markImportant(id));
            });
    }
}

export const changeTitle = (id, title) => {
    return {
        type: actionTypes.CHANGE_TITLE,
        id: id,
        title: title
    }
}

export const changeTitleRequest = (id, title) => {
    return dispatch => {
        axios.patch(`/todos/${id}.json`, {title: title})
            .then(res => {
                dispatch(changeTitle(id, title));
            });
    }
}

export const markAsMyDay = (id, status, date) => {
    return {
        type: actionTypes.MY_DAY_TASK,
        id: id,
        status: !status,
        myDayDate: date
    }
}

export const markAsMyDayRequest = (id, currStatus) => {
    let myDayDate = null;
    if (!currStatus) {
        myDayDate = new Date().getDate();
    }
    return dispatch => {
        axios.patch(`/todos/${id}.json`, {myDay: [!currStatus, myDayDate]})
            .then(response => {
                dispatch(markAsMyDay(id, currStatus, myDayDate));
            });
    }
}

export const addStep = (id, steps, stepId, title) => {
    return {
        type: actionTypes.ADD_STEP,
        id: id,
        steps: steps,
        stepId: stepId,
        title: title
    }
}

export const addStepRequest = (id, title, steps) => {
    return dispatch => {
        let stepId = uuidv4();
        axios.patch(`/todos/${id}.json`, {steps: [...steps, [stepId, {title: title, completed: false}]]})
            .then(response => {
                dispatch(addStep(id, steps, stepId, title));
            });
    }
}

export const completeStep = (todoId, stepId) => {
    return {
        type: actionTypes.COMPLETE_STEP,
        todoId: todoId,
        stepId: stepId
    }
}

export const completeStepRequest = (todoId, stepId, stepIndex, currStatus) => {
    return dispatch => {
        axios.patch(`/todos/${todoId}/steps/${stepIndex}/1.json`, {completed: !currStatus})
            .then(response => {
                dispatch(completeStep(todoId, stepId));
            });
    }
}

export const deleteStep = (todoId, stepId) => {
    return {
        type: actionTypes.DELETE_STEP,
        todoId: todoId,
        stepId: stepId
    }
}

export const deleteStepRequest = (todoId, stepId, stepIndex) => {
    return dispatch => {
        axios.delete(`/todos/${todoId}/steps/${stepIndex}.json`)
            .then(response => {
                dispatch(deleteStep(todoId, stepId));
            })
    }
}