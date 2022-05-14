
export function setMsg(msg) {
    console.log('action-msg',msg)

    return dispatch => {
        dispatch({
            type: 'SET_MSG',
            msg
        })
    }

}