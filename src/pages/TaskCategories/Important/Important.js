import React from 'react';
import { connect } from 'react-redux';

import classes from './Important.module.css';

import * as actions from '../../../store/actions/index';

import AddTodo from '../../../components/AddTodo/AddTodo';
import TodoItem from '../../../components/TodoItem/TodoItem';

const important = props => {

    const addTodo = (title) => {
        props.onAddTask(title, 'IMPORTANT');
    }

    const importantTasks = props.todos.filter(todo => todo[1].important === true);
    let importantTodoList = null;
    if (importantTasks && importantTasks.length) {
        importantTodoList = importantTasks.map((todo) => (
            <TodoItem 
                key={todo[0]} 
                todo = {todo}  
            />
        ))
    }

    return (
        <React.Fragment>
            <div className={classes.Title}>Important</div>
            <AddTodo addTodo={addTodo}/>
            <div className={classes.Content}>
                {importantTodoList}
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => {
    return {
      onAddTask: (title, identifier) => dispatch(actions.addTaskRequest(title, identifier))
    }
}

export default connect(null, mapDispatchToProps)(important);