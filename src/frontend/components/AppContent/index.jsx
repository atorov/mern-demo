import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import jwt from 'jsonwebtoken'

import { makeStyles } from '@material-ui/core/styles'

import LinearProgress from '@material-ui/core/LinearProgress'

import useAuth from '../../lib/hooks/auth/use-auth'
import useMyRequest from '../../lib/hooks/my-request/use-my-request'
import gdv from '../../lib/utils/gdv'

import Routes from '../Routes'
import TopBar from '../TopBar'

import { AppStateContext } from '../App/AppStateProvider'
import { AuthStateContext } from '../App/AuthStateProvider'
import { XDataDispatchContext, XDataStateContext } from '../App/XDataStateProvider'

let logoutTimer

const useStyles = makeStyles((theme) => ({
    appMain: ({ topBarHeight }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: topBarHeight,
        paddingTop: 0,
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(3),
    }),
    appWrapper: {},
}))

function AppContent() {
    // Use context -------------------------------------------------------------
    const appState = React.useContext(AppStateContext)
    // console.log('::: appState:', appState)

    const authState = React.useContext(AuthStateContext)
    // console.log('::: authState:', authState)

    const xdataDispatch = React.useContext(XDataDispatchContext)
    const xdataState = React.useContext(XDataStateContext)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles({ topBarHeight: appState.ui.topBar.height })

    // Use custom hook ---------------------------------------------------------
    const [isAuth, auth] = useAuth()
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
                    xdata = (await myRequest('/mern-demo/xdata/index.json')).data
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

    // Managing the token expiration data
    React.useEffect(() => {
        if (status === ':READY:' && isAuth) {
            let exp
            let iat
            try {
                exp = jwt.decode(authState.token).exp
                iat = jwt.decode(authState.token).iat
            }
            catch (reason) {
                console.warn('::: [decode token] Error:', reason)
            }

            clearInterval(logoutTimer)

            if (!iat || +exp <= +iat || +exp < Date.now() / 1000) {
                auth(false)
            }
            else {
                logoutTimer = setTimeout(() => auth(false), (+exp - iat) * 1000)
            }
        }
    }, [auth, authState.token, isAuth, status])

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
                    {status === ':READY:' ? <Routes /> : <LinearProgress style={{ width: '100%' }} />}
                </main>
            </div>
        </BrowserRouter>
    )
}

export default AppContent
