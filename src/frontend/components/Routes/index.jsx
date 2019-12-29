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

const CAuth = React.lazy(() => import('../Auth'))
const CUserPics = React.lazy(() => import('../UserPics'))
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
                    <Route path="/sign-in" exact>
                        <CAuth />
                    </Route>

                    <PrivateRoute path={['/', '/users']} exact PrivateComponent={CUsers} />

                    <PrivateRoute path="/users/:uid/pics" exact PrivateComponent={CUserPics} />

                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
        </ErrorBoundary>
    )
}

export default Routes
