import React, { Component } from 'react';
import { ButtonGroup } from 'reactstrap';
import NavigationTools from './NavigationTools';
import { Link } from 'react-router-dom';
import "./DashboardLayout.css";
import TablePagination from '@material-ui/core/TablePagination';
import { api_server } from './config/App.config';
import { connect } from 'react-redux';
import './Header/Registration.css';
import {
  Card,
  CardContent,
} from "@material-ui/core";
import {
  Tooltip,
  IconButton,
} from "@material-ui/core";

type Props = {
  crudApi: string,
	editApi: string,
	numColumns: string,
	tableHeaderText: string,
  addButtonText: string,
	columnHeaderTextArr: [],
	columnRecordAttributes: []	
};

type State = {
  isLoading: boolean,
  page: number,
  records: [],
  rowsPerPage: number,
  submitted: boolean
};

class RecordList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.pageActions = this.pageActions.bind(this);
    this.onGetStatistics = this.onGetStatistics.bind(this);
    this.state = { 
      records: [], 
      isLoading: true, 
      rowsPerPage: 10, 
      page: 1,
      submitted: false 
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setState({ rowsPerPage: 10 });
    this.setState({ page: 0 });

    window.scrollTo(0, 0)
    this.setState({ submitted: false });
  }

  handleChangePage = async(e) => {
     e.preventDefault();

    this.setState({ rowsPerPage: 10 });
    this.setState({ page: 0 });
    this.setState({submitted: true});
    
    const jwt = localStorage.getItem("token");
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${jwt}`, Accept: 'application/json' }
    };
  
    fetch(api_server +`/statistics/accountID`, requestOptions)
      .then(response => {     console.log("statistics FETCH: " + response);  
          return response.json()})
      .then(data => { console.log("AFTER FETCH FINAL RECORDS: " + data); this.setState({ records: data, isLoading: false })
      });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
    this.setState({ page: 0 });
  }

  pageActions({ className, count, page, onChangePage, disabled }) {
    let disableNext = disabled || page >= count;
    let disablePrev = disabled || page === 0;
    return (
      <div className={className}>
        <Tooltip title="First Page" placement="bottom" enterDelay={300}>
          <span>
            <IconButton
              onClick={e => onChangePage(e, 0)}
              disabled={disablePrev}
              aria-label="First Page"
            >
              1
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Prev Page" placement="bottom" enterDelay={300}>
          <span>
            <IconButton
              onClick={e => onChangePage(e, page - 1)}
              disabled={disablePrev}
              aria-label="Previous Page"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Current Page" placement="bottom" enterDelay={300}>
          <span>
            <IconButton

              aria-label="Current Page"
              style={{ background: "grey" }}
            >

              <span aria-hidden="true">{this.state.page}</span>
              <span className="sr-only">Current</span>

            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Next Page" placement="bottom" enterDelay={300}>
          <span>
            <IconButton
              onClick={e => onChangePage(e, page + 1)}
              disabled={disableNext}
              aria-label="Next Page"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Last Page" placement="bottom" enterDelay={300}>
          <span>
            <IconButton
              onClick={e => onChangePage(e, count - 1)}
              disabled={disableNext}
              aria-label="Last Page"
            >
              {Math.floor(this.state.records.length / this.state.rowsPerPage)}
            </IconButton>
          </span>
        </Tooltip>
      </div>
    );
  }

onGetStatistics = () => {
    this.setState({ isLoading: true });
    this.setState({ rowsPerPage: 10 });
    this.setState({ page: 0 });
    this.setState({submitted: true});
        const jwt = localStorage.getItem("token");
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',  'Authorization': `Bearer ${jwt}`, Accept: 'application/json' }
      };

      fetch(api_server +`/statistics/accountID`, requestOptions)
      .then(response => {     console.log("statistics FETCH: " + response);  
          return response.json()})
      .then(data => { this.setState({ records: data, isLoading: false })
 {
        Object.keys(this.state.records).map((key, i) => (
          // <p key={i}>
          //   <span>Key Name: {key}</span>
          //   <span>Value: {sampleJSON.object[key]}</span>
          // </p>
          console.log("KEY111: " + key + ", VALUE: " + this.state.records[key])
        ))
      }
    });
  };


  render() {
    const pom_list = this.state.records;
    const isLoading = this.state.isLoading;
    const submitted = this.state.submitted; 
    var records = [];  
    Object.keys(pom_list).map((key, i) => (
          records = records.concat({ username: key, num:  pom_list[key]})
    ))
      
    const recordList = records.map(record => {   
      const headersRow = ["username", "num"];
      const recordCellsArr = record => {
        const arr = [];
          {  console.log("record.username: " + record.username);
            console.log("record.num: " + record.num); }
            arr.push(
              <td style={{ whiteSpace: "nowrap" }}>
                {record.username}
              </td>
            );
                        arr.push(
              <td style={{ whiteSpace: "nowrap" }}>
                {record.num}
              </td>
            );
        return arr;
      };
        return (
          <tr key={record.num}>
            {recordCellsArr(record)}
          </tr>
        );
    });

   const headersRow1 = () => {
      const arr = [];
      let heading_col = ["Username", "Number of registered vehicles"];
      const percentage = 100 / this.props.numColumns + "%";

      for (var i = 0; i < 2; i++) {
        arr.push(
          <th width={percentage}>{heading_col[i]}</th>
        );
      }
      return <tr>{arr}</tr>;
    };

    return (
      <div>
        <NavigationTools />
          <div className="search-box">
            <Card>
          
              { submitted && (
              <CardContent>
                <div className="dashboardTable">
                  <h1>
                  {/* {this.props.tableHeaderText} list */}
                    Registered vehicles per user list
                  </h1>

                  <table className="table bp3-html-table bp3-html-table-bordered">
                    <thead>{headersRow1()}</thead>
                    <tbody>
                      {recordList}
                    </tbody>
                  </table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  // count={recordList.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  backIconButtonProps={{
                  "aria-label": "Previous Page"
                  }}
                  nextIconButtonProps={{
                  "aria-label": "Next Page"
                  }}

                  ActionsComponent={this.pageActions}
                  // onChangePage={(e, page) => this.handleChangePage(page)}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </CardContent>
              )}

            </Card>
          { !submitted && (
          <button type="button" 
              className="circle-button btn btn-primary"
              // style={{ backgroundColor: "rgb(255,255,0)" }}
              onClick={e => this.handleChangePage(e)}>Get statistic report</button>
          )} 
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
}

const connectedRecordList = connect(mapStateToProps)(RecordList);
export { connectedRecordList as RecordList }; 