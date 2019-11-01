import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import axios from 'axios';
import swal from 'sweetalert2';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
       
          email: "",
       
        };
      }
      validateCodeForm() {
        return this.state.email.length > 0;
      }
    
  
          
      handleChange = (e, email) => {
        this.setState({
        email: e.target.value
        
      }) 
      };
      handleSendCodeClick = async event => {
        event.preventDefault();
        swal.showLoading()//call sweet alert loader onclick function
         var that = this;
        // this.props.history.push("/login");
    
        this.setState({ isLoading: true });
        let formData = new FormData();
        formData.append('email', this.state.email)


    axios({
        method: 'post',
        url: 'http://localhost/newcontact/forgotpassword.php',
        data: formData,
        config: { headers: {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json', }}
    })

    // if(email===undefined){
    
    //   swal.fire("Oops","You have entered a wrong email","error")
    //   return
    // }
    // else{
    //   // this.setState({ isLoading: false });
    //   swal.fire("Good job","A confirmation code has been sent to your mail" ,"sucess")
    // }
    
    .then((response) => {
        //handle success
        swal.close()//dismiss sweetalert loader after handle success
          swal.fire("Great","Successfully Signed In","success").then(result=>{
            if(result.value){
              that.props.history.push("/login");
            }//redirects you to the home page
        })
         
        
       
        console.log(response)

    })
    .catch(function (response) {
        //handle error
        console.log("hi")
        swal.close()//dismiss sweetalert loader after handle success
          swal.fire("Great","Successfully Signed In","success").then(result=>{
            if(result.value){
              that.props.history.push("/login");
            }//redirects you to the home page
        });
         

    });

    this.setState({ isLoading: false });
}

    render() {
 
  var styles2 = {
    float: 'right'
  };

        return (
          <div className="app flex-row align-items-center">
          <Container>
         
            <Row className="justify-content-center">
              <Col md="6">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                    
                      <Form onSubmit={this.handleSendCodeClick}>
                        <h1>Forgot Password</h1>
                        <p className="text-muted">Input your Email to request for a new password</p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-envelope-letter"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="text" value={this.props.email} onChange={ this.handleChange } placeholder="Email"  
/>
                        </InputGroup>
                        <Row>
                          <Col>
                            <Button style={styles2} color="primary" type="submit" className="px-4">Submit</Button>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
    
           
          </Container>
        </div>
   
        );
      }
    }
