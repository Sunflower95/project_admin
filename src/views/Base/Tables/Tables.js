
import React from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Register/Register';






class Tables extends React.Component {
    constructor(props) {
        super(props);

        Tables.handleClick = Tables.handleClick.bind(this);
    }
    //change theme
    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "lightBlue"
            }
          }
        }
      })

    componentWillMount() { }
    static handleClick(e) {
        alert("parent td#id: " + e.target.parentNode.id);
    }

    state = {
        data: []
    };
    componentDidMount() {
        axios
            .get('http://localhost/newcontact/meetings.php')
            .then(response => {
                this.setState({
                    data: response.data
                });
                console.log(response);
            })
            .catch(error => {
                // handle error
                console.log(error);
            });
    }

                handleFormSubmit( event ) {
                    event.preventDefault();
                    window.localStorage.getItem("name")
                    const path = '/register'
                    this.props.history.push(path)

                }
                handleFormLogin( event ) {
                event.preventDefault();

                window.localStorage.getItem("name")
                const path = '/Login'
                this.props.history.push(path)

                }
    render() {
        const columns = [
          // "meeting_name","chairman","scheduler","date", "time_from","time_to","room","location","agenda","names", "attendees",
          {
            name: "meeting_name",
            label: "Meeting Name",
            options: {
             filter: true,
             sort: true,
            }
           },
            {
                name: "chairman",
                label: "Chairman",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "scheduler",
                label: "Scheduler",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "date",
                label: "Date",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "time_from",
                label: "From",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "time_to",
                label: "To",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
               name: "room",
               label: "Room",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
                name: "location",
                label: "Location",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "agenda",
                label: "Agenda",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "names",
                label: "Emails of Attendees",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "attendees",
                label: "Name of Attendees",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               
             
           
               
            
        
            
            
        ];
        //const action = <Button onClick={Tables.handleClick}>Action</Button>; /* <-- action button */
        const data = this.state.data;
        const options = {
            filterType: "dropdown",
            responsive: "stacked",
            selectableRows: false //clears the checkboxes from default theme

            /*  customToolbarSelect: (selectedRows) => <CustomToolbarSelect selectedRows={selectedRows} />*/
        };

        return (
            <div className="report-view data-table-wrapper">

          <MuiThemeProvider theme={this.getMuiTheme()}>
                <MUIDataTable
                    title={"Schedule History"}
                    data={data}
                    columns={columns}
                    options={options}
                />
                </MuiThemeProvider>
                  {/* <div className="glory">
                 <input type="submit" onClick={e => this.handleFormSubmit(e)} value="register" />
                 <input type="submit" onClick={e => this.handleFormLogin(e)} value="login" />
                </div>
                <Register/> */}
            </div>
        );
    }
}

 export default Tables;
























// import React, { Component } from 'react';
// import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

// class Tables extends Component {
//   render() {
//     return (
//       <div className="animated fadeIn">
//         <Row>
//           <Col xs="12" lg="6">
//             <Card>
//               <CardHeader>
//                 <i className="fa fa-align-justify"></i> Simple Table
//               </CardHeader>
//               <CardBody>
//                 <Table responsive>
//                   <thead>
//                   <tr>
//                     <th>Username</th>
//                     <th>Date registered</th>
//                     <th>Role</th>
//                     <th>Status</th>
//                   </tr>
//                   </thead>
//                   <tbody>
//                   <tr>
//                     <td>Samppa Nori</td>
//                     <td>2012/01/01</td>
//                     <td>Member</td>
//                     <td>
//                       <Badge color="success">Active</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Estavan Lykos</td>
//                     <td>2012/02/01</td>
//                     <td>Staff</td>
//                     <td>
//                       <Badge color="danger">Banned</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Chetan Mohamed</td>
//                     <td>2012/02/01</td>
//                     <td>Admin</td>
//                     <td>
//                       <Badge color="secondary">Inactive</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Derick Maximinus</td>
//                     <td>2012/03/01</td>
//                     <td>Member</td>
//                     <td>
//                       <Badge color="warning">Pending</Badge>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Friderik Dávid</td>
//                     <td>2012/01/21</td>
//                     <td>Staff</td>
//                     <td>
//                       <Badge color="success">Active</Badge>
//                     </td>
//                   </tr>
//                   </tbody>
//                 </Table>
//                 <Pagination>
//                   <PaginationItem>
//                     <PaginationLink previous tag="button"></PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem active>
//                     <PaginationLink tag="button">1</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink tag="button">2</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink tag="button">3</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink tag="button">4</PaginationLink>
//                   </PaginationItem>
//                   <PaginationItem>
//                     <PaginationLink next tag="button"></PaginationLink>
//                   </PaginationItem>
//                 </Pagination>
//               </CardBody>
//             </Card>
//           </Col>
{/* 
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Striped Table
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Yiorgos Avraamu</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Avram Tarasios</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Quintin Ed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Enéas Kwadwo</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Agapetus Tadeáš</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col> */}
        // </Row>

        {/* <Row> */}

          {/* <Col xs="12" lg="6"> */}
            {/* <Card> */}
              {/* <CardHeader>
                <i className="fa fa-align-justify"></i> Condensed Table
              </CardHeader> */}
              {/* <CardBody> */}
                {/* <Table responsive size="sm">
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Carwyn Fachtna</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Nehemiah Tatius</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Ebbe Gemariah</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Eustorgios Amulius</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Leopold Gáspár</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table> */}
                {/* <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              {/* </CardBody> */}
            {/* </Card> */}
          {/* </Col> */}

         {/* <Col xs="12" lg="6"> */}
            {/* <Card> */}
                 {/* <CardHeader>
               <i className="fa fa-align-justify"></i> Bordered Table
             </CardHeader> */}
              {/* <CardBody> */}
                {/* <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Pompeius René</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Paĉjo Jadon</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Micheal Mercurius</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Ganesha Dubhghall</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Hiroto Šimun</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table> */}
                {/* <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              {/* </CardBody> */}
            {/* </Card> */}
          {/* </Col> */}

        {/* </Row> */}

        {/* <Row>
          <Col>
            <Card> */}
              {/* <CardHeader>
                <i className="fa fa-align-justify"></i> Combined All Table
              </CardHeader> */}
              {/* <CardBody> */}
                {/* <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Vishnu Serghei</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Zbyněk Phoibos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Einar Randall</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Félix Troels</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Aulus Agmundr</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table> */}
                {/* <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav> */}
              {/* </CardBody> */}
            {/* </Card>
          </Col>
        </Row> */}
//       </div>

//     );
//   }
// }

// export default Tables;
