import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.scss';
import { Spinner } from '../../components/Spinner';
import { Error } from '../../components/Error';
import { fetchProfileInfo, setProfileSticker } from '../../redux/ducks/profile';
import { stickers } from '../../constants/constants';
import { AppState, AppDispatch } from '../../redux/rootReducer';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Hidden,
  makeStyles,
  IconButton,
  Box,
} from '@material-ui/core';

const useStyles: () => Record<string, string> = makeStyles({
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

export const ProfilePage: React.FC = () => {
  const { card, cardDetails, cardMedia } = useStyles();

  const dispatch: AppDispatch = useDispatch();
  const { profileReducer } = useSelector((state: AppState) => state);
  const { data, error } = profileReducer;

  useEffect(() => {
    if (!data) {
      dispatch(fetchProfileInfo('yellso'));
    }
  }, []);

  const handleStickerClick: (idx: number) => void = (idx) => {
    dispatch(setProfileSticker(stickers[idx]));
  };

  const renderProfileCard: () => JSX.Element | undefined = () => {
    if (data) {
      const { firstname, lastname, username, BIO, number } = data;
      const date = new Date().toLocaleString();
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
    }
  };

  return (
    <>
      <Card className={card}>
        {error && <Error />}
        {data === null ? (
          <Spinner />
        ) : (
          <>
            <div className={cardDetails}>
              <CardContent>{renderProfileCard()}</CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={cardMedia}
                image="https://source.unsplash.com/random"
              />
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
                  size="small"
                  key={`sticker-${idx}`}
                  onClick={handleStickerClick.bind(window, idx)}
                >
                  <Box mx={1} my={0.5}>
                    {sticker}
                  </Box>
                </IconButton>
              );
            })}
          </CardContent>
        </div>
      </Card>
    </>
  );
};
