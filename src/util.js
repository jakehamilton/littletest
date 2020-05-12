const prettyArray = (array) => {
    const items = array.map(pretty);

    return `[${items.join(', ')}]`;
};

const prettyObject = (object) => {
    const entries = Object.entries(object);

    return `{ ${entries
        .map(([key, value]) => {
            return `${key}: ${pretty(value)}`;
        })
        .join(', ')} }`;
};

const pretty = (value) => {
    if (Array.isArray(value)) {
        return prettyArray(value);
    } else if (typeof value === 'object') {
        return prettyObject(value);
    } else {
        return value;
    }
};

const deepEqual = (x, y) => {
    if (Array.isArray(x)) {
        if (!Array.isArray(y)) {
            return false;
        }

        if (x.length !== y.length) {
            return false;
        }

        for (let i = 0; i < x.length; i++) {
            const isEqual = deepEqual(x[i], y[i]);

            if (!isEqual) {
                return false;
            }
        }

        return true;
    }

    if (typeof x === 'object') {
        const keys = Object.keys(x);

        if (keys.length !== Object.keys(y).length) {
            return false;
        }

        for (const key of keys) {
            const isEqual = deepEqual(x[key], y[key]);

            if (!isEqual) {
                return false;
            }
        }

        return true;
    }

    return x === y;
};

module.exports = {
    pretty,
    deepEqual,
};
