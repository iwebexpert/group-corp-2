import React from "react";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { mapStateToProps } from "../mapForConnect/mapStateToProps";
import { mapDispatchToProps } from "../mapForConnect/mapDispatchToProps";

class HeaderContainerClass extends React.Component {
  componentDidMount() {
    if (this.props.infoProfile == null) {
      this.props.profileLoadAction();
    }
    console.log("header", this.props.infoProfile);
  }

  render() {
    return <Header {...this.props} />;
  }
}

export const HeaderContainer = connect(
  mapStateToProps("HeaderContainer"),
  mapDispatchToProps("HeaderContainer")
)(HeaderContainerClass);
