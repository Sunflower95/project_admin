import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import axios from 'axios';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
const img = window.localStorage.getItem('image')


class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      rank:'',
      title:'',
      first_name:'',
      last_name:'',
      other_name:'',
      department:'',
      email:'',


    }

    // handleClick=this.handleClick.bind(this);
  }
 
  handleClick = async( event ) =>{
    event.preventDefault();
    const response = await axios.get(`http://localhost/newcontact/contacts.php`)

    const title = response.data.title;
    const email = response.data.email;          
    //  const password = response.data.password;
    const first_name =response.data.first_name;
    const last_name =response.data.last_name;
    const other_name =response.data.other_name;
    const department = response.data.department;
    const rank = response.data.rank;

    // window.localStorage.setItem('image',image)
    window.localStorage.getItem('first_name',first_name)
    window.localStorage.getItem('last_name',last_name)
    window.localStorage.getItem('other_name',other_name)
    window.localStorage.getItem('email',email)
    window.localStorage.getItem('department',department)
    window.localStorage.getItem('rank',rank)
    window.localStorage.getItem('title',title)
    swal.fire("Your profile","{rank}","success")
  
    
    
    
    



  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    var styles2 = {
      float: 'right'
    };
    const img = window.localStorage.getItem('image')
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3>Makedu Consult</h3>
        {/* <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <AppSidebarToggler style={styles2} className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
        
        </Nav>
        <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={img} className="img-avatar" alt="profile pic" />
            </DropdownToggle>
            <DropdownMenu right>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem> */}
              
        
{/* 
             
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;

//contains notifications and many more
 {/* <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider /> */}

//contains navitems
              {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}

          //navlinks
            {/* <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem> */}
          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem> */}
          {/* <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> */}