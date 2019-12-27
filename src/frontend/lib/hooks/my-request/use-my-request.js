import { useContext, useRef } from 'react'

import { AuthDispatchContext, AuthStateContext } from '../../../components/App/AuthStateProvider'

import request from '../../api/request'

function useMyRequest() {
    // Use context -------------------------------------------------------------
    const authDispatch = useContext(AuthDispatchContext)
    const authState = useContext(AuthStateContext)

    // Use ref -----------------------------------------------------------------
    const myRequest = useRef(() => {})

    myRequest.current = (resource, init, custom = {}) => request(resource, init, {
        dispatch: authDispatch,
        state: authState,
        ...custom,
    })

    // =========================================================================
    return myRequest
}

export default useMyRequest
