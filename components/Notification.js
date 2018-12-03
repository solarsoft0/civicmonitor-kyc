import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Notification extends Component {
  notify = status => {
    if (status.type == "success") {
      toast(status.text);
    } else if(status.type == "error") {
      toast.error(status.text, {
        position: toast.POSITION.TOP_LEFT
      });
    }
  };

  render() {
    if (this.props.status) this.notify(this.props.status);
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { status } = state.compareReducer;
  return { status };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
