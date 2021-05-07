import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import classes from './AddSteps.module.css';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsCircle } from 'react-icons/bs';

const AddSteps = props => {
    const [title, setTitle] = useState('');
    const [active, setActive] = useState(false);

    const inputRef = useRef(null);
    
    const onSubmit = (event) => {
        event.preventDefault();
        let steps = [];
        if (props.todo.steps) {
            steps = props.todo.steps
        }
        props.onAddStep(props.todo.id, title, steps);
        setTitle('');
    }

    useEffect(() => {
        const onClickFunction = () => {
            if (inputRef.current !== document.activeElement) {
                setActive(false);
                setTitle('');
            }
        }
        document.addEventListener('click', onClickFunction);
        return () => {
            document.addEventListener('click', onClickFunction);
        }
    }, []);
     
    let icon = <AiOutlinePlus size={16} color='#6495ed'/>;
    if (active) {
        icon = <BsCircle size={13} color='#a9a9a9'/>
        inputRef.current.focus();
    }

    return (
        <div className={classes.Container} onSubmit={onSubmit}>
            <button onClick={() => setActive(p => !p)}>
                {icon}
            </button> 
            <form onClick={() => setActive(true)}>
                <input 
                    ref={inputRef}
                    type='text' 
                    name='title'
                    placeholder={props.todo.steps ? 'Next step' : 'Add step'} 
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                    }}
                />
                {title && <button className={classes.Button}>ADD</button>}
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onAddStep: (id, title, steps) => dispatch(actions.addStepRequest(id, title, steps))
    };
};

export default connect(null, mapDispatchToProps)(AddSteps);