import React from 'react';
import { GoCalendar } from 'react-icons/go';

import classes from './Assigned.module.css';

const assigned = props => (
    <React.Fragment>
        <div className={classes.Title}>Assigned to you</div>
        <div className={classes.Container}>
            <span><GoCalendar size={300}/></span>
            <span>Tasks assigned to you show up here</span>
        </div>
    </React.Fragment>
);

export default assigned;