import React from 'react';
import styled from 'styled-components';
import { TiLocationArrowOutline } from 'react-icons/ti'

const CategoryDiv = styled.div`
    border: 1px solid #d3d3d3;
    margin: 10px;
    background-color: white;
    height: 8vh;
    display: flex;

    &:hover {
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

const category = props => (
    <CategoryDiv>
        <div><TiLocationArrowOutline size={20} color='#757575'/></div>
        <div>Pick a category</div>
    </CategoryDiv>
);

export default category;