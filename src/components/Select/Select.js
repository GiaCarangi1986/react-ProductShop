import React, { useState, useEffect } from 'react'
import { useStoreon } from 'storeon/react'
import BaseSelect from './BaseSelect'
import { SELECT_TYPES } from '../../const'
import { e } from '@garpix/fetcher/dataStates-3fdb48f5'

const Select = ({ func = () => { }, type, ...props }) => {
  const { dispatch } = useStoreon()
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState([])

  useEffect(() => {
    setLoading(true)
    func()
      .then((res) => {
        const newRes = res.map(elem => {
          switch (type) {
            case SELECT_TYPES.product:
              return ({
                label: `${elem.id} (${elem.title}, ${elem.category})`,
                value: elem.id,
                unit: elem.unit,
                name: elem.title,
                price: elem.price
              })

            case SELECT_TYPES.card:
              return ({
                label: `${elem.id} (${elem.FIO})`,
                value: elem.id,
                bonus: elem.bonus
              })

            default:
              break;
          }
        })

        if (type === SELECT_TYPES.card) {
          newRes.unshift({
            label: 'без карты',
            value: 0,
            bonus: 0
          })
        }

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
      {...props}
    />
  )
}

export default Select
