import React from 'react'
import Select from 'react-select'
import style from './select.module.scss'

const baseCustomStyles = (error = false, otherStyle = {}) => {
  return {
    control: (base) => {
      return {
        ...base,
        minHeight: '100%',
        maxHeight: '100%',
        border: error ? '2px solid red' : '2px solid #c7cdd1',
        boxShadow: 'none',
        borderRadius: '6px',
        '&:hover': {
          borderColor: error ? '#E72525' : 'hsla(201, 100%, 13%, 0.5)',
        },
        '&:focus': {
          borderColor: error ? '#E72525' : 'hsla(201, 100%, 13%, 0.5)',
        },
        ...otherStyle
      }
    },
    indicatorSeparator: () => ({
      display: 'none',
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0px',
      paddingLeft: '12px',
    }),
    singleValue: (base) => ({
      ...base,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: 200,
    }),
    option: (base, { isSelected }) => ({
      ...base,
      color: '#002C44',
      wordBreak: 'word-break',
      backgroundColor: isSelected ? '#EDF8F8' : 'white',
      '&:hover': {
        color: isSelected ? '#002C44' : '#009BA4',
      },
      '&:active': {
        backgroundColor: '#EDF8F8'
      },
      '&:focus': {
        backgroundColor: '#EDF8F8'
      },
    })
  }
}

const DropdownIndicator = () => {
  return (
    <div style={{ marginRight: '16px' }}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='10'
        height='6'
        viewBox='0 0 10 6'
        fill='none'
      >
        <path d='M0 0H10L5.16129 6L0 0Z' fill='#002C44' />
      </svg>
    </div>
  )
}

const BaseSelect = ({
  id,
  isLoading = true,
  options = [],
  label = '',
  value = null,
  err = false,
  otherStyle = {},
  setInputValue = () => { },
  ...props
}) => {
  const onInput = (e) => {
    setInputValue(e)
  }

  return (
    <>
      <label className={style['select-label']} htmlFor={id}>
        {label}
      </label>
      <Select
        id={id}
        className={style.select}
        styles={baseCustomStyles(err, otherStyle)}
        placeholder=''
        components={{ DropdownIndicator }}
        isSearchable
        isLoading={isLoading}
        options={options}
        value={value}
        onInputChange={onInput}
        {...props}
      />
    </>
  )
}

export default BaseSelect
