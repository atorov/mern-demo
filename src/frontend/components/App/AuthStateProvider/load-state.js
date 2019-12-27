function loadState(itemKey = 'sample-app') {
    let saved = {}
    try {
        const serialized = sessionStorage.getItem(itemKey)
        if (serialized) {
            saved = JSON.parse(serialized)
        }
    }
    catch (reason) {
        console.error('::: [load auth state] reason:', reason)
    }

    return saved
}

export default loadState
