import { useState, useEffect } from 'react'
import { Tabs, Avatar, Table, Checkbox, Select } from 'antd'
import { EditOutlined, DeleteOutlined, FilterOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { getData } from '../../redux/actions/Fetch'
import { deleteAllUsers, isLoading }from '../../redux/actions/Users'

const { TabPane } = Tabs;
const { Option } = Select;

export const Users = (props) => {

  let { users, loading } = props

  const [activeUsers, setActiveUsers] = useState()
  const [inactiveUsers, setInactiveUsers] = useState()
  
  const [rows, setRows] = useState(10)
  const [activeTab, setActiveTab] = useState(true)
  const [activePages, setActivePages] = useState(0)
  const [inactivePages, setInactivePages] = useState(0)  

  const [checkedIds, setCheckedIds] = useState([])
  const [isLoaded, setIsLoaded] = useState(loading)

  const [checkActiveUsers, setCheckActiveUsers] = useState(false)
  const [checkInactiveUsers, setCheckInactiveUsers] = useState(false)
  
  useEffect(() => {        
    props.getData(`users/?limit=${rows}`, "users")
    // props.getData(`users/?limit=${30}`, "users")
    props.isLoading()
  }, [rows])

  useEffect(() => {
    let activeUsers = users && users.data.active_users.active_users.map(user => {
      return (
        {
          id: user.id,
          profilePic: user.profile_pic,
          userName: user.username,
          email: user.email,
          role: user.role,
          isAdmin: user.is_admin,
          isActive: user.is_active
        }
      )
    })   
    let inactiveUsers = users && users.data.inactive_users.inactive_users.map(user => {
      return (
        {
          id: user.id,
          profilePic: user.profile_pic,
          userName: user.username,
          email: user.email,
          role: user.role,
          is_admin: user.is_admin,
          isActive: user.is_active
        }
      )
    }) 
    setActiveUsers(activeUsers)
    setInactiveUsers(inactiveUsers)
  }, [loading])  
  
  useEffect(() => {
    setActivePages(users && users.data.active_users.active_users_count)
    setInactivePages(users && users.data.inactive_users.inactive_users_count)
  })    

  const columns1 = [
    {
      title: <Checkbox className="users-list-head-checkbox" onClick={(e) => selectAllUsers(e, 'active')}/>,
      render: (row) => <Checkbox 
                        checked={checkActiveUsers}
                        onClick={(e) => getCheckedId(e, row.id)} />
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      render: (user, row) => {        
        return (
          <p onClick={() => routeToDetails(row.id)}>
            <Avatar className="" src={row.profile_pic}/> &nbsp;            
            <span className="">{user}</span>
          </p>
        )
      }
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      render: (email) => <p>{email}</p>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => <p>{role}</p>
    },
    {
      title: 'User Type',
      dataIndex: 'isAdmin',
      render: (type) => <p>{(type) ? 'ADMIN' : 'USER'}</p>
    },
    {
      title: 'Actions',
      render: () => 
        <>
          <span className="edit"><EditOutlined /></span>
          <span className="delete"><DeleteOutlined /></span>
        </>      
    }
  ]  

  const columns2 = [
    {
      title: <Checkbox className="users-list-head-checkbox" onClick={(e) => selectAllUsers(e, 'inactive')}/>,
      render: (row) => <Checkbox 
                              checked={checkInactiveUsers}
                              onClick={(e) => getCheckedId(e, row.id)} />
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      render: (user, row) => {        
        return (
          <p onClick={() => routeToDetails(row.id)}>
            <Avatar className="" src={row.profile_pic}/> &nbsp;            
            <span className="">{user}</span>
          </p>
        )
      }
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      render: (email) => <p>{email}</p>
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => <p>{role}</p>
    },
    {
      title: 'User Type',
      dataIndex: 'isAdmin',
      render: (type) => <p>{(type) ? 'ADMIN' : 'USER'}</p>
    },
    {
      title: 'Actions',
      render: () => 
        <>
          <span className="edit"><EditOutlined /></span>
          <span className="delete"><DeleteOutlined /></span>
        </>      
    }
  ]  

  const updateRecordsPerPage = (e) => {        
    setRows(e)    
  }  
  
  const tabChange = (e) => {    
    if(e == 1) {
      setActiveTab(true)
    } else if (e == 2) {
      setActiveTab(false)
    }
  }
  
  const getCheckedId = (e, id) => {        
    if(checkedIds) {
      if(e.target.checked && !checkedIds.includes(id)) {
        setCheckedIds([...checkedIds, id])
      } else {
        let res = checkedIds.filter(checkedId => checkedId !== id)        
        setCheckedIds(res)
      }      
    }    
  }    

  const deleteUsers = () => {    
  }

  const selectAllUsers = (e, val) => {
    if(e.target.checked) {
      if(val === 'active') {
        setCheckActiveUsers(!checkActiveUsers)
        setCheckedIds(activeUsers.map(user => user.id))
      } else {
        setCheckInactiveUsers(!checkInactiveUsers)
        setCheckedIds(inactiveUsers.map(user => user.id))
      }
    } else {
      if(val === 'active') {
        setCheckActiveUsers(!checkActiveUsers)
        
      } else {
        setCheckInactiveUsers(!checkInactiveUsers)
      }
    }  
  }

  const routeToDetails = (id) => {
    props.history.push(`/home/users/${id}/details`)
  }
  
  return(
    <>
    <div className="toolbar">
      <FilterOutlined className="filter-outlined"/>
      <div className="toolbar-records-per-page">        
        <Select
          style={{ width: 170 }}
          defaultValue="10"
          onChange={updateRecordsPerPage}
        >
          <Option value="10">10 Records per page</Option>
          <Option value="20">20 Records per page</Option>
          <Option value="30">30 Records per page</Option>
        </Select>
      </div>
      <div className="toolbar-pages-count">
        <LeftOutlined className="toolbar-pages-count-leftoutlined"/>
        <span> 1 to  {
                      (activeTab) 
                        ? Math.ceil(activePages/rows)
                        : Math.ceil(inactivePages/rows)
                    }
        </span>
        <RightOutlined className="toolbar-pages-count-rightoutlined"/>
      </div>
    </div>
    <div className="users-delete-all" onClick={deleteUsers}>    
      <DeleteOutlined id="delete-activeusers" /> 
      Delete
    </div>
    <Tabs className="custom-tabs" onChange={tabChange}>      
      <TabPane className="custom-tabpane" tab="Active" key="1">        
        <Table className="users-table users-table-active" 
          columns={columns1} 
          dataSource={activeUsers}
          pagination={false}/>
      </TabPane>
      <TabPane className="custom-tabpane" tab="Inactive" key="2">        
        <Table className="users-table users-table-inactive"
          columns={columns2}
          dataSource={inactiveUsers}
          pagination={false}/>
      </TabPane>
    </Tabs>
    </>
  )
}
const mapStateToProps = (state) => {        
  const { users, loading } = state.users
  return { users, loading }
}

const mapDispatchToProps = {
  getData,
  isLoading,
  deleteAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
