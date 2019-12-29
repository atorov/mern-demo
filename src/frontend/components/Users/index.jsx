import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import { UsersStateContext } from '../App/UsersStateProvider'

import UserItem from './UserItem'

const useStyles = makeStyles((theme) => ({
    box: {},
    list: {
        maxWidth: 480,
        margin: 'auto',
    },
    root: {
        margin: `${theme.spacing(4)}px 0 0 0`,
    },
}))

function Users() {
    // Use context -------------------------------------------------------------
    const usersState = React.useContext(UsersStateContext)

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <Container className={classes.root}>
            <Box className={classes.box}>
                {
                    usersState.data.length
                        ? (
                            <List component="nav" className={classes.list}>
                                {usersState.data.map((user) => <UserItem key={user.id} user={user} />)}
                            </List>
                        )
                        : (
                            <Typography variant="h6" align="center">
                                No users found
                            </Typography>
                        )
                }
            </Box>
        </Container>
    )
}

export default Users
