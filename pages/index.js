import "../styles/style.css";
import Nav from "../components/Nav";
import Card from "../components/Card";
import Footer from "../components/Footer";
import MyLoader from "../components/MyLoader";
import React, { Component, Fragment } from "react";
import axios from "axios";

export default class extends Component {
  static async getInitialProps({ req }) {
    return axios
      .get("https://civicmonitor.herokuapp.com/api/v2/politicians")
      .then(function(response) {
        // console.log(response.data);
        return response.data;
      })
      .then(function(response) {
        return { politicians: response };
      })
      .catch(e => console.log(e));

    // return { politicians };
    // console.log(await candidates.json());
  }

  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      politicians: [],
      viewAll: false,
      isSearching: false,
      searchValue: "",
      searchResult: ""
    };
    this.timeout = 0;
  }

  componentWillMount() {
    if (!this.state.politicians.length > 0) {
      console.log("first time only");
      this.setState({ politicians: this.props.politicians });
    } else {
      console.log(this.state);
    }
  }

  componentDidMount() {
    // Binds our scroll event handler
      window.onscroll = () => {
        const {
          loadPoliticians,
          state: { error, isLoading, hasMore, nextPage }
        } = this;

        if (!this.state.viewAll) return;

        // Bails early if:
        // * there's an error
        // * it's already loading
        // * there's nothing left to load
        if (error || isLoading || !hasMore) return;
        console.log(window.innerHeight + document.documentElement.scrollTop + 1000, document.documentElement.offsetHeight);
        // Checks that the page has scrolled to the bottom
        if (
          window.innerHeight + document.documentElement.scrollTop + 100 >=
          (document.documentElement.offsetHeight)
        ) {
          console.log(this.state);
          loadPoliticians(this.state.politicians.next_page_url);
        }
      };
    
  }

  loadPoliticians = next_page_url => {
    this.setState({ isLoading: true }, () => {
      if (next_page_url == undefined || next_page_url == null) return;
      axios
        .get(next_page_url)
        .then(res => {
          return res.data;
        })
        .then(res => {
          const { data: stateData } = this.state.politicians;
          const { data: resData } = res;
          const newData = [...stateData, ...resData];
          res.data = newData;

          this.setState({
            // Note: Depending on the API you're using, this value may
            // be returned as part of the payload to indicate that there
            // is no additional data to be loaded
            hasMore: res.next_page_url ? true : false,
            isLoading: false,
            politicians: res
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  handleSearch(e) {
    e.preventDefault();
    if (e.target.value == "") {
      this.setState({
        isSearching: false,
        searchResult: ""
      });
      return;
    }
    this.setState({
      searchValue: e.target.value,
      isSearching: e.target.value ? true : false
    });

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.search(this.state.searchValue);
    }, 1000);
  }
  handleSearchButton(e) {
    e.preventDefault();
    this.search(this.state.searchValue);
  }

  search(value) {
    this.setState({ isSearchingData: true }, () => {
      axios
        .get("https://civicmonitor.herokuapp.com/api/v2/search?q=" + value)
        .then(res => {
          return res.data;
        })
        .then(res => {
          console.log(res);
          this.setState({
            searchResult: res,
            isSearchingData: false
          });
        })
        .catch(err => {
          this.setState({ error: err.message, isSearching: false });
        });
    });
  }

  handleViewAll(e) {
    e.preventDefault();
this.setState((state, props) => { return { 
  viewAll: state.viewAll ? false : true
 }})


  }
  render() {
    return (
      <div style={{ fontFamily : "'Poppins', sans-serif;"}}>
      <Nav />
        <div className="hero-cover" style={{ minHeight: "550px", background: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('static/images/cover.jpg')" }}>


          <div className="container mx-auto px-2 py-8 sm:py-12 md:py-18">
            <div className="mb-12">
              <h1 style={{ fontFamily : "'Black Han Sans', sans-serif;", paddingTop: "100px"}} className="font-display text-white text-5xl sm:text-6xl font-semibold mb-4 leading-none">
                Know your candidates
              </h1>
              <p className="text-xl sm:text-2xl text-white leading-normal">
              Get the Information you need to make the right decision <br/> Your vote is your voice.
              </p>
            </div>
            <form className="max-w-sm sm:flex">
              <input className="block w-full shadow bg-white px-6 py-3 sm:py-4 mb-2 sm:mb-0 rounded sm:rounded-r-none text-lg mb-4 sm:mb-0" placeholder="Enter Politician Name" onChange={e => this.handleSearch(e)} />
              <button id="search" className="w-full sm:w-auto bg-indigo uppercase rounded sm:rounded-l-none text-white font-bold tracking-wide px-6 py-3 hover:bg-indigo-light" value={this.state.searchValue} onClick={e => this.handleSearchButton(e)}>
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="">
          <div className="sticky pin-t z-50">
            <div className="container mx-auto flex justify-between items-baseline border-b-2 border-grey-light my-10  bg-grey-lighter">
              <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
                2019 Presidential Candidates
              </span>
              <span className="font-semibold text-indigo-dark hover:underline no-underline" role="button" onClick={e => this.handleViewAll(e)}>
                {this.state.viewAll ? "View Less" : "View All"}
              </span>
            </div>
          </div>
          <div className="mb-16 container mx-auto px-6">
            {this.state.isSearching && this.state.searchResult.error && <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
                <p className="font-sans text-indigo-dark text-black">
                  {this.state.searchResult.error}{" "}
                </p>
              </div>}
            <div className="flex flex-wrap -mx-4">
              {this.state.isSearchingData && <MyLoader />}
              {this.state.searchResult.data && this.state.searchResult && this.state.searchResult.data.map(
                  politician => {
                    return (
                      <Card
                        key={politician.id}
                        name={politician.name}
                        imgPath={politician.image}
                        candidate={politician.candidates[0]}
                        politicalParty={politician.memberships[0]}
                      />
                    );
                  }
                )}

              {!this.state.isSearching && this.state.viewAll && this.state.politicians.data.map(
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
                      />
                    );
                  }
                )}
              {!this.state.isSearching && !this.state.viewAll && this.state.politicians.data
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
                      />
                    );
                  })}
              {this.state.isLoading && <MyLoader />}

              {this.state.viewAll && !this.state.hasMore && <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center" />}
              {this.state.isLoading && <MyLoader />}
           
            </div>
          {!this.state.viewAll ? <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" onClick={e => this.handleViewAll(e)}>
              See More Candidates
                  </button>
          </div> : ""}
          {this.state.viewAll && !this.state.hasMore && <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
            <p className="font-sans text-indigo-dark text-black">
              You did it! You reached the end!
                  </p>
          </div>}
          </div>
        </div>

       <Footer />
      </div>);
  }
}
