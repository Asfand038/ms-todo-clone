import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from '../../axios-todos';

import StepsList from '../StepsList/StepsList';
import {
    Header,
    MyDay, 
    RemindMe,
    AddDueDate, 
    Repeat, 
    Category, 
    AddFile, 
    AddNote, 
    Footer
} from './SidebarComponents';

const Sidebar = styled.div`
    height: 100%;
    width: 360px;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    overflow-y: hidden;
    margin-top: 56px;
    background-color: #f5f5f5;
    border-left: 1px solid #d3d3d3;
}
`;

const SidebarBody = styled.div`
    overflow-y: auto;
    height: 86vh;

    & > div:first-child {
        border: 1px solid #d3d3d3;
        margin: 10px;
        background-color: white;
    }

    & > div:nth-of-type(3) {
        border: 1px solid #d3d3d3;
        margin: 10px;
        background-color: white;
    }
`;

const todoSidebar = (props) => {
    const [loadedTodo, setLoadedTodo] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            document.getElementById('main_page').style.width = 'calc(100% - 465px)';
        }, 250); 
        return () => {
            document.getElementById('main_page').style.width = '100%';
        }
    }, []);

    useEffect(() => {
        loadTodo();
    }, [props]);

    const loadTodo = () => {    
        axios.get(`/todos/${props.match.params.id}.json`)
            .then(response => {
                let newTodo = {...response.data, id: props.match.params.id}
                if(response.data.steps) {
                    if (!Array.isArray(response.data.steps)){
                        newTodo = {
                            ...newTodo,
                            steps : [
                                newTodo.steps[Object.keys(newTodo.steps)[0]]
                            ]
                        }
                    }
                }
                setLoadedTodo(newTodo);
            });
    };

    return (
        <React.Fragment>
            {loadedTodo &&
                <Sidebar>
                    <SidebarBody> 
                        <div>
                            <Header todo={loadedTodo} loadTodo={loadTodo}/>
                            <StepsList todo={loadedTodo} loadTodo={loadTodo}/>
                        </div>
                        <MyDay todo={loadedTodo} loadTodo={loadTodo}/>
                        <div>
                            <RemindMe />
                            <AddDueDate todo={loadedTodo}/> 
                            <Repeat />
                        </div>
                        <Category />
                        <AddFile />
                        <AddNote />
                    </SidebarBody>
                    <Footer 
                        todo={loadedTodo} 
                        path={props.history.location.pathname}
                        todoId={props.match.params.id}/>
                </Sidebar>
            } 
        </React.Fragment>
    );
}

export default withRouter(todoSidebar);