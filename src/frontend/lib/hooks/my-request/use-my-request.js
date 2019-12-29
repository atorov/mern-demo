import React from 'react'

import { AuthDispatchContext, AuthStateContext } from '../../../components/App/AuthStateProvider'

import request from '../../api/request'

function useMyRequest() {
    // Use context -------------------------------------------------------------
    const authDispatch = React.useContext(AuthDispatchContext)
    const authState = React.useContext(AuthStateContext)

    // =========================================================================
    const myRequest = React.useCallback((resource, init, custom = {}) => request(resource, init, {
        dispatch: authDispatch,
        state: authState,
        ...custom,
    }), [authDispatch, authState])

    return myRequest
}

export default useMyRequest
