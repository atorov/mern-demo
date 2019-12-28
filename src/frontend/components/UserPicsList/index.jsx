import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import UserPicItem from '../UserPicItem'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
}))

function UserPicsList(props) {
    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    return (
        <Box className={classes.root}>
            {
                props.pics.length
                    ? props.pics.map((pic) => <UserPicItem key={pic.id} pic={pic} />)
                    : (
                        <Typography variant="h6">
                            No pics found
                        </Typography>
                    )
            }
        </Box>
    )
}

UserPicsList.propTypes = {
    pics: PropTypes.array.isRequired,
}

export default UserPicsList
