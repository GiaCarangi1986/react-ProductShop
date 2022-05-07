import React from 'react';
import cn from 'classnames';
import { Button, Icon, ErrorText } from '../../../views';
import style from '../style.module.scss';

const AddOrUpdate = ({ children, comeBack = () => { }, header = '', disabled = false, btnText = '', error = '' }) => {

  return (
    <div className={cn(style.right, style.right__addupdate)}>
      <div className={style.back}>
        <Button
          variant='text'
          className='button-edit_action'
          onClick={comeBack}
        >
          <Icon slot='icon-left' icon='arrowBack' />
        </Button>
      </div>
      <h2 className={cn(style.header_right, style.header_right__addupdate)}>{header}</h2>
      <div className={style.addupdate}>
        {children}
      </div>
      <div className={cn(style.wrap_row, style.wrap_row__addupdate)}>
        <span />
        <ErrorText errorClass='writeoff'>
          {error}
        </ErrorText>
        <div className={style.wrap_btn}>
          <Button
            // onClick={onAdd}
            className='btn_width-100'
            data-cy='btn'
            buttonDis
            disabled={disabled}
          >
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddOrUpdate