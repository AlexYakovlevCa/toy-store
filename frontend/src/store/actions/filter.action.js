
export function setFilter(filterBy) {
    return dispatch => {
        dispatch({
            type: 'UPDATE_FILTER',
            filterBy
        })
        return Promise.resolve()
    }
}
