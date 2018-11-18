import "../styles/style.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="bg-blue-darkest text-white">
          <div className="container mx-auto py-20">
            <div className="flex flex-col justify-center items-center md:flex-row">
              <h2> About Us</h2>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-10 flex justify-center">
          <div className="w-3/4">
            <p>
              KYC is brought to you by Civic Monitor, a Nigerian non-profit
              organization committed to empowering citizens and driving
              engagement by providing the tools and data to help citizens make
              more thoughtful decisions.<br/> Our target with KYC is to democratize
              information about candidates vying for political offices in
              Nigeria. With over 90 registered political parties in the country,
              it can be overwhelming for eligible voters to keep track of where
              candidates stand on the most important issues. <br/> Some political
              parties have more resources than others, and this gives them an
              advantage in communicating their programs and ideas. KYC levels
              the playing field, such that every candidate has a shot at being
              heard. We provide data on the track records and issue positions of
              candidates in a fair, representative and easy to understand format
              so that voters interested in learning more can easily do so.<br/> We
              also provide the tools for voters to compare the different
              positions of two candidates on any particular issue. Are you
              interested in using our data API for your own apps or software?
              <br /> <strong>Contact us at kyc@civicmonitor.com</strong>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
