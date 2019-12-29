import React from 'react'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { PicsStateContext } from '../App/PicsStateProvider'
import { UsersStateContext } from '../App/UsersStateProvider'

import PicItem from './PicItem'

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pics: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    root: {
        margin: `${theme.spacing(4)}px 0 0 0`,
    },
}))

function UserPics() {
    // Use context -------------------------------------------------------------
    const picsState = React.useContext(PicsStateContext)

    const usersState = React.useContext(UsersStateContext)

    // Use React Router hook ---------------------------------------------------
    const params = useParams()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Main renderer ===========================================================
    const pics = picsState.data.filter((pic) => pic.meta.creator === params.uid)

    return (
        <Container className={classes.root}>
            <Box className={classes.header}>
                <Typography variant="h6">
                    {(() => {
                        const selectedUser = usersState.data.find((user) => user.id === params.uid) || {}
                        return selectedUser.name
                    })()}
                </Typography>
                <Button size="large" color="primary" style={{ display: 'block' }}>
                    Add New
                </Button>
            </Box>
            <Box>
                {
                    pics.length
                        ? (
                            <div className={classes.pics}>
                                {pics.map((pic) => <PicItem key={pic.id} pic={pic} />)}
                            </div>
                        )
                        : (
                            <Typography variant="h6" align="center">
                                No pics found
                            </Typography>
                        )
                }
            </Box>
        </Container>
    )
}

export default UserPics
