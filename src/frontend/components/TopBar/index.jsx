import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { AppStateContext } from '../App/AppStateProvider'

const useStyles = makeStyles((theme) => ({
    appBar: ({ topBarHeight }) => ({
        height: topBarHeight,
    }),
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
        padding: `0 ${theme.spacing(2)}px`,
        margin: `0 ${theme.spacing(2)}px 0 0`,
        borderRight: `0.5px solid ${theme.palette.grey['300']}`,
    }),
    logoTitle: {
        color: theme.palette.common.white,
    },
    navItem: {
        marginLeft: theme.spacing(4),
        color: theme.palette.common.white,
    },
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
    const appState = useContext(AppStateContext)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles({ topBarHeight: appState.ui.topBar.height })

    // Main renderer ===========================================================
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Container className={classes.container}>
                <div className={classes.section}>
                    <Link to="/" className={classes.link}>
                        <img
                            src="/mern-demo/img/logo.png"
                            alt="logo"
                            className={classes.logoImage}
                        />
                    </Link>
                    <Link to="/" className={classes.link}>
                        <Typography variant="h5" className={classes.logoTitle}>
                            Home
                        </Typography>
                    </Link>
                </div>
                <div className={classes.section}>
                    <Link to="/dashboard" className={classes.link}>
                        <Typography variant="subtitle1" className={classes.navItem}>
                            Dashboard
                        </Typography>
                    </Link>
                </div>
            </Container>
        </AppBar>
    )
}

export default TopBar
