import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // Init
        case ':usersState/INIT:':
            return { ...initState }

        // status
        case ':usersState/SET:':
            return { ...action.payload }

        // Do not match
        default:
            console.warn('::: [users state provider/action not match]', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
