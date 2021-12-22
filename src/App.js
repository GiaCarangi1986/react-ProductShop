import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Routes, Route } from 'react-router-dom'
import { useStoreon } from 'storeon/react'
import { AuthPage } from './pages'
import { ERROR_TYPES, PATHS } from './const'
import { useNetwork } from './utils'
import { ErrorPopup } from './views';

const App = () => {
  const navigate = useNavigate();
  const { errorPopup, dispatch } = useStoreon('errorPopup')
  const isOffline = useNetwork()

  useEffect(() => {
    if (isOffline) {
      dispatch('error/toggle', { errorPopup: ERROR_TYPES.offline })
    } else {
      dispatch('error/toggle', { errorPopup: null })
    }
  }, [isOffline])

  useEffect(() => {
    navigate(PATHS.auth.path)
  }, [])

  return (
    <>
      <Routes >
        <Route
          strict
          path={PATHS.auth.path}
          exact={PATHS.auth.exact}
          element={<AuthPage />}
        />
      </Routes >
      {errorPopup ? <ErrorPopup /> : null}
    </>
  )
}

export default App
