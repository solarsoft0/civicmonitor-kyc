import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyLoader from "../components/MyLoader";
import CompareContainer from '../components/CompareContainer'


import { addToCompare } from "../redux/actions/compare-actions";
import Card from "./Card";

export class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);

  }

  static propTypes = {
    add: PropTypes.func.isRequired
  };

  
  handleAdd(payload) {
    this.props.addCompare(payload);
  }



  render() {
    const {
      name,
      imgPath,
      candidate,
      politicalParty,
      compare,
    } = this.props;
    console.log(this.props);

    return <div className="mb-16 container mx-auto px-6">
        {this.props.isSearching && this.props.searchResult.error && <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
            <p className="font-sans text-indigo-dark text-black">
              {this.props.searchResult.error}{" "}
            </p>
          </div>}
        <div className="flex flex-wrap -mx-4">
          {this.props.isSearchingData && <MyLoader />}
          {this.props.searchResult && this.props.searchResult.data && this.props.searchResult.data.map(
              politician => {
                return (
                  <CardContainer
                    key={politician.id}
                    name={politician.name}
                    imgPath={politician.image}
                    candidate={politician.candidates[0]}
                    politicalParty={politician.memberships[0]}
                    notify={this.notify}
        add={this.handleAdd}
                  />
                );
              }
            )}

          {!this.props.isSearching && this.props.viewAll && this.props.politicians.data.map(
              politician => {
                return (
                  <Card
                    key={politician.id}
                    name={politician.name}
                    imgPath={politician.image}
                    candidate={politician.memberships[0]}
                    politicalParty={
                      politician.memberships[0].political_party
                    }
                    add={this.handleAdd}
                    notify={this.notify}
                  />
                );
              }
            )}
          {!this.props.isSearching && !this.props.viewAll && this.props.politicians.data
              .slice(0, 25)
              .map(politician => {
                return (
                  <Card
                    key={politician.id}
                    name={politician.name}
                    imgPath={politician.image}
                    candidate={politician.candidates[0]}
                    politicalParty={
                      politician.memberships[0].political_party
                    }
                    add={this.handleAdd}
                  />
                );
              })}
          {this.props.isLoading && <MyLoader />}

          {this.props.viewAll && !this.props.hasMore && <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center" />}
          {this.props.isLoading && <MyLoader />}
        </div>
        {!this.props.viewAll ? <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" onClick={e => this.props.handleViewAll(e)}>
              See More Candidates
            </button>
          </div> : ""}
        {this.props.viewAll && !this.props.hasMore && <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
            <p className="font-sans text-indigo-dark text-black">
              You did it! You reached the end!
            </p>
          </div>}
      <CompareContainer />

      </div>;
  }
}

const mapStateToProps = props => {
  const { compare, status } = props.compareReducer;
  return { compare, status };
};

const mapDispatchToProps = dispatch => {
  return {
    addCompare: payload => {
      dispatch(addToCompare(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);
