import React from 'react'

function useDebounce(
    value,
    {
        delay = 550,
        initStatus = '',
    } = {},
) {
    const [debouncedValue, setDebouncedValue] = React.useState(value)
    const [debouncedValueStatus, setDebouncedValueStatus] = React.useState(initStatus)

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
            setDebouncedValueStatus(':READY:')
        }, delay)

        return () => {
            clearTimeout(handler)
            setDebouncedValueStatus(':PENDING:')
        }
    }, [delay, value])

    return [debouncedValueStatus, debouncedValue]
}

export default useDebounce
