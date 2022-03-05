import React, { useState, useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import BaseSelect from './BaseSelect'

const Select = ({ setValue = () => { }, func = () => { }, ...props }) => {
  const { dispatch } = useStoreon()
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState([])

  const handleChange = elem => {
    setValue(elem)
  }

  useEffect(() => {
    setLoading(true)
    func()
      .then((res) => {
        const newRes = res.map(elem => {
          return ({
            label: `${elem.id} (${elem.title}, ${elem.category})`,
            value: elem.id,
            unit: elem.unit
          })
        })
        setOptions(newRes)
        setLoading(false)
      })
      .catch((response) => {
        console.log('response', response)

        setLoading(false)
        dispatch('catch/api', response)
      });
  }, [])

  return (
    <BaseSelect
      id='line-bussiness-select'
      isLoading={isLoading}
      options={options}
      onChange={handleChange}
      {...props}
    />
  )
}

export default Select
