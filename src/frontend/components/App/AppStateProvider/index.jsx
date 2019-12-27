import React from 'react'
import PropTypes from 'prop-types'

import initState from './init-state'
import reducer from './reducer'

const AppDispatchContext = React.createContext(() => { })
AppDispatchContext.displayName = 'AppDispatchContext'

const AppStateContext = React.createContext(initState)
AppStateContext.displayName = 'AppStateContext'

export { AppDispatchContext, AppStateContext }

function AppStateProvider({ children }) {
    // Use state ---------------------------------------------------------------
    const [state, dispatch] = React.useReducer(reducer, initState)

    // Main renderer ===========================================================
    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    )
}

AppStateProvider.propTypes = {
    children: PropTypes.any.isRequired,
}

export default AppStateProvider
