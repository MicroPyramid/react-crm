import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import { 
	MobileOutlined, 
	MailOutlined, 
	UserOutlined, 	
	GlobalOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
	IdcardOutlined,
	TeamOutlined,
	StockOutlined,	
	ForkOutlined
} from '@ant-design/icons';

export class LeadsDetails extends Component {
  
	render() {
		const { data, visible, close} = this.props;		
		return (
			<Drawer
				width={300}
				placement="right"
				onClose={close}
				closable={false}
				visible={visible}
			>
				<div className="text-center mt-3">					     
          <Avatar size={80} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					<h3 className="mt-2 mb-0">Lead Title</h3>
					<span className="text-muted">Account Name</span>
				</div>
				<Divider dashed />
				<div className="">
          <h6 className="text-muted text-uppercase mb-3">Personal Details</h6>
          <p>
          	<UserOutlined />
          	<span className="ml-3 text-dark">Pranav</span>          	
          	<span className="ml-3 text-dark">Krishna</span>
          </p>
          <p>
						<IdcardOutlined/>
          	<span className="ml-3 text-dark">Account Name</span>
          </p>
          <p>
          	<span className="ml-3 text-dark">Account Title</span>
          </p>
          <p>
          	<MobileOutlined/>
          	<span className="ml-3 text-dark">+919898023241</span>
          </p>
          <p>
          	<MailOutlined/>
          	<span className="ml-3 text-dark">pranavkrishna@gmail.com</span>
          </p>
				</div>
        <div className="mt-5">
				<h6 className="text-muted text-uppercase mb-3">Lead Details</h6>
							<p>
								<GlobalOutlined/>
								<span className="ml-3 text-dark">www.pranavkrishna.com</span>
							</p>
							<p>
								<TeamOutlined/>
								<span className="ml-3 text-dark">Teams</span>
							</p>
							<p>
								<UsergroupAddOutlined/>
								<span className="ml-3 text-dark">Assigned Users</span>
							</p>
							<p>
								<StockOutlined />
								<span className="ml-3 text-dark">Status</span>
							</p>
							<p>
								<ForkOutlined/>
								<span className="ml-3 text-dark">Source</span>
							</p>
							<p>
								<TagsOutlined/>
								<span className="ml-3 text-dark">Tags</span>
							</p>
					</div>
				{/* <div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.personalInfo.phoneNumber}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.email? data?.email: '-'}</span>
					</p>
					<p>
						<CompassOutlined />
						<span className="ml-3 text-dark">{data?.personalInfo.location}</span>
					</p>
				</div> */}
				{/* <div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Social profiles</h6>
					<p>
						<FacebookOutlined />
						<a href="/#" className="ml-3 text-dark">{data?.personalInfo.facebook? data?.personalInfo.facebook : '-'}</a>
					</p>
					<p>
						<TwitterOutlined />
						<a href="/#" className="ml-3 text-dark">{data?.personalInfo.twitter? data?.personalInfo.twitter : '-'}</a>
					</p>
					<p>
						<InstagramOutlined />
						<a href="/#" className="ml-3 text-dark">{data?.personalInfo.instagram? data?.personalInfo.instagram : '-'}</a>
					</p>
					<p>
						<GlobalOutlined />
						<a href="/#" className="ml-3 text-dark">{data?.personalInfo.site? data?.personalInfo.site : '-'}</a>
					</p>
				</div> */}
			</Drawer>
		)
	}
}

export default LeadsDetails
