import React, { useState } from 'react';
import { 
    List, 
    Dropdown, 
    Menu, 
    Row, 
    Col, 
    Typography,
    DatePicker,
    Space
} from 'antd';
import { 
    CalendarOutlined, 
    CloseOutlined,
    RightOutlined
} from '@ant-design/icons';

import { CgCalendarNext } from 'react-icons/cg';
import { IoMdCalendar } from 'react-icons/io';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BiCalendarMinus } from 'react-icons/bi';

import 'antd/dist/antd.css';
import './AddDueDate.css';

import {
    getDueToday,
    getDueTomorrow,
    getDueNextWeek,
  } from '../../../utils/dueDate';

const TIME_FORMAT = 'ddd';

const addDueDate = props => {

    const [hover, setHover] = useState(false);
    const [dueToday, setDueToday] = useState(null);
    const [dueTomorrow, setDueTomorrow] = useState(null);
    const [dueNextWeek, setDueNextWeek] = useState(null);

    const textStyle = {
        color : 'rgba(0, 0, 0, 0.7)'
    };
    const dayStyle = {
        textAlign: 'right'
    };

    const setReminderTimes = () => {
        setDueToday(getDueToday());
        setDueTomorrow(getDueTomorrow());
        setDueNextWeek(getDueNextWeek());
    }

    const menu = (
        <Menu>
             <div className='header'>DUE</div>
             <Menu.Divider />
            <Menu.Item key="0">
                <Row>
                    <Col flex={0}>
                        <div className='dueDateIcon'>
                            <IoMdCalendar size={18}/>
                        </div>
                    </Col>
                    <Col flex="auto">
                        <Typography.Text style={textStyle}>Today</Typography.Text>
                    </Col>
                    <Col flex={0}>
                        <Typography.Text type="secondary" style={dayStyle}>
                            {dueToday && dueToday.format(TIME_FORMAT)}
                        </Typography.Text>
                    </Col>
                </Row>
            </Menu.Item>
            <Menu.Item key="1">
                <Row>
                    <Col flex={0}>
                        <div className='dueDateIcon'>
                            <BiCalendarMinus size={18}/>
                        </div>
                    </Col>
                    <Col flex="auto">
                        <Typography.Text style={textStyle}>Tomorrow</Typography.Text>
                    </Col>
                    <Col flex={0}>
                        <Typography.Text type="secondary" style={dayStyle}>
                        {dueTomorrow && dueTomorrow.format(TIME_FORMAT)}
                        </Typography.Text>
                    </Col>
                </Row>
            </Menu.Item>
            <Menu.Item key="3">
                <Row>
                    <Col flex={0}>
                        <div className='dueDateIcon'>
                            <CgCalendarNext size={18}/>
                        </div>
                    </Col>
                    <Col flex="auto">
                        <Typography.Text style={textStyle}>Next Week</Typography.Text>
                    </Col>
                    <Col flex={0}>
                        <Typography.Text type="secondary" style={dayStyle}>
                            {dueNextWeek && dueNextWeek.format(TIME_FORMAT)}
                        </Typography.Text>
                    </Col>
                </Row>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item 
                key="4" 
                onMouseEnter={() => setHover(true)} 
                >
                <Row>
                    <Col flex={0}>
                        <div className='datePickerIcon'>
                            <FaRegCalendarAlt size={15}/>
                        </div>
                    </Col>
                    <Col flex="auto">
                        <Typography.Text style={textStyle}>Pick a date</Typography.Text>
                    </Col>
                    <Col flex={0}>
                        <Typography.Text type="secondary" style={dayStyle}>
                            <RightOutlined />
                        </Typography.Text>
                    </Col>
                </Row>
            </Menu.Item>
            {hover && 
                <Space direction="vertical">
                    <DatePicker 
                        className='datePicker'
                        onChange={() => {
                            setHover(false);
                        }} 
                        open={hover}/>
                </Space>
            }
        </Menu>
      );
    return (
        <List.Item
            key="DueDateItem"
            actions={props.todo.dueDate && [
                <button className='deleteIcon'>
                    <CloseOutlined style={{fontSize: '10px'}}/>
                </button>
            ]}>
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        trigger={['click']}
        // getPopupContainer={getRoot}
        onVisibleChange={setReminderTimes}
        overlayStyle={{ minWidth: 220 }}
      >
        <List.Item.Meta
          avatar={
            <CalendarOutlined style={{fontSize: '16px', color: '#757575'}}/>
          }
          title ={<div className='dueDateTitle'>Add due date</div>}
        //   title={todo && getDueDateTitle(todo.dueDate)}
        />
      </Dropdown>
    </List.Item>
    );
}
    
export default addDueDate;


// function onChange(date, dateString) {
//   console.log(date, dateString);
// }

