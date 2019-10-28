import React, { memo } from 'react';
import { NextPage } from 'next';

export const ErrorPage: NextPage = () => {
  return <div>ERROR</div>;
};

export default memo(ErrorPage);
