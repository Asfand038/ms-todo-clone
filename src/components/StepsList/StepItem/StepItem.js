import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';

import * as actions from '../../../store/actions/index';

const Container = styled.div`
    background-color: white;
    padding: 0 6px;
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    width: 97%;
    height: 7vh;
    margin: auto;
    display: flex;
    &:hover {
        background-color: #f4f4f4;
        cursor: pointer;
    }
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

const TodoStep = styled.div`
    flex: 10;
    display: flex;
    margin-left: 8px;
    border-bottom: 1px solid #ccc;
`;

const StepInput = styled.div`
    flex: 10;
    margin-top: 9px;
`;

const DeleteIcon = styled.button`
    float: right;
    border: none;
    background-color: inherit;
    &:hover {
        cursor: pointer;
        background-color: inherit;
    }
    &:focus {
        outline: none;
    }
`;

const stepItem = props => {
    const {step, stepIndex, todoId, loadTodo} = props;
    const [ stepId, details ] = step;
    const [hover, setHover] = useState(false);

    const completeStep = () => {
        props.onCompleteStep(todoId, stepId, stepIndex, details.completed);
        loadTodo();
    }

    const deleteStep = () => {
        props.onDeleteStep(todoId, stepId, stepIndex);
        loadTodo();
    }

    let icon = <BsCircle size={15} color='#0275d8'/>;
    if (details.completed) {
        icon = <AiFillCheckCircle size={15} color='#0275d8'/>;
    }
    if (!details.completed && hover) {
        icon = <AiOutlineCheckCircle size={15} color='#0275d8'/>;
    }

    return (
        <Container completed={details.completed}>
            <CompletedIcon 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)} 
                onClick={completeStep}
            >
                {icon}
            </CompletedIcon>
            <TodoStep>
                <StepInput>{details.title}</StepInput>
            <DeleteIcon onClick={deleteStep}>
                <IoIosClose size={20}/>
            </DeleteIcon>
            </TodoStep>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCompleteStep: (todoId, stepId, stepIndex, currStatus) => dispatch(
            actions.completeStepRequest(todoId, stepId, stepIndex, currStatus)
        ),
        onDeleteStep: (todoId, stepId, stepIndex) => dispatch(
            actions.deleteStepRequest(todoId, stepId, stepIndex)
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(stepItem);