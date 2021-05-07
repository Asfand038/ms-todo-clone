import React from 'react';
import styled from 'styled-components';
import { MdAttachFile } from 'react-icons/md';

const StyledAddFile = styled.div`
    border: 1px solid #d3d3d3;
    margin: 10px;
    background-color: white;
    height: 8vh;
    display: flex;

    &:hover {
        background-color: #f5f5f5;
        cursor: pointer; 
    }

    & div:first-child {
        padding: 16px 10px;
        cursor: inherit;
    }

    & div:last-child {
        flex: 10;
        margin: 13px 0 16px 2px;
        color: #808080;
        font-size: medium;
        cursor: context-menu;
        cursor: inherit;
    }
`;

const addFile = props => (
    <StyledAddFile>
        <div><MdAttachFile size={20} color='#757575'/></div>
        <div>Add file</div>
    </StyledAddFile>
);

export default addFile;