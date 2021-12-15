import React from "react";
import { Menu, Dropdown, Avatar, Image, Button } from "antd";

export const NavProfile = ({signOut}) => {

  const onLogout = () => {
    window.localStorage.clear();
    window.location = '/login'
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <p onClick={() => onLogout()}>Logout</p>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" className='logout-icon'/>
    </Dropdown>
  );
}

export default (NavProfile)
