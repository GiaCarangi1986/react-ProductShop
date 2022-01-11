// import React, { useState, useEffect } from 'react'
// import classNames from 'classnames'
// import { useFormik } from 'formik'
// import { useStoreon } from 'storeon/react'
// import { List, arrayMove } from 'react-movable'
// import { dataStates } from '@garpix/fetcher'
// import { Button, Checkbox, ErrorText, Icon, Form, Modal } from '../../views'
// import {
//   ERROR_TYPES,
//   MODAL_TYPES,
//   SETTINGS_ITEMS,
//   TABLE_EVENT_TYPES
// } from '../../const'

// import style from './modal.module.scss'
// import api from '../../api'

// const isEqual = require('react-fast-compare');

// const TableSettingsModal = ({
//   setEventType = () => { },
//   setStatusLoading = () => { }
// }) => {
//   const {
//     dispatch,
//     modal,
//     settingsList,
//   } = useStoreon(
//     'settingsList',
//     'modal',
//   )
//   const [open, setOpen] = useState(false)
//   const [items, setItems] = useState(settingsList)
//   const [chooseAll, setChooseAll] = useState(false)
//   const [isUncheckedAll, setUncheckedAll] = useState(false);
//   const [oldValue, setOldValue] = useState(null);
//   const [position, setPosition] = useState({})

//   const classes = classNames({
//     [style['settings-checkbox']]: true,
//     [style['settings-checkbox-items']]: true,
//   })

//   useEffect(() => {
//     setOpen(modal === MODAL_TYPES.settings)
//   }, [modal])

//   const move = (index, where = -1) => {
//     const list = [...items].map(elem => elem)
//     const temp = items[index]

//     list[index] = list[index + where]
//     list[index + where] = temp

//     setItems(list)
//   }

//   const onSubmit = (values, actions) => {
//     const params = [...items].map((item) => {
//       return { ...item, value: values[item.name] }
//     })
//     setEventType(TABLE_EVENT_TYPES.settings)
//     setStatusLoading(dataStates.loading)
//     dispatch('modal/close')
//     actions.setSubmitting(true)
//     api.setSettingsList(params)
//       .then(() => {
//         dispatch('params/reset-settings')
//         dispatch('settings/update', params)
//         setOldValue(values)
//         setPosition(params)
//         setItems(params)
//         actions.setValues(values)
//         actions.setSubmitting(false)
//       })
//       .catch(() => {
//         setStatusLoading(dataStates.failed)
//         actions.setSubmitting(false)
//         dispatch('error/toggle', { errorPopup: ERROR_TYPES.settings })
//       })
//   }

//   const formik = useFormik({
//     initialValues: null,
//     onSubmit,
//   })

//   const chooseAllCheck = (value) => {
//     const params = [...SETTINGS_ITEMS].map((item) => ({ ...item, value }))
//     let newVals = {}

//     params.map((elem) => {
//       newVals = {
//         ...newVals,
//         [elem.name]: elem.value,
//       }
//       return newVals
//     })
//     formik.setValues(newVals)
//   }

//   const currentValues = (values = null) => {
//     setPosition(settingsList)
//     setItems(settingsList)
//     formik.setValues(values)
//   }

//   const initialValues = (reset = false, settingsListServer = []) => {
//     const val = reset ? SETTINGS_ITEMS : settingsListServer
//     if (!reset) {
//       setPosition(val)
//       dispatch('settings/update', settingsListServer)
//     }
//     setItems(val)
//     let newVals = {}
//     val.map((elem) => {
//       newVals = {
//         ...newVals,
//         [elem.name]: elem.value,
//       }
//       return newVals
//     })
//     formik.setValues(newVals)
//     if (!reset) {
//       setOldValue(newVals)
//     }
//   }

//   useEffect(() => {
//     if (!open) {
//       currentValues(oldValue)
//     }
//   }, [open])

//   const getItems = (array = [], item = {}) => {
//     return array.find((el) => el.name === item.name ? el : null)
//   }

//   useEffect(() => {
//     api.checkUser()
//       .then((res) => {
//         const length = res?.settings[0]?.settings.length || 0
//         let settingsArr = [...SETTINGS_ITEMS]
//         if (length > 0) {
//           const arr = res.settings[0].settings;
//           const newArrElems = []
//           const serverArr = []

