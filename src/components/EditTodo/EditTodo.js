import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios from '../../axios-todos';

import * as actions from '../../store/actions/index';

const StyledForm = styled.form`
    flex: auto;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const StyledInput = styled.input`
    border: none;
    width: -webkit-fill-available;
    font-weight: 500;
    color: #1b1b1b;
    text-decoration: ${({completed}) => completed ? 'line-through' : 'none'};
    margin-top: 2px;
    padding: 2px 0 10px 10px;
    background-color: inherit;
`;

const EditTodo = props => {

    const { id, title, completed } = props.todo

    const [newTitle, setNewTitle] = useState(title);
    const inputRef = useRef(null);

    useEffect(() => {
        setNewTitle(title);
    }, [title]);

    
    const fetchTitle = () => {
        axios.get(`/todos/${id}.json`)
            .then(res => {
                setNewTitle(res.data.title);
            });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        newTitle.length ? props.onEditTask(id, newTitle) : fetchTitle(); 
        inputRef.current.blur();
    };

    const onBlur = () => {
        newTitle.length ? props.onEditTask(id, newTitle) : fetchTitle();
    }

    return (
        <StyledForm onSubmit={onSubmit}>
            <StyledInput 
                ref={inputRef}
                type='text' 
                value={newTitle} 
                onChange={(event) => setNewTitle(event.target.value)}
                onBlur={onBlur}
                completed={completed}
            />
        </StyledForm>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onEditTask: (id, newTitle) => dispatch(actions.changeTitleRequest(id, newTitle))
    }
}

export default connect(null, mapDispatchToProps)(EditTodo);