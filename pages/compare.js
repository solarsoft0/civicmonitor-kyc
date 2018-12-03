import React, { Component } from "react";
import { connect } from "react-redux";
import Nav from "../components/Nav";
import axios from "axios";
import "../styles/style.css";
import {
  loadCompareIssue,
  loadComparePoliticians,
  selectIssueValue,
  removeFromCompare,
  setCompareValue
} from "../redux/actions/compare-actions";

export class compare extends Component {
  constructor(props) {
    super(props);
    this.handleSelectIssueChange = this.handleSelectIssueChange.bind(this);
    console.log(props);

    //fetch issues if not already fetch
    if (!props.issues.length > 0) {
      console.log(props);
      axios
        .get("https://civicmonitor.herokuapp.com/api/v2/issues")
        .then(function({ data }) {
          props.loadIssue(data.data);
        })
        .catch(e => console.log(e));
    }

    //fetch politician if not already fetch
    if (!props.politicians.length > 0) {
      console.log(props);
      axios
          .get("https://civicmonitor.herokuapp.com/api/v2/politicians?all=true&lite=true")
        .then(function({ data }) {
          props.loadPoliticians(data.data);
        })
        .catch(e => console.log(e));
    }
  }

  handleSelectIssueChange(e) {
    e.preventDefault();
    this.props.issueValue(event.target.value);
  }
  handleSelectPoliticianChange(e, type) {
let name = e.target.value;
    this.props.compareValue({name,type});
  }
 
  render() {
    return (
      <div>
        <Nav />

        <div className="text-blue-darkest">
          <div className="container mx-auto py-4">
            <div className="flex flex-col items-center justify-center mb-4 text-center py-4">
              <h2 className="py-5">Compare Candidates</h2>
              <p className="mb-5">
                Struggling to make up your mind on which candidate has a better
                program for you? You can easily compare where they stand on the
                issues you care about.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue-darkest text-white">
          <div className="container mx-auto py-20">
            <div className="flex flex-col justify-center items-center md:flex-row">
              <div className="md:mr-4">
                <h3 className="py-2">Select Candidate</h3>
                <select
                  className="block appearance-none w-64 bg-white border border-grey-light hover:border-grey px-6 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                value={this.props.compare[0] && this.props.compare[0].name}
                  onChange={e => this.handleSelectPoliticianChange(e,1)}
                >
                  {this.props.politicians && this.props.politicians.length < 0 ? (
                    <option>loading</option>
                  ) : (
                    <option>select politicians</option>
                  )}
                  {this.props.politicians && this.props.politicians.length < 0
                    ? ""
                    : this.props.politicians.map(politician => (
                                        <option key={politician.id} value={politician.name}>{politician.name}</option>
                    ))}
                </select>
              </div>
              <div className="md:mr-4">
                <h3 className="py-2">Select Candidate</h3>

                            <select
                                className="block appearance-none w-64 bg-white border border-grey-light hover:border-grey px-6 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                value={this.props.compare[0] && this.props.compare[1].name}
                                onChange={e => this.handleSelectPoliticianChange(e,2)}
                            >
                                {this.props.politicians && this.props.politicians.length < 0 ? (
                                    <option>loading</option>
                                ) : (
                                        <option>select politicians</option>
                                    )}
                                {this.props.politicians && this.props.politicians.length < 0
                                    ? ""
                                    : this.props.politicians.map(politician => (
                                        <option key={politician.id} value={politician.name}>{politician.name}</option>
                                    ))}
                            </select>
              </div>
              <div>
                <h3 className="py-2">Select Issue</h3>
                <div className="flex flex-col md:flex-row">
                  <select
                    className="block appearance-none w-64 bg-white border border-grey-light hover:border-grey px-6 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={this.props.selectedIssueValue}
                    onChange={e => this.handleSelectIssueChange(e)}
                  >
                    {this.props.issues && this.props.issues.length < 0 ? (
                      <option>loading</option>
                    ) : (
                      <option>select Issues</option>
                    )}
                    {this.props.issues && this.props.issues.length < 0
                      ? ""
                      : this.props.issues.map(issue => (
                          <option key={issue.id}>{issue.title}</option>
                        ))}
                  </select>
                  <button className="mt-4 md:mt-0 w-full sm:w-auto bg-indigo uppercase rounded sm:rounded-l-none shadow text-white font-bold tracking-wide px-6 py-3 hover:bg-indigo-light">
                    Compare
                  </button>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="flex py-20 items-baseline">
            <div className="w-1/2 flex flex-col text-center items-center justify-between sm:mr-10">
              <h4 className="py-5">By Issue</h4>
              <p className="mb-5">
                Compare two candidates on any of the 16 issues we are gathering
                data on. Choose the issue and the two candidates and compare,
                Here you will have a side by side comparison of the two of
                candidates on that one issue.
              </p>
              <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Compare
              </button>
            </div>
            <div className="w-1/2 flex flex-col items-center text-center">
              <h4 className="mb-5">By Political Party</h4>
              <p className="mb-5">
                Compare two parties. When you select two parties to be compared,
                they appear side by side, with a list of the two candidates,
                their bio and their positions underneath.
              </p>
              <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
                Compare{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { compare, status, issues, selectedIssueValue, politicians } = state.compareReducer;
  return { compare, status, issues, selectedIssueValue, politicians };
};

const mapDispatchToProps = dispatch => {
  return {
    loadIssue: payload => {
      dispatch(loadCompareIssue(payload));
    },
    loadPoliticians: payload => {
      dispatch(loadComparePoliticians(payload));
    },
    issueValue: payload => {
      dispatch(selectIssueValue(payload));
    },
    compareValue: payload => {
      dispatch(setCompareValue(payload));
    },
    removeCompare: payload => {
      dispatch(removeFromCompare(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(compare);
