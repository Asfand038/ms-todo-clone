import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import TodoItem from '../../../components/TodoItem/TodoItem';

import { Collapse } from 'antd';
const { Panel } = Collapse;

const StyledHeader = styled.div`
    font-weight: 600;
    font-size: large;
`;


const completedTasks = props => {

    const todoSelectedHandler = (id) => {
        props.history.push('/tasks/' + id);
    }

    const completedTasks = props.todos.filter(todo => todo[1].completed === true);
    const completed = completedTasks.map(todo => (
        <TodoItem 
            key={todo[0]} 
            todo = {todo}  
            clicked={todoSelectedHandler}
        />
        ));

    return (
        <Collapse accordion bordered={false} style={{width: '97%', backgroundColor: 'inherit'}}>
            <Panel header={<StyledHeader>Completed</StyledHeader>}>
                {completed}
            </Panel>
        </Collapse>
    );
}

export default withRouter(completedTasks);