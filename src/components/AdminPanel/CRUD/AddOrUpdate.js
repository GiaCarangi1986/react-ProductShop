import React from 'react';
import cn from 'classnames';
import { Button, Icon } from '../../../views';
import style from '../style.module.scss';

const AddOrUpdate = ({ children, comeBack = () => { } }) => {

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
      {children}
    </div>
  )
}

export default AddOrUpdate