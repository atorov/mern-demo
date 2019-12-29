import React from 'react'
import PropTypes from 'prop-types'

import initState from './init-state'
import reducer from './reducer'

const UsersDispatchContext = React.createContext(() => { })
UsersDispatchContext.displayName = 'UsersDispatchContext'

const UsersStateContext = React.createContext(initState)
UsersStateContext.displayName = 'UsersStateContext'

export { UsersDispatchContext, UsersStateContext }

function UsersStateProvider({ children }) {
    // Use state ---------------------------------------------------------------
    const [state, dispatch] = React.useReducer(reducer, initState)

    // Main renderer ===========================================================
    return (
        <UsersDispatchContext.Provider value={dispatch}>
            <UsersStateContext.Provider value={state}>
                {children}
            </UsersStateContext.Provider>
        </UsersDispatchContext.Provider>
    )
}

UsersStateProvider.propTypes = {
    children: PropTypes.any.isRequired,
}

export default UsersStateProvider
