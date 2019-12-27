import initState from './init-state'

export default function (state, action) {
    switch (action.type) {
        // Init
        case ':xdataState/INIT:':
            return { ...initState }

        // status
        case ':xdataState/status/SET:':
            return {
                ...state,
                status: action.payload,
            }

        // xsettings
        case ':xdataState/xsettings/PATCH:':
            return {
                ...state,
                xdata: {
                    ...state.xdata,
                    xsettings: {
                        ...state.xdata.xsettings,
                        ...action.payload,
                    },
                },
            }

        case ':xdataState/xsettings/RESET:':
            return {
                ...state,
                xdata: {
                    ...state.xdata,
                    xsettings: initState.xdata.xsettings,
                },
            }

        case ':xdataState/xsettings/SET:':
            return {
                ...state,
                xdata: {
                    ...state.xdata,
                    xsettings: action.payload,
                },
            }

        // Do not match
        default:
            console.warn('::: [xdata state provider/action not match]', action.type)
            throw new Error('Action type does not match!')
        // return state
    }
}
