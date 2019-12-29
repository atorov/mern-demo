import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // Init
        case ':picsState/INIT:':
            return { ...initState }

        // status
        case ':picsState/SET:':
            return { ...action.payload }

        // Do not match
        default:
            console.warn('::: [pics state provider/action not match]', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
