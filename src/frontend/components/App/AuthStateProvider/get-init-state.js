import initState from './init-state'
import loadState from './load-state'

function getInitState() {
    const savedState = loadState('mern-demo')

    return { ...initState, ...savedState }
}

export default getInitState
