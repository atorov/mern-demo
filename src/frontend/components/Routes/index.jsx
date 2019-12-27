import React from 'react'

import {
    Redirect,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom'

import ErrorBoundary from '../widgets/ErrorBoundary'
import Fallback from '../widgets/Fallback'
// import PrivateRoute from '../widgets/PrivateRoute'

// const CDashboard = React.lazy(() => import('../Dashboard'))
// const CSignIn = React.lazy(() => import('../SignIn'))
const CNewPlace = React.lazy(() => import('../NewPlace'))
const CUsers = React.lazy(() => import('../Users'))

function Routes() {
    // Use ref -----------------------------------------------------------------
    const unlistenRef = React.useRef()

    // Use React Router hook ---------------------------------------------------
    const history = useHistory()

    // Use ref -----------------------------------------------------------------
    React.useEffect(() => {
        unlistenRef.current = history.listen(() => window.scrollTo(0, 0))
        return () => unlistenRef.current()
    }, [history])

    // Main renderer ===========================================================
    return (
        <ErrorBoundary>
            <React.Suspense fallback={<Fallback />}>
                <Switch>
                    <Route path={['/', '/users']} exact>
                        <CUsers />
                    </Route>

                    <Route path="/places/new" exact>
                        <CNewPlace />
                    </Route>

                    {/* <Route path="/sign-in" exact>
                        <CSignIn />
                    </Route> */}

                    {/* <PrivateRoute path="/dashboard" exact PrivateComponent={CDashboard} /> */}

                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
        </ErrorBoundary>
    )
}

export default Routes
