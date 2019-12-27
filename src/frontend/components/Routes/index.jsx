import React from 'react'

import {
    Redirect,
    Route,
    Switch,
    useHistory,
} from 'react-router-dom'

import ErrorBoundary from '../widgets/ErrorBoundary'
import Fallback from '../widgets/Fallback'
import PrivateRoute from '../widgets/PrivateRoute'

const CDashboard = React.lazy(() => import('../Dashboard'))
const CHome = React.lazy(() => import('../Home'))
const CSignIn = React.lazy(() => import('../SignIn'))

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
                    <Route path={['/', '/home']} exact>
                        <CHome />
                    </Route>

                    <Route path="/sign-in" exact>
                        <CSignIn />
                    </Route>

                    <PrivateRoute path="/dashboard" exact PrivateComponent={CDashboard} />

                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
        </ErrorBoundary>
    )
}

export default Routes
