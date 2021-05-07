import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import AddTodo from '../../../components/AddTodo/AddTodo';
import CompletedTasks from '../CompletedTasks/CompletedTasks';
import TodoItem from '../../../components/TodoItem/TodoItem';

import classes from './AllTasks.module.css';

const allTasks = props => {

  const addTodo = (title) => {
    props.onAddTask(title, 'ALL_TASKS');
  }

  let incompleteTasks = props.todos.filter(todo => todo[1].completed === false);
  let incompleteTodoList = null;
  if (incompleteTasks && incompleteTasks.length) {
    incompleteTodoList = incompleteTasks.map((todo) => (
        <TodoItem 
            key={todo[0]} 
            todo = {todo}  
        />
    ))
  };

  const completed = props.todos.filter(todo => todo[1].completed === true);
  let completedTodoList = null;
  if(completed && completed.length) {
    completedTodoList = <CompletedTasks 
      todos={completed} 
    />
  }
  
  return (
    <React.Fragment>
      <div className={classes.Title}>Tasks</div>
      <AddTodo addTodo={addTodo}/>
      <div className={classes.Content}>
        {incompleteTodoList}
        {completedTodoList}
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: (title, identifier) => dispatch(actions.addTaskRequest(title, identifier))
  }
}

export default connect(null, mapDispatchToProps)(allTasks);