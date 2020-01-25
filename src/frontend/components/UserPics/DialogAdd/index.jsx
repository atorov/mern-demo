import React from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import useMyRequest from '../../../lib/hooks/my-request/use-my-request'

const useStyles = makeStyles(() => ({
    hiddenInput: {
        display: 'none',
    },
}))

function DialogAdd(props) {
    // Use state ---------------------------------------------------------------
    const [title, setTitle] = React.useState('')

    // Use Material UI hook ----------------------------------------------------
    const classes = useStyles()

    // Use React Router hook ---------------------------------------------------
    const params = useParams()

    // Use custom hook ---------------------------------------------------------
    const myRequest = useMyRequest()

    // Use effect --------------------------------------------------------------
    // Initialize and reinitialize
    React.useEffect(() => {
        setTitle('')
    }, [props.isOpened])

    // Main renderer ===========================================================
    return (
        <Dialog open={props.isOpened} onClose={props.handleClose}>
            <DialogTitle>Add Pic</DialogTitle>
            <DialogContent>
                <TextField
                    value={title}
                    label="Title"
                    autoFocus
                    fullWidth
                    onChange={(event) => setTitle(event.target.value)}
                />
                <br />
                <br />
                <label htmlFor="upload-image-button">
                    <Button
                        component="span"
                        color="primary"
                        variant="contained"
                        style={{ width: '100% ' }}
                    >
                        Select Image
                    </Button>
                    <input
                        id="upload-image-button"
                        type="file"
                        accept="image/*"
                        multiple
                        className={classes.hiddenInput}
                        onChange={(event) => console.log('::: TODO:', event.target.value)}
                    />
                </label>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button
                    disabled={!title} // TODO: image...
                    size="small"
                    color="primary"
                    onClick={async () => {
                        const data = {
                            title,
                            // image: ... // TODO:
                            meta: {
                                creatorId: params.uid,
                            },
                        }

                        try {
                            await myRequest('http://localhost:5000/api/pics', {
                                method: 'POST',
                                data,
                            })
                        }
                        catch (reason) {
                            console.error('::: [pic] Error:', reason)
                        }

                        props.handleClose()
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DialogAdd.propTypes = {
    isOpened: PropTypes.bool.isRequired,

    handleClose: PropTypes.func.isRequired,
}

export default DialogAdd
