import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  loadCompareIssue,
  selectIssueValue, removeFromCompare} from "../redux/actions/compare-actions";

export class CompareContainer extends Component {
  constructor(props) {
    super(props);
    

    this.handleSelectIssueChange = this.handleSelectIssueChange.bind(this);

    axios
      .get("https://civicmonitor.herokuapp.com/api/v2/issues")
      .then(function({ data }) {
        props.loadIssue(data.data);
      })
      .catch(e => console.log(e));
  }

  handleSelectIssueChange(e) {
    e.preventDefault();
    this.props.issueValue(event.target.value);
  }
  handleRemove(payload) {
    this.props.removeCompare(payload);

  }

  render() {
    if (this.props.compare.length > 0) {
      return (
        <div className="flex w-full fixed pin-b pin-l z-50">
          <div className="container m-auto flex justify- bg-grey-lighter flex-grow items-center justify-center">
            <div className="flex flex-no-shrink ">
              {this.props.compare &&
                this.props.compare.map(candidate => {
                  return (
                    <div
                      key={candidate.id}
                      className="flex h-16 items-center py-10 px-5 "
                    >
                      <div
                        className="w-16 h-16 rounded rounded-full mr-1"
                        style={{
                          backgroundImage: `url("http://res.cloudinary.com/civic-monitor/image/upload/w_65,h_65,c_thumb,g_face/${
                            candidate.imgPath
                            }`
                        }}
                      />
                      <div className="flex flex-col items-end">
                        <h3 className="hidden md:block">{candidate.name}</h3>
                        <button onClick={e => this.handleRemove({ id: candidate.id })}>
                          <svg
                            x="0px"
                            y="0px"
                            className="fill-current text-blue-light hover:text-blue-lighter h-3 w-3"
                            viewBox="0 0 348.333 348.334"
                          >
                            <g>
                              <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85   c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563   c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85   l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554   L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z" />
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex h-16 items-center py-10 px-5">
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
              <button className="w-full sm:w-auto bg-indigo uppercase rounded sm:rounded-l-none shadow text-white font-bold tracking-wide px-6 py-3 hover:bg-indigo-light">
                Compare
            </button>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div/>);
    }
   
  }
}

const mapStateToProps = state => {
  const { compare, status, issues, selectedIssueValue } = state.compareReducer;
  return { compare, status, issues, selectedIssueValue };
};

const mapDispatchToProps = dispatch => {
  return {
    loadIssue: payload => {
      dispatch(loadCompareIssue(payload));
    },
    issueValue: payload => {
      dispatch(selectIssueValue(payload));
    },
    removeCompare: payload => {
      dispatch(removeFromCompare(payload));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompareContainer);
