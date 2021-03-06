async function request(resource = '', init, custom) {
    const {
        method = 'GET',
        headers = {},
        data,
        body,
        mode = 'cors', // no-cors, cors, *same-origin
        // credentials: 'same-origin', // include, *same-origin, omit
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
    } = init || {}

    const {
        cb = () => { },
        dispatch = () => { },
        state = {},
    } = custom || {}

    let payload
    if (!['OPTIONS', 'GET', 'HEAD'].includes(method.toUpperCase())) {
        if (body) payload = body
        else if (data) payload = JSON.stringify(data)
    }

    // console.log('::: >>> request:', { resource, method, payload: body || data })

    const combinedHeaders = {
        Authorization: headers.Authorization || state.token || '',
        'Content-Type': headers['Content-Type'] || 'application/json',
        ...headers,
    }
    if (!combinedHeaders.Authorization || combinedHeaders.Authorization === ':SKIP:') {
        delete combinedHeaders.Authorization
    }
    else {
        combinedHeaders.Authorization = 'Bearer ' + combinedHeaders.Authorization
    }
    if (combinedHeaders['Content-Type'] === ':SKIP:') {
        delete combinedHeaders['Content-Type']
    }

    let response
    try {
        response = await fetch(resource, {
            method,
            headers: combinedHeaders,
            body: payload,
            mode,
        })
    }
    catch (reason) {
        console.error('::: [request/fetch] reason:', reason)
        throw reason
    }

    if (response.status === 401) {
        dispatch({ type: ':authState/INIT:' })
    }

    if (response.status < 200 || response.status >= 300) {
        console.error('::: [request/status] reason.status:', response.status)
        console.error('::: [request/status] reason.statusText:', response.statusText)
        const responseJSON = await response.json()
        console.error('::: [request/status] response:', responseJSON)
        throw responseJSON.message || 'Something went wrong! Try again latter!'
    }

    let responseData
    try {
        if (combinedHeaders['Content-Type'] === 'application/json') {
            responseData = await response.json()
        }
        // else if ...
    }
    catch (reason) {
        console.error('::: [request/parse] reason:', reason)
        throw reason
    }

    cb(response, responseData)

    return {
        response,
        data: responseData,
    }
}

export default request
