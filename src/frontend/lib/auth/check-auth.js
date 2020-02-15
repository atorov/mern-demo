function checkAuth(authData = {}) {
    return !!authData.token
}

export default checkAuth
