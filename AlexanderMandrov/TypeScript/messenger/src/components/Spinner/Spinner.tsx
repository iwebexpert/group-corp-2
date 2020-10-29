import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import './Spinner.scss';

export const Spinner: React.FC<SpinnerType> = ({
  size = 150,
  color = '#123abc',
}) => {
  const override: SerializedStyles = css`
    display: block;
    margin: 0 auto;
  `;

  return <RingLoader css={override} size={size} color={color} loading={true} />;
};
