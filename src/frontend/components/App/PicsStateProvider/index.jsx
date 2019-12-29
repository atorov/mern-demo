import React from 'react'
import PropTypes from 'prop-types'

import initState from './init-state'
import reducer from './reducer'

const PicsDispatchContext = React.createContext(() => { })
PicsDispatchContext.displayName = 'PicsDispatchContext'

const PicsStateContext = React.createContext(initState)
PicsStateContext.displayName = 'PicsStateContext'

export { PicsDispatchContext, PicsStateContext }

function PicsStateProvider({ children }) {
    // Use state ---------------------------------------------------------------
    const [state, dispatch] = React.useReducer(reducer, initState)

    // Main renderer ===========================================================
    return (
        <PicsDispatchContext.Provider value={dispatch}>
            <PicsStateContext.Provider value={state}>
                {children}
            </PicsStateContext.Provider>
        </PicsDispatchContext.Provider>
    )
}

PicsStateProvider.propTypes = {
    children: PropTypes.any.isRequired,
}

export default PicsStateProvider
