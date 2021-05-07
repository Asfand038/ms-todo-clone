import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { IoMdStarOutline, IoMdStar } from 'react-icons/io';

import * as actions from '../../store/actions/index';

import TodoSidebar from '../TodoSidebar/TodoSidebar';
import './TodoItem.css';

const StyledContainer = styled.div`
    background-color: white;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    width: 97%;
    display: flex;
    &:hover {
        background-color: #f4f4f4;
        cursor: pointer;
    }
`;

const StyledTodoItem = styled.div`
    flex: 10;
    margin-left: 14px;
`;

const CompletedIcon = styled.button`
    border: none;
    background-color: inherit;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`;

const FavouriteIcon = styled.button`
    float: right;
    border: none;
    background-color: inherit;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`;

const TodoItem = props => {

    const [id, details] = props.todo;
    const [hover, setHover] = useState(false);

    const markComplete = () => {
        props.onMarkComplete(id, details.completed);
      }
  
    const markImportant = () => {
        props.onMarkImportant(id, details.important);
    }

    const todoSelectedHandler = (id) => {
        props.history.push(`${props.match.url}/${id}`);
    }

    let icon = <BsCircle size={18} color='#0275d8'/>;
    if (details.completed) {
        icon = <AiFillCheckCircle size={20} color='#0275d8'/>;
    }
    if (!details.completed && hover) {
        icon = <AiOutlineCheckCircle size={20} color='#0275d8'/>;
    }

    return (
        <React.Fragment>
            <StyledContainer completed={details.completed}>
                <CompletedIcon 
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)} 
                    onClick={markComplete}>
                    {icon}
                </CompletedIcon>
                <StyledTodoItem onClick={() => todoSelectedHandler(id)}>{details.title}</StyledTodoItem>
                <FavouriteIcon onClick={markImportant}>
                    {details.important && <IoMdStar size={20} color='#0275d8' />}
                    {!details.important && <IoMdStarOutline size={20} color='#aaa'/>}    
                </FavouriteIcon>
            </StyledContainer>
            <Route 
                path={props.match.url + '/:id'} 
                component={TodoSidebar} /> 
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onMarkComplete: (id, currStatus) => dispatch(actions.markCompleteRequest(id, currStatus)),
        onMarkImportant: (id, currStatus) => dispatch(actions.markImportantRequest(id, currStatus))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(TodoItem));