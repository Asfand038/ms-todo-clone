import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import * as actions from '../store/actions/index';

import AllTasks from './TaskCategories/AllTasks/AllTasks';
import Assigned from './TaskCategories/Assigned/Assigned';
import Important from './TaskCategories/Important/Important';
import MyDay from './TaskCategories/MyDay/MyDay';
import Planned from './TaskCategories/Planned/Planned';

const tasks = props => {

  useEffect(() => {
    props.onInitTasks();
  }, []);

  return (
      <div>
          <Switch>
              <Route path='/tasks/myday' render={() => (
                <MyDay todos={props.todos} />)
              }/>  
              <Route path='/tasks/important' render={() => (
                  <Important todos={props.todos}/>)
              }/>
              <Route path='/tasks/planned' render={() => (
                  <Planned todos={props.todos}/>)
              }/>  
              <Route path='/tasks/assigned_to_me' component={Assigned}/>
              <Route path='/tasks' render={() => (
                  <AllTasks todos={props.todos}/>)
              }/>
              <Redirect from="/" to="/tasks"/> 
          </Switch>
      </div>
  );
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitTasks: () => dispatch(actions.initTasks())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(tasks);