import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import { GxModal } from '@garpix/garpix-web-components-react';
import style from './modal.module.scss';

const Modal = ({
  setOpen,
  children = null,
  variant = null,
  ...props
}) => {
  const {dispatch} = useStoreon('')
  const classes = classNames({
    [style.modal]: true,
    [style[`modal-${variant}`]]: variant
  });

  const afterHideModal = () => {
    setOpen(false);
    dispatch('modal/close');
  }

  return ReactDOM.createPortal(
    <GxModal
      onGx-after-hide={afterHideModal}
      className={classes}
      {...props}
    >
      {children}
    </GxModal>,
    document.body
  );
};

export default Modal