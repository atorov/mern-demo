import React from 'react'

import { NavLink, Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import useAuth from '../../lib/hooks/auth/use-auth'

import { AppStateContext } from '../App/AppStateProvider'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },
    link: {
        textDecoration: 'none',
    },
    logoImage: ({ topBarHeight }) => ({
        height: topBarHeight - 10,
        padding: 0,
        paddingRight: theme.spacing(2),
        margin: 0,
        marginRight: theme.spacing(2),
        borderRight: `0.5px solid ${theme.palette.grey[600]}`,
    }),
    logoTitle: {
        color: theme.palette.common.white,
    },
    navItem: {
        marginLeft: theme.spacing(4),
        color: theme.palette.common.white,
    },
    root: ({ topBarHeight }) => ({
        height: topBarHeight,
    }),
    section: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        width: 'fit-content',
        height: '100%',
    },
}))

function TopBar() {
    // Use context -------------------------------------------------------------
    const appState = React.useContext(AppStateContext)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles({ topBarHeight: appState.ui.topBar.height })

    // Use custom hook ---------------------------------------------------------
    const [isAuth, auth] = useAuth()

    // Main renderer ===========================================================
    return (
        <AppBar position="fixed" className={classes.root}>
            <Container className={classes.container}>
                <div className={classes.section}>
                    <Link to="/" className={classes.link}>
                        <img
                            src="/mern-demo/img/logo.png"
                            alt="logo"
                            className={classes.logoImage}
                        />
                    </Link>
                    <NavLink to="/" exact className={classes.link}>
                        <Typography variant="h5" className={classes.logoTitle}>
                            Home
                        </Typography>
                    </NavLink>
                </div>
                <div className={classes.section}>
                    {
                        isAuth
                            ? (
                                <Typography
                                    variant="subtitle1"
                                    className={classes.navItem}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => auth(false)}
                                >
                                    Sign out
                                </Typography>
                            )
                            : (
                                <>
                                    <NavLink to="/auth" exact className={classes.link}>
                                        <Typography variant="subtitle1" className={classes.navItem}>
                                            Sign in
                                        </Typography>
                                    </NavLink>
                                    <NavLink to="/sign-up" exact className={classes.link}>
                                        <Typography variant="subtitle1" className={classes.navItem}>
                                            Sign up
                                        </Typography>
                                    </NavLink>
                                </>
                            )
                    }
                </div>
            </Container>
        </AppBar>
    )
}

export default TopBar
