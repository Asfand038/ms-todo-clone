import React from 'react';
import { connect } from 'react-redux';

import classes from './Planned.module.css';

import * as actions from '../../../store/actions/index';

import AddTodo from '../../../components/AddTodo/AddTodo';
import TodoItem from '../../../components/TodoItem/TodoItem';

const planned = props => {

    const addTodo = (title) => {
        props.onAddTask(title, 'DUE_TODAY');
    }

    const plannedTasks = props.todos.filter(todo => todo[1].dueDate);
    let plannedTodoList = null;
    if (plannedTasks && plannedTasks.length) {
        plannedTodoList = plannedTasks.map((todo) => (
            <TodoItem 
                key={todo[0]} 
                todo = {todo}  
            />
        ))
    }

    return (
        <React.Fragment>
            <div className={classes.Title}>Planned</div>
            <AddTodo addTodo={addTodo} planned/>
            <div className={classes.Content}>
                {plannedTodoList}
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => {
    return {
      onAddTask: (title, identifier) => dispatch(actions.addTaskRequest(title, identifier))
    }
}

export default connect(null, mapDispatchToProps)(planned);