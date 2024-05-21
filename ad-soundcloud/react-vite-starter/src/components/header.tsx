import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, SoundOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
    Link,
} from "react-router-dom";

const items: MenuProps['items'] = [
    {
        label: <Link to={'/'}>Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={'/users'}>Home</Link>,
        key: 'account',
        icon: <UserOutlined />,
    },
    {
        label: <Link to={'/tracks'}>Track</Link>,
        key: 'track',
        icon: <SoundOutlined />,
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    );
};

export default Header;
