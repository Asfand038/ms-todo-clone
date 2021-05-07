import React from 'react';
import styled from 'styled-components';

import { IoRepeat } from 'react-icons/io5';

const RepeatDiv = styled.div`
    height: 8vh;
    display: flex;
    
    &:hover{
        background-color: #f5f5f5;
    }

    & div:first-child {
        padding: 16px 10px;
    }

    & div:last-child {
        flex: 10;
        margin: 13px 0 16px 2px;
        color: #808080;
        font-size: medium;
        cursor: context-menu;
    }
`;

const repeat = props => (
    <RepeatDiv>
        <div><IoRepeat size={20} color='#757575'/></div>
        <div>Repeat</div>
    </RepeatDiv>
);

export default repeat;