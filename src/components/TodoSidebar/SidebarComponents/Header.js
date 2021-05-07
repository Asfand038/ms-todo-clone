import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

import * as actions from '../../../store/actions/index';

import EditTodo from '../../EditTodo/EditTodo';

const StyledHeader = styled.div` 
    display: flex;
    background-color: white; 
    margin-top: 10px;
    height: 6vh;
    margin: 10px;

    & button {
        border: none; 
        background-color: white;    
    }

    & button:hover {
        cursor: pointer;
    }

    & button:focus {
        outline: none;
    }
}
`;

const header = props => {

    const { todo, loadTodo } = props;

    const markComplete = () => {
        props.onMarkComplete(todo.id, todo.completed);
        loadTodo();
      }
  
    const markImportant = () => {
        props.onMarkImportant(todo.id, todo.important);
        loadTodo();
    }

    return (
        <StyledHeader>
            <button onClick={markComplete}>
                {todo.completed && <AiFillCheckCircle size={20} color='#0275d8'/>}
                {!todo.completed && <BsCircle size={17} color='#757575'/>}
            </button>
            <EditTodo todo={todo} />
            <button onClick={markImportant}>
                {todo.important && <IoMdStar size={20} color='#0275d8' />}
                {!todo.important && <IoMdStarOutline size={20} color='#757575'/>}
            </button>
        </StyledHeader>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onMarkComplete: (id, currStatus) => dispatch(actions.markCompleteRequest(id, currStatus)),
        onMarkImportant: (id, currStatus) => dispatch(actions.markImportantRequest(id, currStatus))
    }
}

export default connect(null, mapDispatchToProps)(header); 