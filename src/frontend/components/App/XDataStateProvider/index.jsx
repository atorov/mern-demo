import React from 'react'
import PropTypes from 'prop-types'

import initState from './init-state'
import reducer from './reducer'

const XDataDispatchContext = React.createContext(() => { })
XDataDispatchContext.displayName = 'XDataDispatchContext'

const XDataStateContext = React.createContext(initState)
XDataStateContext.displayName = 'XDataStateContext'

export { XDataDispatchContext, XDataStateContext }

function XDataStateProvider({ children }) {
    // Use state ---------------------------------------------------------------
    const [state, dispatch] = React.useReducer(reducer, initState)

    // Main renderer ===========================================================
    return (
        <XDataDispatchContext.Provider value={dispatch}>
            <XDataStateContext.Provider value={state}>
                {children}
            </XDataStateContext.Provider>
        </XDataDispatchContext.Provider>
    )
}

XDataStateProvider.propTypes = {
    children: PropTypes.any.isRequired,
}

export default XDataStateProvider
