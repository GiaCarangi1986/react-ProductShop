import React, { useState, useEffect } from 'react'
import BaseSelect from './BaseSelect'
import { SELECT_TYPES } from '../../const'
import { productGetSerializer } from '../../api/serializer'

const Select = ({ func = () => { }, onInputFunc = () => { }, type, value, ...props }) => {
  const [isLoading, setLoading] = useState(true)
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  const emptyValue = {
    label: 'без карты',
    value: 0,
    bonus: 0
  }

  useEffect(() => {
    if (type === SELECT_TYPES.card) {
      setLoading(false)
      if (!inputValue && value) {
        setOptions([emptyValue])
      }
      else {
        setLoading(true)
        onInputFunc(inputValue)
          .then((res) => {
            const newRes = res.map(elem =>
            ({
              label: `${elem.id} (${elem.FIO})`,
              value: elem.id,
              bonus: elem.bonus
            })
            )

            setOptions(newRes)
            setLoading(false)
          })
          .catch((response) => {
            console.log('response', response)
            setLoading(false)
          });
      }
    }
  }, [inputValue, value])

  useEffect(() => {
    switch (type) {
      case SELECT_TYPES.product:
        setLoading(true)
        func()
          .then((res) => {
            const newRes = res.map(elem => {
              const elemSer = productGetSerializer(elem)
              return ({
                label: `${elemSer.id} (${elemSer.title}${elemSer.manufacturer && ', '}${elemSer.manufacturer})`,
                value: elemSer.id,
                unit: elemSer.unit,
                name: `${elemSer.title}${elemSer.manufacturer && ', '}${elemSer.manufacturer}`,
                price: elemSer.price,
                sale: elemSer.sale,
                count: elemSer.count,
                maybeOld: elemSer.maybeOld
              })
            })

            setOptions(newRes)
            setLoading(false)
          })
          .catch((response) => {
            console.log('response', response)
            setLoading(false)
          });
        break;

      case SELECT_TYPES.gender:
        setLoading(true)
        func()
          .then((res) => {
            const newRes = res.map(elem => {
              return ({
                label: elem.title,
                value: elem.id,
              })
            })

            setOptions(newRes)
            setLoading(false)
          })
          .catch((response) => {
            console.log('response', response)
            setLoading(false)
          });
        break;
    }
  }, [])

  return (
    <BaseSelect
      id='line-bussiness-select'
      isLoading={isLoading}
      options={options}
      setInputValue={setInputValue}
      value={value}
      {...props}
    />
  )
}

export default Select
