const initalState = {
    msg: null
}



export function userMsgReducer(state = initalState, action = {}) {
    switch (action.type) {
        case 'SET_MSG':
            const msg = action.msg
            // console.log(msg)
            return { ...state,msg:msg }

        default:
            return { state }
    }


}