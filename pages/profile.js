import "../styles/style.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Profile from "../components/Profile";
import IssuePositions from "../components/IssuePositions";
import Comment from "../components/Comment";
import MyLoader from "../components/MyLoader";
import React, { Component, Fragment } from "react";
import axios from "axios";
// import Comment from "../components/Comment";

export default class extends Component {
  static async getInitialProps({ req, query: { id }}) {
    
    console.log(id);
    

    return axios.all([
      axios.get("https://civicmonitor.herokuapp.com/api/v2/candidates/" + id),
      axios.get("https://civicmonitor.herokuapp.com/api/v2/candidates/"+id+"/issue-positions")
    ])
      .then(axios.spread((candidate, candidateIssuePosition) => {
        const data = {
          candidate: candidate.data,
          candidateIssuePosition: candidateIssuePosition.data
        }
console.log(data);
        return data;
      }))

      .catch(e => console.log(e))
   
    }
    // return { politicians };
    // console.log(await candidates.json());
  

  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = { error: false, hasMore: true, isLoading: false, politicians: [], candidate: [], IssuePositions: [], political_party: "", current_page: "ISSUE_POSITIONS" };
  }
  
   calcAge(dateString) {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}
  componentWillMount() {
    console.log(this.props);
    const {membership} = this.props.candidate.data;
    const {politician, political_party } = membership;
        this.setState({
      candidate: this.props.candidate.data,
      politician,
      political_party,
      IssuePositions: this.props.candidateIssuePosition.data.issue_positions
    });
  }
  

handleTabSwitch = (e) => {
e.preventDefault();
  this.setState((state, props) => ({
    current_page: state.current_page == "ISSUE_POSITIONS" ? "PROFILE" : "ISSUE_POSITIONS"
  }));
  
}
  nl2br(str, is_xhtml) {
    var breakTag =
      is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
    return (str + "").replace(
      /([^>\r\n]?)(\r\n|\n\r| \r|\n)/g,
      "$1" + breakTag + "$2"
    );
  }

  render() {

    return <div style={{ fontFamily : "'Poppins', sans-serif;"}}>
        <Nav />
        <div className="introduction">
        <div className="overlay">
          <div className="container mx-auto py-20">
            <div className="flex flex-col justify-center items-center md:flex-row">
              <div className="md:mr-20">
                <img src={`https://res.cloudinary.com/civic-monitor/image/upload/${this.state.politician.image}`} className="w-32 h-32" style={{ borderRadius: "10px"}} />
              </div>
              <div className="mt-5 w-3/4 flex flex-col items-center md:items-start text-white ">
                <h2 className="text-center text-white">
                  {this.state.politician.name}
                </h2>
                <div className="mt-5 flex flex-wrap flex-col">
                  <p className="text-center md:text-left">
                    <strong >Age:</strong> <br className=" sm:inline" /> {this.calcAge(this.state.politician.birth_date)} Years
                  </p>
                  <p className="text-center md:text-left flex items-center">
                  <strong className="mr-5">Party:</strong> {this.state.political_party.name} ({this.state.political_party.acronym}) <img className="ml-5 w-10 h-10 rounded-full" src={`https://res.cloudinary.com/civic-monitor/image/upload/${this.state.political_party.logo}`} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <div className="container mx-auto px-6 py-10">

        <div className="w-full sm:w-4/4">
        <div className="sticky pin-t" >
          <div className="bg-white w-full shadow mt-5 rounded p-5">
            {/* hardcoded */}
            <div className="py-2 border-b-2">
              <h3>Office</h3>
              <p>Presidency</p>
            </div>
            <div className="py-2">
              <h3>Election</h3>
              <p>
                <strong>#NigeriaDecides2019</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: "20px"
      }}
  className=" pin-t bg-white w-full shadow -mt-20 rounded p-5 flex flex-col justify-center">
      <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded mb-2" onClick={e => this.handleTabSwitch(e)}>
        {this.state.current_page == "PROFILE" ? "View Issue Positions" : "View Profile"}
      </button>

      <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
        Add to Compare List
      </button>
    </div>
    

          <div className="flex flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-4/4 sm:mr-5">
              {this.state.current_page == "PROFILE" ? (
                <Profile politician={this.state.politician} />
              ) : (
                <IssuePositions
                  IssuePositions={this.state.IssuePositions}
                />
              )}
            </div>
          </div>

         

          <Comment />

          <Footer />
        </div>
      </div>;
  }
}
