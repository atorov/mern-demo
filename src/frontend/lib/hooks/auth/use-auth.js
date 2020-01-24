import React from 'react'

import { AuthDispatchContext, AuthStateContext } from '../../../components/App/AuthStateProvider'

import checkAuth from './check-auth'

function useAuth() {
    // Use context -------------------------------------------------------------
    const authDispatch = React.useContext(AuthDispatchContext)
    const authState = React.useContext(AuthStateContext)

    // Use callback ------------------------------------------------------------
    const auth = React.useCallback((goAuth = true, data = {}) => {
        if (goAuth === true) {
            authDispatch({
                type: ':authState/PATCH:',
                payload: data,
            })
        }
        else {
            authDispatch({ type: ':authState/INIT:' })
        }
    }, [authDispatch])

    // -------------------------------------------------------------------------
    return [
        checkAuth(authState),
        auth,
    ]
}

export default useAuth
