import React from 'react'

import { BrowserRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

// import LinearProgress from '@material-ui/core/LinearProgress'

// import useMyRequest from '../../lib/hooks/my-request/use-my-request'
// import delay from '../../lib/utils/delay'
// import gdv from '../../lib/utils/gdv'

import Routes from '../Routes'
import TopBar from '../TopBar'

import { AppStateContext } from '../App/AppStateProvider'
import { AuthStateContext } from '../App/AuthStateProvider'
// import { PicsDispatchContext, PicsStateContext } from '../App/PicsStateProvider'
// import { UsersDispatchContext, UsersStateContext } from '../App/UsersStateProvider'
// import { XDataDispatchContext, XDataStateContext } from '../App/XDataStateProvider'

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
    console.log('--- --- ---')

    // Use context -------------------------------------------------------------
    const appState = React.useContext(AppStateContext)
    console.log('::: appState:', appState)

    const authState = React.useContext(AuthStateContext)
    console.log('::: authState:', authState)

    // const xdataDispatch = React.useContext(XDataDispatchContext)
    // const xdataState = React.useContext(XDataStateContext)
    // console.log('::: xdataState:', xdataState)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles({ topBarHeight: appState.ui.topBar.height })

    // Use custom hook ---------------------------------------------------------
    // const myRequest = useMyRequest()

    // Use state ---------------------------------------------------------------
    // const [status, setStatus] = React.useState(':GET_STARTED:') // ':GET_STARTED:' | ':PENDING:' | ':ERROR:' | ':READY:'

    // Use effect --------------------------------------------------------------
    // Initialize
    // React.useEffect(() => {
    //     if (status === ':GET_STARTED:') {
    //         setStatus(':PENDING:');

    //         (async () => {
    //             xdataDispatch({ type: ':xdataState/INIT:' })

    //             let xdata = null
    //             try {
    //                 xdata = (await myRequest('/mern-demo/xdata/index.json')).data
    //             }
    //             catch (reason) {
    //                 console.error('::: [fetch xdata] reason:', reason)
    //                 setStatus(':ERROR:')
    //                 throw reason
    //             }

    //             if (xdata) {
    //                 const xsettings = gdv(xdata, 'xsettings', {})

    //                 xdataDispatch({
    //                     type: ':xdataState/xsettings/SET:',
    //                     payload: xsettings,
    //                 })
    //                 xdataDispatch({
    //                     type: ':xdataState/status/SET:',
    //                     payload: ':READY:',
    //                 })
    //             }
    //         })()
    //     }
    // }, [myRequest, status, xdataDispatch])

    // Fetch users
    // React.useEffect(() => {
    //     if (xdataState.status === ':READY:' && usersState.status === ':GET_STARTED:') {
    //         usersDispatch({
    //             type: ':usersState/SET:',
    //             payload: {
    //                 ...usersState,
    //                 status: ':PENDING:',
    //             },
    //         });

    //         (async () => {
    //             await delay(255) // TODO:

    //             await usersDispatch({
    //                 type: ':usersState/SET:',
    //                 payload: {
    //                     ...usersState,
    //                     status: ':READY:',
    //                     data: [
    //                         {
    //                             id: 'uid-1',
    //                             name: 'Robert Doe',
    //                             pics: 3,
    //                         },
    //                         {
    //                             id: 'uid-2',
    //                             name: 'Darwin',
    //                             pics: 0,
    //                         },
    //                         {
    //                             id: 'uid-3',
    //                             name: 'Jane Doe',
    //                             pics: 1,
    //                         },
    //                     ],
    //                 },
    //             })
    //         })()
    //     }
    // }, [usersDispatch, usersState, xdataState.status])

    // Fetch pics
    // React.useEffect(() => {
    //     if (usersState.status === ':READY:' && picsState.status === ':GET_STARTED:') {
    //         picsDispatch({
    //             type: ':picsState/SET:',
    //             payload: {
    //                 ...picsState,
    //                 status: ':PENDING:',
    //             },
    //         });

    //         (async () => {
    //             await delay(255) // TODO:

    //             await picsDispatch({
    //                 type: ':picsState/SET:',
    //                 payload: {
    //                     ...picsState,
    //                     status: ':READY:',
    //                     data: [
    //                         {
    //                             id: 'p1',
    //                             title: 'Empire State Building',
    //                             image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //                             meta: {
    //                                 creatorID: 'uid-1',
    //                             },
    //                         },
    //                         {
    //                             id: 'p2',
    //                             title: 'Bridge',
    //                             image: 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //                             meta: {
    //                                 creatorID: 'uid-3',
    //                             },
    //                         },
    //                         {
    //                             id: 'p3',
    //                             title: 'Plane',
    //                             image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //                             meta: {
    //                                 creatorID: 'uid-1',
    //                             },
    //                         },
    //                         {
    //                             id: 'p4',
    //                             title: 'Plane #2',
    //                             image: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    //                             meta: {
    //                                 creatorID: 'uid-1',
    //                             },
    //                         },
    //                         {
    //                             id: 'p6',
    //                             title: 'Paper Map',
    //                             image: 'https://images.pexels.com/photos/2678301/pexels-photo-2678301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //                             meta: {
    //                                 creatorID: 'uid-1',
    //                             },
    //                         },
    //                     ],
    //                 },
    //             })
    //         })()
    //     }
    // }, [picsDispatch, picsState, usersState.status])

    // Update status
    // React.useEffect(() => {
    //     if (
    //         status !== ':READY:'
    //         && xdataState.status === ':READY:'
    //         && usersState.status === ':READY:'
    //         && picsState.status === ':READY:'
    //     ) {
    //         setStatus(':READY:')
    //     }
    // }, [picsState.status, status, usersState.status, xdataState.status])

    // Main renderer ===========================================================
    return (
        <BrowserRouter basename="/mern-demo">
            <div className={classes.appWrapper}>
                <TopBar />
                <main className={classes.appMain}>
                    {/* TODO: {status === ':READY:' ? <Routes /> : <LinearProgress style={{ width: '100%' }} />} */}
                    <Routes />
                </main>
            </div>
        </BrowserRouter>
    )
}

export default AppContent
