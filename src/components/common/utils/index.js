const utils = {
    getValue: (data, key) => {
        if (!data || !key) return null

        const all = key.split('.')

        let value = null
        let t
        while (((t = all.shift()), t)) {
            value = (value || data)[t]
        }

        return value
    }
}

export default utils
