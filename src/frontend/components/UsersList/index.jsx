import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import UserItem from '../UserItem'

const useStyles = makeStyles(() => ({
    root: {
        // display: 'flex',
        // flexDirection: 'column',
        // margin: `${theme.spacing(12)}px 0 0 0`,
    },
}))

function UsersList(props) {
    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <Box className={classes.root}>
            {props.users.length
                ? (
                    <List component="nav" aria-label="secondary mailbox folders">
                        {props.users.map((user) => <UserItem key={user.id} user={user} />)}
                    </List>
                )
                : (
                    <Typography variant="h6">
                        No users found
                    </Typography>
                )}
        </Box>
    )
}

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
}

export default UsersList
