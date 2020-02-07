import React from 'react'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import { Alert, AlertTitle } from '@material-ui/lab'

import useMyRequest from '../../lib/hooks/my-request/use-my-request'

import { AuthStateContext } from '../App/AuthStateProvider'

import DialogAdd from './DialogAdd'
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
    const authState = React.useContext(AuthStateContext)

    // Use state ---------------------------------------------------------------
    const [error, setError] = React.useState('')
    const [isDialogOpened, setDialogOpened] = React.useState(false)
    const [status, setStatus] = React.useState(':INIT:') // ':INIT:' | ':PENDING:' | ':READY:'
    const [user, setUser] = React.useState({})
    const [userPics, setUserPics] = React.useState([])

    // Use React Router hook ---------------------------------------------------
    const params = useParams()

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Use custom hook ---------------------------------------------------------
    const myRequest = useMyRequest()

    // Use effect --------------------------------------------------------------
    // Initialize, reinitialize
    React.useEffect(() => {
        if (status === ':INIT:') {
            setStatus(':PENDING:');

            (async () => {
                let usersData
                try {
                    usersData = (await myRequest(`http://localhost:5000/api/users/${params.uid}`)).data
                }
                catch (reason) {
                    setError(reason)
                    console.error('::: [user] Error:', reason)
                }

                setUser(usersData)

                let userPicsData
                try {
                    userPicsData = (await myRequest(`http://localhost:5000/api/pics/user/${params.uid}`)).data
                }
                catch (reason) {
                    setError(reason)
                    console.error('::: [pics] Error:', reason)
                }

                setUserPics(userPicsData)
            })()

            setStatus(':READY:')
        }
    }, [myRequest, params.uid, status])

    // Main renderer ===========================================================
    return (
        <>
            <Container className={classes.root}>
                <Box className={classes.header}>
                    <Typography variant="h6">
                        {user.name}
                    </Typography>

                    {authState.userID === params.uid ? (
                        <Button
                            size="large"
                            color="primary"
                            style={{ display: 'block' }}
                            onClick={() => setDialogOpened(true)}
                        >
                            Add New
                        </Button>
                    ) : null}
                </Box>
                <Box>
                    {
                        userPics.length
                            ? (
                                <div className={classes.pics}>
                                    {userPics.map((pic) => (
                                        <PicItem
                                            key={pic.id}
                                            pic={pic}
                                            setStatus={setStatus}
                                        />
                                    ))}
                                </div>
                            )
                            : (
                                <Typography variant="h6" align="center">
                                    No pics found
                                </Typography>
                            )
                    }
                </Box>

                {error ? (
                    <Box className={classes.box} style={{ marginTop: 48 }}>
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    </Box>
                ) : null}
            </Container>

            <DialogAdd
                isOpened={isDialogOpened}
                handleClose={() => {
                    setDialogOpened(false)
                    setStatus(':INIT:');
                }}
            />
        </>
    )
}

export default UserPics
