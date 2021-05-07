import React from 'react';

import classes from './App.module.css';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Tasks from './pages/Tasks';

const app = props => {
  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.Container}>
        <Sidebar className={classes.Sidenav}/>
        <div id='main_page' className={classes.Content}>
          <Tasks />
        </div>
      </div>
    </div>
  );
}

export default app;