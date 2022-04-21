import React from 'react'
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useStoreon } from 'storeon/react';
import { MODAL_TYPES } from '../../const';
import { GxModal } from '@garpix/garpix-web-components-react';
import style from './modal.module.scss';

const Modal = ({
  setOpen,
  children = null,
  variant = null,
  closeArea,
  ...props
}) => {
  const { dispatch, modal } = useStoreon('modal')
  const classes = classNames({
    [style.modal]: true,
    [style[`modal-${variant}`]]: variant
  });

  const afterHideModal = () => {
    if (modal !== MODAL_TYPES.errorModal) {
      setOpen(false);
      dispatch('modal/close');
    }
  }

  const onHide = () => {
    if (modal === MODAL_TYPES.errorModal && closeArea) {
      closeArea()
      setOpen(false);
      dispatch('modal/close');
    }
  }

  return ReactDOM.createPortal(
    <GxModal
      onGx-hide={onHide}
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