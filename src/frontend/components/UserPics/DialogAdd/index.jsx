import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

function DialogAdd(props) {
    // Use state ---------------------------------------------------------------
    const [title, setTitle] = React.useState('')

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
                <TextField
                    // value={...} TODO:
                    label="Image"
                    autoFocus
                    fullWidth
                // onChange={(event) => setTitle(event.target.value)} // TODO:
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button
                    disabled={!title} // TODO: image...
                    size="small"
                    color="primary"
                    onClick={() => {
                        props.handleClose()
                    }}
                >
                    Update
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
