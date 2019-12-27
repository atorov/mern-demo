import initState from './init-state'

function reducer(state, action) {
    switch (action.type) {
        // Init
        case ':authState/INIT:':
            return { ...initState }

            // General
        case ':authState/PATCH:':
            return {
                ...state,
                ...action.payload,
            }

        // Do not match
        default:
            console.warn('::: [auth state provider/action not match]', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}

export default reducer
