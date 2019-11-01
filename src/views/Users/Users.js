import React, { Component } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import swal from 'sweetalert2';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';

// import "./styles.css";
// import "./styles.css";

class Users extends Component {
  constructor(props){
    super(props);
  this.state = {
    // items: [],
    // value: "",
    // error: null,
    // valu: "",
    // emails: [],


    meeting_name:'',
    scheduler: '',
    chairman: '',
    date: '',
    from: '',
    time_to: '',
    time_from: '',
    room: '',
    location:'',
    agenda:'',
    file: null ,
    items: [],
    value: "",
    error: null,
    
    valu: "",
    emails: []
    
  };

  this.onChange = this.onChange.bind(this)
}
onChange(e){
    this.setState({file:e.target.files[0]})
}


handleChange = event => {
this.setState({
  [event.target.id]: event.target.value
});
}


handleSubmit = async event => {
event.preventDefault();
swal.showLoading()//call sweet alert loader onclick function

console.log(this.state.meeting_name)
console.log(this.state.scheduler)
console.log(this.state.chairman)
console.log(this.state.agenda)
console.log(this.state.attendees)
console.log(this.state.location)
console.log(this.state.date)
console.log(this.state.from)
console.log(this.state.to)
var that = this;

this.setState({ isLoading: true });


let file = this.state.file;
let formData = new FormData();
formData.append('meeting_name', this.state.meeting_name)
formData.append('scheduler', this.state.scheduler)
 formData.append('chairman', this.state.chairman)
 formData.append('agenda', this.state.agenda)
formData.append('attendees', this.state.items)
formData.append('location', this.state.location)
formData.append('date', this.state.date)
formData.append('time_from', this.state.from)
formData.append('time_to', this.state.to)
// formData.append('time', this.state.time)
formData.append('room', this.state.room)
formData.append('names', this.state.emails)
// formData.append('room', this.refs.room.value)
formData.append("avatar",file)


// axios.post('http://localhost/newcontact/meetingscheduler.php', formData)
axios({
  method: 'post',
  url: 'http://localhost/newcontact/meetingscheduler.php',
  data: formData,
  config: { headers: {'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Accept': 'application/json', }}
})
  .then((response) => {
    
    //handle success
    swal.close()//dismiss sweetalert loader after handle success
      swal.fire("Great","Form Submitted Successfully","success").then(result=>{
        if(result.value){
          // that.props.history.push("/meeting");
        }//redirects you to the home page
     



  // const path = '/meeting'
  // that.props.history.push(path);
    })  
    console.log(response)

})
.catch(function (response) {
    //handle error
    console.log("hi")
      swal.fire("Oops","Try Again","error")   
      console.log(response);

     

});

this.setState({ isLoading: false });
}

handleConfirmationSubmit = async event => {
event.preventDefault();

this.setState({ isLoading: true });


}

  handleChang = evt => {
    this.setState({
      valu: evt.target.value
    });
  };

  handleKeyDow = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var email = this.state.valu.trim();

      if (email) {
        this.setState({
          emails: [...this.state.emails, email],
          valu: ""
        });
      }
    }
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  handleDeleteNames = email => {
    this.setState({
      emails: this.state.emails.filter(i => i !== email)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded]
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  


  render() {
    return (
      <div className="animated fadeIn">
        <Row>

          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <strong>Schedule a meeting</strong>
              </CardHeader>
              <CardBody>
              <Form onSubmit={this.handleSubmit} className="form-group ">

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Scheduled By</Label>
                  <Input onChange={e => this.setState({ scheduler: e.target.value })} name="scheduler" disabled type="text" value="Put name of user that logged in here from session"/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Name of meeting</Label>
                  <Input onChange={e => this.setState({ meeting_name: e.target.value })} name="meeting_name" type="text" placeholder="Enter meeting title" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Chaired By</Label>
                  <Input onChange={e => this.setState({ chairman: e.target.value })} type="text" name="chairman"/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Date of meeting</Label>
                  <Input onChange={e => this.setState({ date: e.target.value })} name="date" type="date" placeholder="Date" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Time of meeting</Label>
                  <Input onChange={e => this.setState({ from: e.target.value })} name="time_from" type="text" placeholder="From"/>
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Time of meeting</Label>
                  <Input onChange={e => this.setState({ to: e.target.value })} name="time_to" type="text" placeholder="To" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Location</Label>
                  <Input onChange={e => this.setState({ location: e.target.value })} type="text" placeholder="Location" />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Label htmlFor="company">Room</Label>
                  <Input onChange={e => this.setState({ room: e.target.value })} type="text" placeholder="Room Number" />
                </FormGroup>
              </Col>
            </Row>

                <FormGroup>
                  <Label htmlFor="company">Upload File</Label>
                  <Input onChange={this.onChange} type="file" />
                </FormGroup>

              <FormGroup row>
              <Col md="3">
                      <Label htmlFor="textarea-input">Agenda</Label>
                    </Col>
                    <Col xs="12" md="12">
                      <Input onChange={e => this.setState({ agenda: e.target.value })}type="textarea" id="textarea-input" rows="6"
                             placeholder="Agenda of meeting..." />
                    </Col>
              </FormGroup>

              {this.state.items.map(item => (
          <div className="tag-item" key={item}>
            {item}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDelete(item)}
            >
              &times;
            </button>
          </div>
        ))}

        <Input
          className={"input " + (this.state.error && " has-error")}
          value={this.state.value}
          placeholder="Type or paste email addresses and press `Enter`..."
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          onPaste={this.handlePaste}
        />

{this.state.emails.map(email => (
          <div className="tag-item" key={email}>
            {email}
            <button
              type="button"
              className="button"
              onClick={() => this.handleDeleteNames(email)}
            >
              &times;
            </button>
          </div>
        ))}

        <Input
          className={"input " + (this.state.error && " has-error")}
          placeholder="Type or paste email addresses and press `Enter`"
          value={this.state.valu}
          onChange={this.handleChang}
          onKeyDown={this.handleKeyDow}
        />
                 {this.state.error && <p className="error">{this.state.error}</p>} 
                  <div className="form-actions">
                    <Button type="submit" color="primary"> Submit </Button>
                  </div>

                      </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Users;





// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

// import usersData from './UsersData'

// function UserRow(props) {
//   const user = props.user
//   const userLink = `/users/${user.id}`

//   const getBadge = (status) => {
//     return status === 'Active' ? 'success' :
//       status === 'Inactive' ? 'secondary' :
//         status === 'Pending' ? 'warning' :
//           status === 'Banned' ? 'danger' :
//             'primary'
//   }

//   return (
//     <tr key={user.id.toString()}>
//       <th scope="row"><Link to={userLink}>{user.id}</Link></th>
//       <td><Link to={userLink}>{user.name}</Link></td>
//       <td>{user.registered}</td>
//       <td>{user.role}</td>
//       <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
//     </tr>
//   )
// }

// class Users extends Component {

//   render() {

//     const userList = usersData.filter((user) => user.id < 10)

//     return (
//       <div className="animated fadeIn">
//         <Row>
//           <Col xl={6}>
//             <Card>
//               <CardHeader>
//                 <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
//               </CardHeader>
//               <CardBody>
//                 <Table responsive hover>
//                   <thead>
//                     <tr>
//                       <th scope="col">id</th>
//                       <th scope="col">name</th>
//                       <th scope="col">registered</th>
//                       <th scope="col">role</th>
//                       <th scope="col">status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {userList.map((user, index) =>
//                       <UserRow key={index} user={user}/>
//                     )}
//                   </tbody>
//                 </Table>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     )
//   }
// }

// export default Users;
