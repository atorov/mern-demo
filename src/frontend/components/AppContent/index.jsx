import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

import useMyRequest from '../../lib/hooks/my-request/use-my-request'
import gdv from '../../lib/utils/gdv'

import Routes from '../Routes'
import TopBar from '../TopBar'

import { AppStateContext } from '../App/AppStateProvider'
import { AuthStateContext } from '../App/AuthStateProvider'
import { XDataDispatchContext, XDataStateContext } from '../App/XDataStateProvider'

const useStyles = makeStyles((theme) => ({
    appMain: ({ topBarHeight }) => ({
        flexGrow: 1,
        marginTop: topBarHeight,
        paddingTop: 0,
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(3),
    }),
    appWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
}))

function AppContent() {
    console.log('--- --- ---')

    // Use context -------------------------------------------------------------
    const appState = React.useContext(AppStateContext)
    console.log('::: appState:', appState)

    const authState = React.useContext(AuthStateContext)
    console.log('::: authState:', authState)

    const xdataDispatch = React.useContext(XDataDispatchContext)
    const xdataState = React.useContext(XDataStateContext)
    console.log('::: xdataState:', xdataState)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles({ topBarHeight: appState.ui.topBar.height })

    // Use custom hook ---------------------------------------------------------
    const myRequest = useMyRequest()

    // Use state ---------------------------------------------------------------
    const [status, setStatus] = React.useState(':GET_STARTED:') // ':GET_STARTED:' | ':PENDING:' | ':ERROR:' | ':READY:'

    // Use effect --------------------------------------------------------------
    // Initialize
    React.useEffect(() => {
        if (status === ':GET_STARTED:') {
            setStatus(':PENDING:');

            (async () => {
                xdataDispatch({ type: ':xdataState/INIT:' })

                let xdata = null
                try {
                    xdata = (await myRequest.current('/mern-demo/xdata/index.json')).data
                }
                catch (reason) {
                    console.error('::: [fetch xdata] reason:', reason)
                    setStatus(':ERROR:')
                    throw reason
                }

                if (xdata) {
                    const xsettings = gdv(xdata, 'xsettings', {})

                    xdataDispatch({
                        type: ':xdataState/xsettings/SET:',
                        payload: xsettings,
                    })
                    xdataDispatch({
                        type: ':xdataState/status/SET:',
                        payload: ':READY:',
                    })
                }
            })()
        }
    }, [myRequest, status, xdataDispatch])

    // Update status
    React.useEffect(() => {
        if (status !== ':READY:' && xdataState.status === ':READY:') {
            setStatus(':READY:')
        }
    }, [status, xdataState.status])

    // Main renderer ===========================================================
    return (
        <BrowserRouter basename="/mern-demo">
            <div className={classes.appWrapper}>
                <TopBar />
                <main className={classes.appMain}>
                    {status === ':READY:' ? <Routes /> : <LinearProgress />}
                </main>
            </div>
        </BrowserRouter>
    )
}

export default AppContent
