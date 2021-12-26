import React from 'react';
import classNames from 'classnames'
import { GxSpinner } from '@garpix/garpix-web-components-react';
import style from './loader.module.scss';

const PreloaderPage = ({ loaderClass = '', size = 'large', ...props }) => {
  const classes = classNames({
    [style['loader-layout']]: true,
    [style[`loader-${loaderClass}`]]: loaderClass,
  })

  return (
    <div className={classes}>
      <GxSpinner size={size} {...props} />
    </div>
  )
}

export default PreloaderPage;