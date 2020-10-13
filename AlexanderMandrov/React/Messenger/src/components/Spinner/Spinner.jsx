import React from 'react';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import './Spinner.scss';

const Spinner = ({ size, color }) => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <RingLoader
      css={override}
      size={size}
      color={color}
      loading={true}
    />
  );
};

Spinner.defaultProps = {
  size: 150,
  color: '#123abc'
};

export default Spinner;