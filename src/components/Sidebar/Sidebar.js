import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import 'antd/dist/antd.css';
import classes from './Sidebar.module.css';

import { FiMenu } from 'react-icons/fi';
import { BiSun } from 'react-icons/bi';
import { IoMdStarOutline } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';
import { VscHome } from 'react-icons/vsc';
import { AiOutlineUser, AiOutlinePlus } from 'react-icons/ai';

import { Menu } from 'antd';

const Sidebar = props => {

  const textStyle = {
    verticalAlign: 'super'
  }
    const history = useHistory();

    const [collapsed, setCollapsed] = useState(true);

    return (
      <div style={{backgroundColor: '#f5f5f5', width: collapsed ? 60 : 250}} >
        <button 
          onClick={() => setCollapsed(prevState => !prevState)} 
          className={classes.Button}>
            <span><FiMenu size={20} /></span>
          </button>
        <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={collapsed}
            style={collapsed ? {width: '60px'} : {}}
            className={classes.Menu}
        >
          <Menu.Item 
            title="My Day"  
            icon={<BiSun size={20} color='#757575'/>}
            onClick={() => history.push('/tasks/myday')}>
            <span style={textStyle}>My Day</span>
          </Menu.Item>
          <Menu.Item 
            title="Important" 
            icon={<IoMdStarOutline size={20} color='#757575'/>}
            onClick={() => history.push('/tasks/important')}>
            <span style={textStyle}>Important</span>
          </Menu.Item>
          <Menu.Item  
            title="Planned"
            icon={<IoCalendarOutline size={20} color='#757575'/>}
            onClick={() => history.push('/tasks/planned')}>
            <span style={textStyle}>Planned</span>
          </Menu.Item>
          <Menu.Item  
            title="Assigned to you"
            icon={<AiOutlineUser size={20} color='#5ca52d'/>}
            onClick={() => history.push('/tasks/assigned_to_me')}>
            <span style={textStyle}>Assigned to you</span>
          </Menu.Item>
          <Menu.Item 
            icon={<VscHome size={20} color='#3e69e4'/>}
            title="Tasks"
            onClick={() => history.push('/tasks')}>
                <span style={textStyle}>Tasks</span>
            </Menu.Item>
            <Menu.Item 
                icon={<AiOutlinePlus size={20} color='#6495ed'/>}
                title="New List">
                <span style={textStyle}>New List</span>
            </Menu.Item>
        </Menu>
      </div>
    );
  }

export default Sidebar;