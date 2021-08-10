import React, { Component } from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';
class Profile extends Component {

    render() {
        return (
            <div className="head-wrapper ">
                <div className="p-1 d-flex justify-content-between w-100">
                    <div>
                        <SettingOutlined
                            style={{
                                fontSize: "22px",
                               
                            }} /></div>
                    <div>
                        <Avatar
                        size={32}
                        style={{marginBottom:"10px"}}
                            src={<Image src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1544&q=80" />}
                        />
                    </div>
                    {/* <Button type="primary">Upload csv</Button>           */}

                </div>
            </div>
        )
    }
}

export default Profile