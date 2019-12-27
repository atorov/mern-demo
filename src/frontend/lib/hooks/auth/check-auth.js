function checkAuth(authData = {}) {
    return !!authData.access_token
}

export default checkAuth
