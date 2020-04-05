function encode(n) {
    n = Number(n);
    if (isNaN(n)) throw new Error("input is NaN");

    if (Math.floor(n) !== n) throw new Error("input must be an integer");

    if (n < 0) throw new Error("input must be positive");

    let result = "";
    do {
        const x = n % 36;
        result = (x < 10 ? x.toString() : String.fromCharCode(55 + x)) + result;
        n = Math.floor(n / 36);
    } while (n > 0);
    return result;
}

function decode(s) {
    if (typeof s !== "string") {
        throw new Error("input must be a string");
    }

    s = s.toUpperCase();

    let result = 0;
    for (let i = 0, len = s.length; i < len; i++) {
        const c = s.charCodeAt(i);
        const x = c < 65 ? c - 48 : c - 55;
        result += Math.pow(36, len - i - 1) * x;
        if (result > Number.MAX_SAFE_INTEGER) {
            throw new RangeError("Can't decode string, exceeds Number.MAX_SAFE_INTEGER");
        }
    }
    return result;
}

module.exports = { 
    encode,
    decode,
}