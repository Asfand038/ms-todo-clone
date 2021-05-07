import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';

const StyledContainer = styled.div`
    display: flex;
    margin-top: 10px;
    width: 97%;
    border-bottom: ${
        ({active, myDay}) => active 
            ?  myDay ? '1px solid #34373d' : '1px solid #3e69e4'
            : '1px solid #ccc'
    }    
`;
    
const ToggleButton = styled.button`
    cursor: pointer;
    background-color: inherit;
    border: none;
    &:focus {
        outline: none;
    }
`;

const StyledForm = styled.form`
    flex: 10;
    display: flex;
`;
    
const StyledInput = styled.input`
    border: none;
    font-size: 0.9rem;
    padding: 0 0 10px 16px;
    width: 100%;
    &:focus {
        outline: none;
    }
    ::-webkit-input-placeholder { 
        color: ${props => props.myDay ? '#a9a9a9' : '#3e69e4'}; 
    }
    &:focus::-webkit-input-placeholder {
        color: #a9a9a9;
`;

const StyledSubmit = styled.button`
    color: ${props => props.myDay ? '#34373d' : '#3e69e4'};
    font-size: small;
    font-weight: 500;
    border: none;
    background-color: inherit;
    &:focus {
        outline: none;
        background-color: inherit;
    }
`;

const AddTodo = props => {
    const [title, setTitle] = useState('');
    const [active, setActive] = useState(false);

    useEffect(() => {
        const onClickFunction =  () => {
            if (document.getElementById('inputNewTask') !== document.activeElement) {
                setActive(false);
                setTitle('');
            }
        }
        document.addEventListener('click', onClickFunction);
        return () => {
            document.removeEventListener('click', onClickFunction)
        }
    }, []);

    useEffect(() => {
        document.getElementById('inputNewTask').focus();
    }, [active]);

    const onSubmit = (event) => {
        event.preventDefault();
        if(title.trim().length) {
            props.addTodo(title);
            setTitle('');
        }
    };

    return (
        <StyledContainer active={active} myDay={props.myDay}>
            <ToggleButton onClick={() => setActive(prevState => !prevState)}>
                {!active && <AiOutlinePlus size={20} color={props.myDay ? 'darkgray' : '#6495ed'}/>}
                {active && <BsCircle size={20} color='#a9a9a9'/> }
            </ToggleButton>
            <StyledForm onSubmit={onSubmit} onClick={() => setActive(true)}>
                <StyledInput
                    id='inputNewTask'
                    type='text' 
                    placeholder={props.planned ? 'Add a task due today' : 'Add a task'} 
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                    myDay={props.myDay}
                />
                {title && <StyledSubmit myDay={props.myDay}>ADD</StyledSubmit>}
            </StyledForm>
        </StyledContainer>
    )
}

export default AddTodo;