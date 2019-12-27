import React from 'react'

import { AuthDispatchContext, AuthStateContext } from '../../../components/App/AuthStateProvider'

import checkAuth from './check-auth'

function useAuth() {
    // Use ref -----------------------------------------------------------------
    const authRef = React.useRef(() => { })
    const isMounted = React.useRef(false)

    // Use context -------------------------------------------------------------
    const authDispatch = React.useContext(AuthDispatchContext)
    const authState = React.useContext(AuthStateContext)

    // Use effect --------------------------------------------------------------
    // Set isMounted.current on mount and reset on unmount
    React.useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    authRef.current = (goAuth = true, data = {}) => {
        if (isMounted.current) {
            if (goAuth === true) {
                authDispatch({
                    type: ':authState/PATCH:',
                    payload: data,
                })
            }
            else {
                authDispatch({ type: ':authState/INIT:' })
            }
        }
    }

    return [
        checkAuth(authState),
        authRef,
    ]
}

export default useAuth
