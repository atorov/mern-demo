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
    previewImage: {
        display: 'block',
        margin: '0 auto 8px auto',
    },
}))

function DialogAdd(props) {
    // Use state ---------------------------------------------------------------
    const [image, setImage] = React.useState(null)
    const [imageURL, setImageURL] = React.useState('')
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
        setImage(null)
        setImageURL('')
    }, [props.isOpened])

    // Update image
    React.useEffect(() => {
        if (image) {
            const fileReader = new FileReader()
            fileReader.onload = () => setImageURL(fileReader.result)
            fileReader.readAsDataURL(image)
        }
    }, [image])

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
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt="Preview"
                        className={classes.previewImage}
                    />
                ) : null}
                <label htmlFor="upload-image-button">
                    <Button
                        type="button"
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
                        // accept="image/*"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        className={classes.hiddenInput}
                        onChange={async (event) => {
                            if (event.target.files && event.target.files.length === 1) {
                                setImage(event.target.files[0])
                            }
                        }}
                    />
                </label>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={!title || !image}
                    size="small"
                    color="primary"
                    onClick={async () => {
                        const formData = new FormData()
                        formData.append('title', title)
                        formData.append('creatorId', params.uid)
                        formData.append('image', image)

                        try {
                            await myRequest(
                                'http://localhost:5000/api/pics',
                                {
                                    method: 'POST',
                                    body: formData,
                                    headers: {
                                        'Content-Type': ':SKIP:',
                                    },
                                },
                            )
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
