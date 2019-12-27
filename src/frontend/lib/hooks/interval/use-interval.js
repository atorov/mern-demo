import React from 'react'

function useInterval(callback, delay) {
    // Use ref -----------------------------------------------------------------
    const savedCallbackRef = React.useRef(null)

    // Use effect --------------------------------------------------------------
    // Remember the latest callback
    React.useEffect(() => {
        savedCallbackRef.current = callback;
    }, [callback])

    // Set up the interval
    React.useEffect(() => {
        if (delay !== null) {
            const intervalID = setInterval(() => savedCallbackRef.current(), delay)
            return () => clearInterval(intervalID);
        }

        return null
    }, [delay])
}

export default useInterval
