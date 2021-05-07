import React from 'react';

import AddSteps from './AddSteps/AddSteps';
import StepItem from './StepItem/StepItem';

const stepsList = props => {
  console.log(props.todo.steps);
    return (
      <div>
        {props.todo.steps && props.todo.steps.length &&
          props.todo.steps.map((step, index) => (
            step &&
            <StepItem 
              key={step[0]} 
              step={step} 
              todoId={props.todo.id} 
              stepIndex={index} 
              loadTodo={props.loadTodo}/>
        )
      )}
      <AddSteps 
          todo={props.todo}/>
  </div>);
};


export default stepsList;