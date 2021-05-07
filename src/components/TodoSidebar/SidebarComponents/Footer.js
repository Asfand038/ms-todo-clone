import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowFromLeft } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import Modal from '../../UI/Modal/Modal';

const StyledFooter = styled.div`
    display: flex;
    position: fixed; 
    background-color: #f5f5f5; 
    justify-content: space-between; 
    margin-top: 10px;
    bottom: 0;
    width: inherit;
    height: 38px;
    border-top: 1px solid #d3d3d3;

    & span {
        font-size: small;
        color: #808080;
        margin: auto;
        cursor: context-menu;
    }

    & button {
        border: none; 
        background-color: inherit;
    }

    & button:first-child {
        margin: 5px 0 8px 3px;
    }

    & button:last-child {
        margin: 5px 3px 8px 0;
    }

    & button:hover {
        cursor: pointer;
        background-color: white;
    }

    & button:focus {
        outline: none;
    }
`;

const footer = props => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const history = useHistory();

    const { todo, path, todoId } = props;

    const closeTodoSidebar = () => {
        const pathname = path.split('/');
        pathname.pop();
        history.push(pathname.join('/'));
    }

    const showDeleteModalHandler = () => {
        setShowDeleteModal(prevState => !prevState);
    }

    let creationDate = null;
    if (todo) {
        const fetchedDate = new Date(todo.creationDate);
        if (new Date().getDate() === fetchedDate.getDate()) {
            creationDate = 'Created Today';
        } else {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const day = days[fetchedDate.getDay()];
            const date = fetchedDate.getDate();
            const month = fetchedDate.toLocaleString('default', { month: 'long' });
            creationDate = `Created on ${day}, ${month} ${date}`;
        };
    }

    return(
        <React.Fragment>
            <Modal 
                todo={todo}
                id={todoId}
                visible={showDeleteModal}
                onHide={() => showDeleteModalHandler()}
            />
            <StyledFooter>
                <button onClick={closeTodoSidebar}><BiArrowFromLeft color='#757575'/></button>
                <span>{creationDate}</span>
                <button onClick={showDeleteModalHandler}><RiDeleteBin6Line color='#757575'/></button>
            </StyledFooter>
        </React.Fragment>
    );
}

export default footer;