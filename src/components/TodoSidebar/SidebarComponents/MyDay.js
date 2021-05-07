import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BiSun } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';

import * as actions from '../../../store/actions/index';

const StyledMyDay = styled.div`
    border: 1px solid #d3d3d3;
    margin: 10px;
    height: 8vh;
    background-color: white;
    display: flex;
    
    &:hover {
        background-color: #f5f5f5;
    }

    & div:first-child {
        padding: 16px 10px;
    }

    & div:nth-child(2) {
        flex: auto;
        margin: auto;
        color: ${props => props.myDay ? '#0275d8' : '#757575'};
        font-size: medium;
        cursor: context-menu;
    }

    & div:nth-child(2):hover {
        cursor: context-menu;
    }

    & button {
        background-color: inherit;
        border: none;
    }

    & button:hover {
        cursor: pointer;
    }

    & button:focus {
        outline: none;
    }
`;

const myDay = props => {
    
    const { todo, loadTodo } = props;

    const markAsMyDay = () => {
        if (!todo.myDay[0]) {
            props.onMarkAsMyDay(todo.id, todo.myDay[0]);
            loadTodo();
        }
    }

    const removeFromMyDay = () => {
        props.onMarkAsMyDay(todo.id, todo.myDay[0]);
        loadTodo();
    }
    
    return (
        <StyledMyDay onClick={markAsMyDay} myDay={todo.myDay[0]}>
            <div>
                <BiSun size={20} color={todo.myDay[0] ? '#0275d8' : '#757575'}/>
            </div>
            <div>
                {todo.myDay[0] ? 'Added to My Day' : 'Add to My Day'}
            </div>
            {todo.myDay[0] && <button onClick={removeFromMyDay}><IoIosClose size={20}/></button>}
    </StyledMyDay>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        onMarkAsMyDay: (id, currStatus) => dispatch(actions.markAsMyDayRequest(id, currStatus))
    }
}

export default connect(null, mapDispatchToProps)(myDay);