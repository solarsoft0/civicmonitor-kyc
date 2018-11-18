import "../styles/style.css";
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
          window.innerHeight + document.documentElement.scrollTop + 500 >=
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
      <div>
        <div
          className="hero-cover"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('static/images/cover.jpg')"
          }}
        >
          <div className="flex justify-center sm:justify-end pt-5 sm:px-5">
            <ul className="list-reset flex">
              <li className="mr-6">
                <a
                  className="text-white no-underline uppercase font-bold text-base hover:text-blue-light"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="mr-6">
                <a
                  className="text-white no-underline uppercase font-bold text-base hover:text-blue-light"
                  href="/aboutus"
                >
                  About Us
                </a>
              </li>
              <li className="mr-6">
                <a
                  className="text-white no-underline uppercase font-bold text-base hover:text-blue-light"
                  href="#"
                >
                  Compare Candidates
                </a>
              </li>
            </ul>
          </div>

          <div className="container mx-auto px-2 py-8 sm:py-12 md:py-18">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "80%" }}
                viewBox="300 1000 3500 900"
              >
                <polygon
                  class="fill-current text-white hover:text-grey-darker"
                  points="2650.93 1494.24 2650.93 1705.49 1237.03 1705.49 1237.03 1183.11 1968.65 1183.11 1968.65 1494.24 2650.93 1494.24"
                />
                <path d="M1396.3,1271.17l48.83-50.51h-55l-43.32,50.56v-50.56h-41.35v133.81h41.35v-32.65l21.37-22.39,28.21,55h50.92Z" />
                <path d="M1548.45,1220.66v74l-50.39-74h-38.61v133.81h38.89V1281l50.11,73.48h39V1220.66Z" />
                <path d="M1727.45,1236.3q-18.08-17.94-51.48-17.92-32.58,0-50.84,18.25t-18.26,51q0,23.46,9.22,39.06t24.05,22.81q14.83,7.21,37.47,7.21,22.28,0,37.2-8.35a56.38,56.38,0,0,0,22.82-23.36q7.89-15,7.89-38.48Q1745.52,1254.24,1727.45,1236.3Zm-30.58,80.84q-7.3,8.67-20.63,8.66-13,0-20.49-8.85t-7.53-29.11q0-20.46,7.58-29.31t20.08-8.85q13,0,20.67,8.71t7.62,27.62Q1704.17,1308.45,1696.87,1317.14Z" />
                <path d="M1897.67,1220.66l-14.16,74.81-20.75-74.81h-39.13l-20.69,74.91-14.14-74.91h-39.27l29.77,133.81h40.54l23.38-84.25,23.47,84.25h40.55l29.5-133.81Z" />
                <path d="M1391.69,1377.39l-27,45.14-27-45.14h-45.93l52.12,77.78v56h41.44v-56l52-77.78Z" />
                <path d="M1553.56,1393.05q-18.06-17.94-51.48-17.94-32.58,0-50.84,18.25t-18.25,51q0,23.46,9.22,39.06t24,22.83q14.84,7.21,37.47,7.21,22.26,0,37.19-8.35a56.25,56.25,0,0,0,22.82-23.38q7.9-15,7.9-38.46Q1571.64,1411,1553.56,1393.05ZM1523,1473.88q-7.31,8.67-20.63,8.67-13,0-20.49-8.87t-7.53-29.11q0-20.43,7.57-29.29t20.08-8.86q13,0,20.68,8.72t7.62,27.6Q1530.29,1465.21,1523,1473.88Z" />
                <path d="M1677,1377.39V1459q0,11.13-6.07,17.19t-16.75,6.06q-10.77,0-16.84-6.15t-6.07-17.1v-81.62H1590v79.72q0,9.86,3.84,22.63a42.4,42.4,0,0,0,8.81,15.42,48.53,48.53,0,0,0,14.19,11.54q7.76,4,19.3,5.41a180.55,180.55,0,0,0,21.32,1.38q16.88,0,28.93-4.48a46.07,46.07,0,0,0,16.57-11.08,48.28,48.28,0,0,0,11.59-18.42,67,67,0,0,0,3.7-22.4v-79.72Z" />
                <path d="M1854.54,1472.43a53.35,53.35,0,0,0-5.79-8.32c-2.89-3.58-5.09-5.93-6.61-7-2.26-1.66-5.84-3.29-10.77-4.95q9.23-2.1,14.52-5.28a37.15,37.15,0,0,0,13.06-13.1q4.75-8.07,4.75-19.21,0-12.78-6.2-21.69a31.17,31.17,0,0,0-16.34-12.18q-10.14-3.29-29.3-3.29h-68.92V1511.2h41.53v-54.31h3.65a17.44,17.44,0,0,1,10.14,3.1c2.19,1.6,4.68,5,7.48,10.33l22.1,40.88h46.72Zm-35-46.84a10.88,10.88,0,0,1-6.71,4.19c-5.42,1.23-9.07,1.83-10.95,1.83h-17.44v-27.19h18.17q11.31,0,15.42,3.46t4.11,9.94A12.42,12.42,0,0,1,1819.57,1425.59Z" />
                <path d="M1394.38,1613.18q-2.75,12.69-8.81,19.35t-17.94,6.67q-12.23,0-19-8.27t-6.76-30.48q0-18,5.66-26.36,7.48-11.28,21.54-11.29a24.44,24.44,0,0,1,11.23,2.54,23.94,23.94,0,0,1,8.49,7.3,31.36,31.36,0,0,1,4,8.95l36.51-8.12q-7-21.17-21.5-31.4t-39.75-10.23q-32.31,0-50,17.84t-17.67,51q0,24.9,10,40.87t23.87,22.3q13.83,6.33,35.65,6.33,18,0,29.62-5.19a49.86,49.86,0,0,0,19.48-15.44q7.86-10.21,11.5-25.45Z" />
                <path d="M1527,1534.14h-45.11L1431.56,1668h42.22l6.52-22.09h46.94l6.7,22.09h43.3Zm-37.68,82.78,14.62-48.1,14.77,48.1Z" />
                <path d="M1678,1534.14v74l-50.38-74h-38.61V1668h38.88v-73.48L1678,1668h39V1534.14Z" />
                <path d="M1862.2,1574.66a58.88,58.88,0,0,0-10.59-21.46,47.9,47.9,0,0,0-18.49-14.15q-11.17-4.9-29.34-4.91h-61.43V1668h61.43a96.47,96.47,0,0,0,24.64-3.65,44.25,44.25,0,0,0,18.62-10.64,55.09,55.09,0,0,0,13.56-19.8q4.88-11.83,4.88-33.27A99.58,99.58,0,0,0,1862.2,1574.66Zm-41.35,50q-3.11,7.17-8.58,10t-18.44,2.87H1783.7v-73.12H1794q16.07,0,23,7.85t6.94,29.13Q1824,1617.46,1820.85,1624.64Z" />
                <path d="M1885.58,1534.14V1668H1927V1534.14Z" />
                <path d="M2073.08,1574.66a58.73,58.73,0,0,0-10.59-21.46,47.94,47.94,0,0,0-18.48-14.15q-11.19-4.9-29.35-4.91h-61.43V1668h61.43a96.47,96.47,0,0,0,24.64-3.65,44.28,44.28,0,0,0,18.63-10.64,55.06,55.06,0,0,0,13.55-19.8q4.88-11.83,4.88-33.27A99.58,99.58,0,0,0,2073.08,1574.66Zm-41.35,50q-3.11,7.17-8.58,10t-18.44,2.87h-10.13v-73.12h10.31q16.06,0,23,7.85t6.93,29.13Q2034.83,1617.46,2031.73,1624.64Z" />
                <path d="M2172.31,1534.14h-45.1L2076.91,1668h42.22l6.52-22.09h46.95l6.69,22.09h43.3Zm-37.68,82.78,14.62-48.1,14.77,48.1Z" />
                <path d="M2210,1534.14v33h42.17V1668h41.35V1567.18h42.17v-33Z" />
                <path d="M2391.37,1637.64v-26.38h64.35V1584h-64.35V1562.7h69.37v-28.56H2349.93V1668h112.82v-30.31Z" />
                <path d="M2590.84,1604.59q-5.34-8.83-17.07-14.83T2534.93,1578q-10.95-2.28-13.87-4.94a7.42,7.42,0,0,1-3-5.75,9.36,9.36,0,0,1,3.65-7.44q3.65-3.06,10.86-3.06,8.76,0,13.74,4.12t6.52,13.13l39-2.27q-2.57-20.82-16-30.35t-39.11-9.55q-20.91,0-32.91,5.25t-18,14.42a35.14,35.14,0,0,0-6,19.5,32.68,32.68,0,0,0,11.69,25.83q11.58,10.13,38.79,16.25,16.6,3.66,21.17,7.75c3.05,2.75,4.57,5.84,4.57,9.32q0,5.46-4.79,9.62t-13.65,4.15q-11.86,0-18.25-8.11-3.93-5-5.21-14.62l-39.34,2.48q1.74,20.25,14.88,33.41t47.28,13.13q19.44,0,32.22-5.61a44.62,44.62,0,0,0,19.9-16.47,42.41,42.41,0,0,0,7.12-23.73A37.65,37.65,0,0,0,2590.84,1604.59Z" />
                <path
                  className="fill-current text-white hover:text-grey-darker"
                  d="M628.64,1347.82,537.86,1306,460,1360.8v-69.17H585.41l35.31-100.89H443.46l-94.39,105.93v398.46H460V1533.72l57.64,26-1.44,135.46h111l1.44-203.2-61.24-27.38,61.24-41.06Zm-111,116.73L460,1505.63v-116l57.64,25.23Z"
                />
                <path
                  className="fill-current text-white hover:text-grey-darker"
                  d="M845,1190.74v441.69l-67-38.17V1190.74H667v461.15l-.72.72,100.16,55.48L845,1652.61V1716H736.94l-51.16,100.86H860.87L956,1711V1190.74Z"
                />
                <path
                  className="fill-current text-white hover:text-grey-darker"
                  d="M1106.06,1291.63h83.58L1225,1190.74H1090.21L995.1,1296.67V1649l-.72.73,139.78,63.4,71.34-77.82-99.44-43.23Z"
                />
              </svg>
            </div>
            <div className="mb-12">
              <h1 className="font-display text-white text-5xl sm:text-6xl font-semibold mb-4 leading-none">
                Know your candidates
              </h1>
              <p className="text-xl sm:text-2xl text-blue-light leading-normal">
                Get the Information you need to make the right decision
                <br className="hidden md:inline" />
                don't <strong className="text-white font-bold"> sell </strong>
                your
                <strong className="text-white font-bold"> vote.</strong>
              </p>
            </div>
            <form className="max-w-sm sm:flex">
              <input
                className="block w-full shadow bg-white px-6 py-3 sm:py-4 mb-2 sm:mb-0 rounded sm:rounded-r-none text-lg mb-4 sm:mb-0"
                placeholder="Enter Politician Name"
                onChange={e => this.handleSearch(e)}
              />
              <button
                id="search"
                className="w-full sm:w-auto bg-indigo uppercase rounded sm:rounded-l-none text-white font-bold tracking-wide px-6 py-3 hover:bg-indigo-light"
                value={this.state.searchValue}
                onClick={e => this.handleSearchButton(e)}
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="">
          <div className="sticky pin-t z-50">
            <div className="container mx-auto flex justify-between items-baseline border-b-2 border-grey-light my-10  bg-grey-lighter">
              <span className="font-display font-bold tracking-wide uppercase py-4 border-b-2 border-indigo -mb-2px">
                Candidates
              </span>
              <span
                className="font-semibold text-indigo-dark hover:underline no-underline"
                role="button"
                onClick={e => this.handleViewAll(e)}
              >
               {this.state.viewAll ? "View Less" : "View All"}
              </span>
            </div>
          </div>
          <div className="mb-16 container mx-auto px-6">
            {this.state.isSearching && this.state.searchResult.error && (
              <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
                <p className="font-sans text-indigo-dark text-black">
                  {this.state.searchResult.error}{" "}
                </p>
              </div>
            )}
            <div className="flex flex-wrap -mx-4">
              {this.state.isSearchingData && <MyLoader />}
              {this.state.searchResult.data &&
                this.state.searchResult &&
                this.state.searchResult.data.map(politician => {
                  return (
                    <Card
                      key={politician.id}
                      name={politician.name}
                      imgPath={politician.image}
                      candidate={politician.candidates[0]}
                    />
                  );
                })}

              {!this.state.isSearching &&
                this.state.viewAll &&
                this.state.politicians.data.map(politician => {
                  return (
                    <Card
                      key={politician.id}
                      name={politician.name}
                      imgPath={politician.image}
                      candidate={politician.candidates[0]}
                    />
                  );
                })}
              {!this.state.isSearching &&
                !this.state.viewAll &&
                this.state.politicians.data.slice(0, 15).map(politician => {
                  return (
                    <Card
                      key={politician.id}
                      name={politician.name}
                      imgPath={politician.image}
                      candidate={politician.candidates[0]}
                    />
                  );
                })}
              {this.state.isLoading && <MyLoader />}
              {this.state.viewAll && !this.state.hasMore && (
                <div className="container mx-auto px-3 py-4 flex flex-col items-center justify-center">
                  <p className="font-sans text-indigo-dark text-black">
                    You did it! You reached the end!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center mb-10 text-center py-10">
            <h2 className="py-5">Compare Candidates</h2>{" "}
            <p className="mb-5">
              Struggling to make up your mind on which candidate has a better
              program for you? You can easily compare where they stand on the
              issues you care about.
            </p>
          </div>
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
                Compare{" "}
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
        <Footer />
      </div>
    );
  }
}
