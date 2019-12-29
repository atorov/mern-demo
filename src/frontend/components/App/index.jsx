import React from 'react'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppContent from '../AppContent'

import AppStateProvider from './AppStateProvider'
import AuthStateProvider from './AuthStateProvider'
import PicsStateProvider from './PicsStateProvider'
import UsersStateProvider from './UsersStateProvider'
import XDataStateProvider from './XDataStateProvider'


import './style.scss'

const appLoaderElement = document.querySelector('.app-loader')
appLoaderElement.parentNode.removeChild(appLoaderElement)

const theme = createMuiTheme({
    // palette: {
    //     primary: {
    //         main: '#...',
    //     },
    //     secondary: {
    //         main: '#...',
    //     },
    //     error: {
    //         main: '#...',
    //     },
    // },
    // typography: {},
})

function App() {
    // Main renderer ===========================================================
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <AppStateProvider>
                <AuthStateProvider>
                    <PicsStateProvider>
                        <UsersStateProvider>
                            <XDataStateProvider>
                                <AppContent />
                            </XDataStateProvider>
                        </UsersStateProvider>
                    </PicsStateProvider>
                </AuthStateProvider>
            </AppStateProvider>
        </MuiThemeProvider>
    )
}

export default App