//           SETTINGS_ITEMS.forEach((item) => {
//             const setting = getItems(arr, item)
//             if (!setting) {
//               newArrElems.push(item)
//             }
//           })

//           arr.forEach((item) => {
//             const setting = getItems(SETTINGS_ITEMS, item)
//             if (setting) {
//               serverArr.push(item)
//             }
//           })
//           settingsArr = [...serverArr, ...newArrElems]
//         }

//         initialValues(false, settingsArr)
//       })
//       .catch((err) => {
//         console.log(err, 'err')
//       })
//   }, [])

//   const identityVerification = () => {
//     if (JSON.stringify(oldValue) === JSON.stringify(formik.values) && isEqual(items, position)) {
//       return true;
//     }
//     return false;
//   }

//   useEffect(() => {
//     if (formik.values !== null) {
//       let countTrue = 0;
//       const countAll = Object.values(formik.values)
//       countAll.forEach(el => {
//         if (el) {
//           countTrue += 1;
//         }
//       })

//       const isCheckAll = countTrue === items.length;
//       const isUncheckAll = countTrue === 0 && items.length;
//       setChooseAll(isCheckAll)
//       setUncheckedAll(isUncheckAll)
//     }
//   }, [formik])

//   return (
//     <Modal setOpen={setOpen} variant='left' open={open}>
//       <h2 className={style['modal-title']}>Отображение колонок</h2>
//       {formik.values !== null ? (
//         <Form
//           className={style['settings-form']}
//           onGx-submit={formik.handleSubmit}
//         >
//           <div className={style['settings-checkbox']}>
//             <Checkbox
//               checked={chooseAll}
//               value={chooseAll}
//               onGx-change={(e) => {
//                 chooseAllCheck(e.target.checked)
//               }}
//             >
//               Все
//             </Checkbox>
//           </div>
//           <span className={style['settings-checkbox__line']} />
//           <List
//             lockVertically
//             values={items}
//             onChange={({ oldIndex, newIndex }) => {
//               setItems(arrayMove(items, oldIndex, newIndex))
//             }
//             }
//             renderList={({ children, props }) => (
//               <ol {...props} className={style['settings-list']}>
//                 {children}
//               </ol>
//             )}
//             renderItem={({ value, props }) => (
//               <li {...props} className={style['settings-list__item']}>
//                 <div className={classes}>
//                   <Checkbox
//                     onGx-change={(e) => {
//                       formik.setFieldValue([value.name], e.target.checked)
//                     }}
//                     checked={Boolean(formik.values[value.name])}
//                     value={formik.values[value.name]}
//                     name={value.name}
//                   >
//                     {value.label}
//                   </Checkbox>
//                   <div className={style['btns-action']}>
//                     <Button
//                       variant='text'
//                       disabled={props.key === 0 || !formik.values[value.name]}
//                       onClick={() => move(props.key)}
//                     >
//                       <Icon icon='arrowUp' />
//                     </Button>
//                     <Button
//                       variant='text'
//                       disabled={
//                         props.key === items.length - 1 ||
//                         !formik.values[value.name]
//                       }
//                       onClick={() => move(props.key, 1)}
//                     >
//                       <Icon icon='arrowDown' />
//                     </Button>
//                     <Button
//                       variant='text'
//                       disabled={!formik.values[value.name]}
//                       data-movable-handle
//                     >
//                       <Icon icon='dragIcon' />
//                     </Button>
//                   </div>
//                 </div>
//               </li>
//             )}
//           />
//           <span className={style['settings-checkbox__line']} />
//           <div className={style['btns-group']}>
//             {isUncheckedAll ? (
//               <ErrorText absolute errorClass='settingsForTable'>
//                 Выберите хотя бы 1 поле
//               </ErrorText>
//             ) : null}
//             <Button type='reset' disabled={formik.isSubmitting} outline onClick={() => initialValues(true)}
//             >
//               Сбросить
//             </Button>
//             <Button type='submit' disabled={formik.isSubmitting || isUncheckedAll || identityVerification()} buttonDis
//             >
//               Применить
//             </Button>
//           </div>
//         </Form>
//       ) : null}
//     </Modal>
//   )
// }
// export default TableSettingsModal
