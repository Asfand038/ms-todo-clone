import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../../store/actions/index';



const StyledHeader = styled.div`
    font-weight: 600;
    font-size: small;
`;

const modal = props => {
    const history = useHistory();

    const handleOk = async () => {
        props.onDeleteTask(props.id);
        props.onHide();
        history.goBack();
    };
    
    const handleCancel = () => {
        props.onHide();
    };

    return (
        <Modal
            title={<StyledHeader>{props.todo && props.todo.title} will be permanently deleted.</StyledHeader>}
            width={350}
            bodyStyle={{height:'50px', padding: '3px 0 24px 24px'}}
            visible={props.visible}
            onOk={handleOk}
            okText='Delete task'
            onCancel={handleCancel}
            okButtonProps={{ danger: true}}
            closable={false}
            centered={true}
        >
            <p>You won't be able to undo this action.</p> 
        </Modal>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTask: (id) => dispatch(actions.deleteTaskRequest(id))
    };
};

export default connect(null, mapDispatchToProps)(modal); 