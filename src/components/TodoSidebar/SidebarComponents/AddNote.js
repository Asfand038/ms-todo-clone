import React from 'react';
import styled from 'styled-components';

const StyledAddNote = styled.textarea`
    display: block;
    margin: 10px 10px 20px;
    width: 322px;
    outline: none;
    border: 1px solid #d3d3d3;
    padding: 15px;
    box-sizing: border-box;

    &::-webkit-input-placeholder {
        font-style: italic;
    }

    &:hover {
        border: 1px solid #808080;
    }

    &:focus {
        border: 1px solid #3e69e4;
    }
`;

const addNote = props => (
    <StyledAddNote placeholder='Add Note' rows='3'/>
);

export default addNote;