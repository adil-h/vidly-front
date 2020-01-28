import React, { Component } from "react";

class Like extends Component {
  render() {
    return <i className={this.getLikeClass()} onClick={this.props.onLike}></i>;
  }

  getLikeClass() {
    return "fa fa-heart" + (this.props.value ? "" : "-o");
  }
}

export default Like;
