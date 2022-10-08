export const innValidation = (value: number): boolean => {
    const valueToString = value ? value.toString() : ''
    const getN = (index: number): number => (parseInt(valueToString[index], 10))
    if (valueToString.length === 12) {
        const dgt11 = ((
            7 * getN(0) + 2 * getN(1) + 4 * getN(2) +
            10 * getN(3) + 3 * getN(4) + 5 * getN(5) +
            9 * getN(6) + 4 * getN(7) + 6 * getN(8) +
            8 * getN(9)) % 11) % 10

        const dgt12 = ((
            3 * getN(0) + 7 * getN(1) + 2 * getN(2) +
            4 * getN(3) + 10 * getN(4) + 3 * getN(5) +
            5 * getN(6) + 9 * getN(7) + 4 * getN(8) +
            6 * getN(9) + 8 * getN(10)) % 11) % 10

        return (getN(10) === dgt11 && getN(11) === dgt12)
    }
    if (valueToString.length === 10) {
        const dgt10 = ((
            2 * getN(0) + 4 * getN(1) + 10 * getN(2) +
            3 * getN(3) + 5 * getN(4) + 9 * getN(5) +
            4 * getN(6) + 6 * getN(7) + 8 * getN(8)
        ) % 11) % 10
        return (getN(9) === dgt10)
    }
    return false
}