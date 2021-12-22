import React from 'react'
import { GxForm } from '@garpix/garpix-web-components-react';
import style from './form.module.scss';

const Form = ({ children = null, ...props }) => (
  <GxForm className={style.form} {...props}>{children}</GxForm>
)

export default Form