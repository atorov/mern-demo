import React from 'react'
import PropTypes from 'prop-types'

import getInitState from './get-init-state'
import reducer from './reducer'
import saveState from './save-state'

const initState = getInitState()

const AuthDispatchContext = React.createContext(() => { })
AuthDispatchContext.displayName = 'AuthDispatchContext'

const AuthStateContext = React.createContext(initState)
AuthStateContext.displayName = 'AuthStateContext'

export { AuthDispatchContext, AuthStateContext }

function AuthStateProvider({ children }) {
    // Use state ---------------------------------------------------------------
    const [state, dispatch] = React.useReducer(reducer, initState)

    // Use effect --------------------------------------------------------------
    React.useEffect(() => {
        saveState(state, 'mern-demo')
    }, [state])

    // Main renderer ===========================================================
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

AuthStateProvider.propTypes = {
    children: PropTypes.any.isRequired,
}

export default AuthStateProvider
