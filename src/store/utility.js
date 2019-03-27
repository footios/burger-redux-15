export const updateObject = (state, values) => {
    return {
        ...state,
        ...values
    }
}