import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // Init
        case ':appState/INIT:':
            return { ...initState }

        // status
        case ':appState/status/SET:':
            return {
                ...state,
                status: action.payload,
            }

        // Do not match
        default:
            console.warn('::: [app state provider/action not match]', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
