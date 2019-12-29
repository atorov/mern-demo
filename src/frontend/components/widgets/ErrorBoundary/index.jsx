import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'

import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error,
        }
    }

    async componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.error('::: Error:', error, info)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Container>
                    <Typography variant="h3" className={this.props.classes.title}>
                        Something went wrong!
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom className={this.props.classes.subtitle}>
                        Please try again later or contact support
                    </Typography>
                    <Divider />
                    <Typography variant="body1" className={this.props.classes.error}>
                        {'' + this.state.error}
                    </Typography>
                </Container>
            )
        }

        return this.props.children
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles((theme) => ({
    error: {
        color: theme.palette.error.main,
    },
    subtitle: {
        color: theme.palette.error.dark,
    },
    title: {
        marginTop: theme.spacing(6),
        color: theme.palette.error.dark,
    },
}))(ErrorBoundary)
