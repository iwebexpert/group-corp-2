import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.scss';
import Spinner from '../../components/Spinner';
import { Typography, Card, CardContent, CardMedia, Hidden, makeStyles, IconButton, Box } from '@material-ui/core';
import { fetchProfileInfo, setProfileSticker } from '../../redux/ducks/profile';
import { rawProfileInfo, stickers } from '../../constants/constants';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    marginTop: 8,
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 460,
  },
});

const ProfilePage = () => {
  const classes = useStyles();
  const { card, cardDetails, cardMedia } = classes;

  const dispatch = useDispatch();
  const { profileReducer } = useSelector((state) => state);
  const { data } = profileReducer;

  const handleStickerClick = (idx) => {
    dispatch(setProfileSticker(stickers[idx]));
  };

  useEffect(() => {
    if (!data) {
      dispatch(fetchProfileInfo(rawProfileInfo));
    }
  }, []);

  const renderProfileCard = () => {
    const { firstname, lastname, username, BIO, number, date, image } = data;
    return (
      <>
        <Typography component="h2" variant="h5">
          {`Username: ${username}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {date}
        </Typography>
        <Typography variant="subtitle1" paragraph>
          {BIO}
        </Typography>
        <Typography variant="subtitle2" paragraph>
          {`Firstname: ${firstname}`}
        </Typography>
        <Typography variant="subtitle2" paragraph>
          {`Lastname: ${lastname}`}
        </Typography>
        <Typography variant="subtitle2" paragraph>
          {`Number: ${number}`}
        </Typography>
      </>
    );
  };

  return (
    <>
    <Card className={card}>
      {data === null ? <Spinner /> : (
        <>
          <div className={cardDetails}>
            <CardContent>
              {renderProfileCard()} 
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={cardMedia} image={data.image} />
          </Hidden>
        </>
      )}
    </Card>
    <Card className={card}>
      <div className={cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            Change profile sticker
          </Typography>
          {stickers.map((sticker, idx) => {
            return (
              <IconButton 
                  color="primary"
                  variant="contained"
                  size="small"
                  key={`sticker-${idx}`}
                  onClick={handleStickerClick.bind(this, idx)}>
                <Box mx={1} my={.5}>{sticker}</Box>
              </IconButton>
            );
          })}
        </CardContent>
      </div>
    </Card>
    </>
  );
};

export default ProfilePage;