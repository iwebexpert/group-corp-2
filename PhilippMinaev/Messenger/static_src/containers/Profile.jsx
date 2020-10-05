import React from "react";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

class Profile extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <span style={{ fontSize: "20px", border: "1px solid black" }}>
          {profile.name}
        </span>
        <div>
          <span>This is Profile page</span>
          <Button autoFocus component={Link} to={`/`}>
            CLOSE
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  profile: chatReducer.profile,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
