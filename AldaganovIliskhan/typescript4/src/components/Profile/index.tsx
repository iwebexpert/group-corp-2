import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { AppState } from "../../reducers";

export const Profile = () => {
  const { profileData, isProfileError, isProfileLoading } = useSelector(
    ({ profile }: AppState) => profile
  );
  if (isProfileError) {
    return <div style={{ color: "#000" }}>Error...</div>;
  }
  if (isProfileLoading) {
    return <div style={{ color: "#000" }}>Loading...</div>;
  }
  return (
    <>
      {profileData && (
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {profileData.name}
            </Typography>
            <Typography variant="h5" component="h2">
              {profileData.nickname}
            </Typography>
            <Typography color="textSecondary">
              {profileData.age} years old
            </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
};
