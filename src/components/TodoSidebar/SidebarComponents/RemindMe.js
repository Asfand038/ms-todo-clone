import React from 'react';
import styled from 'styled-components';

import { VscBell } from 'react-icons/vsc';

const Reminder = styled.div`
    display: flex;
    height: 8vh;
    &:hover {
        background-color: #f5f5f5;
    }

    & div:first-child {
        padding: 16px 10px;
    }

    & div:last-child {
        flex: 10;
        margin: 13px 0 0 2px;
        color: #808080;
        font-size: medium;
        cursor: context-menu;
        border-bottom: 1px solid #d3d3d3;
    }
`;

const remindMe = props => (
    <Reminder>
        <div><VscBell size={20} color='#757575'/></div>
        <div>Remind Me</div>
    </Reminder>
)

export default remindMe;