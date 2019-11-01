
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
            .get('http://localhost/newcontact/contacts.php')
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
            name: "title",
            label: "Title",
            options: {
             filter: true,
             sort: true,
            }
           },
          {
            name: "first_name",
            label: "First Name",
            options: {
             filter: true,
             sort: true,
            }
           },
           {
            name: "last_name",
            label: "Last Names",
            options: {
             filter: true,
             sort: true,
            }
           },
        
             
               {
                name: "email",
                label: "Email",
                options: {
                 filter: true,
                 sort: true,
                }
               },
               {
                name: "department",
                label: "Department",
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
                    title={"Users Info"}
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
