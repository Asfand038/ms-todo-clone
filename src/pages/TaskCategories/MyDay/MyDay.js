import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import AddTodo from '../../../components/AddTodo/AddTodo';
import TodoItem from '../../../components/TodoItem/TodoItem';

import classes from './MyDay.module.css';

const myDay = props => {

    const addTodo = (title) => {
        props.onAddTask(title, 'MY_DAY');
    }

    const todayTasks = props.todos.filter(todo => todo[1].myDay[0] === true);
    let myDayList = null;
    if (todayTasks && todayTasks.length) {
        myDayList = todayTasks.map((todo) => (
            <TodoItem 
                key={todo[0]} 
                todo = {todo}  
            />
        ))
    }

    return (
        <React.Fragment>
            <div className={classes.Title}>My Day</div>
            <div className={classes.Date}>{moment().format('dddd, MMMM D')}</div>
            <AddTodo myDay addTodo={addTodo}/>
            <div className={classes.Content}>
                {myDayList}
            </div>
        </React.Fragment>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTask: (title, identifier) => dispatch(actions.addTaskRequest(title, identifier)) 
    };
}

export default connect(null, mapDispatchToProps)(myDay);