import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

import useMyRequest from '../../../../lib/hooks/my-request/use-my-request'

function DialogEdit(props) {
    // Use state ---------------------------------------------------------------
    const [title, setTitle] = React.useState('')

    // Use custom hook ---------------------------------------------------------
    const myRequest = useMyRequest()

    // Use effect --------------------------------------------------------------
    // Initialize and reinitialize
    React.useEffect(() => {
        setTitle(props.pic.title)
    }, [props.isOpened, props.pic.title])

    // Main renderer ===========================================================
    return (
        <Dialog open={props.isOpened} onClose={props.handleClose}>
            <DialogTitle>Edit Pic</DialogTitle>
            <DialogContent>
                <TextField
                    value={title}
                    label="Title"
                    autoFocus
                    fullWidth
                    onChange={(event) => setTitle(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button
                    disabled={!title}
                    size="small"
                    color="primary"
                    onClick={async () => {
                        const data = {
                            ...props.pic,
                            title,
                        }

                        try {
                            await myRequest(`${BACKEND_API_BASE_URL}/pics/${props.pic.id}`, {
                                method: 'PATCH',
                                data,
                            })
                        }
                        catch (reason) {
                            console.error('::: [pic] Error:', reason)
                        }

                        props.handleClose()
                    }}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DialogEdit.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    pic: PropTypes.object.isRequired,

    handleClose: PropTypes.func.isRequired,
}

export default DialogEdit
