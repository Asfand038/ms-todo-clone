import React from 'react';

import { BsGrid3X3Gap } from 'react-icons/bs';
import { AiOutlineQuestion } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { VscMegaphone } from 'react-icons/vsc';

import classes from './Header.module.css';

const header = () => {
    return (
        <header className={classes.Header}>
            <div className={classes.MainTitle}>
                <span><BsGrid3X3Gap size={20} /></span>
                <span>To Do</span>
            </div>
            <div>Search</div>
            <div className={classes.IconContainer}>
                <span><IoSettingsOutline size={20}/></span>
                <span><AiOutlineQuestion size={20}/></span>
                <span><VscMegaphone size={20}/></span>
                <span>AJ</span>
            </div>
        </header>
    )
};

export default header;