import { toyService } from '../../services/toy.service.js'
import { setMsg } from './msg.action.js'
export function addToy(toyData, props) {
    return dispatch => {
        const actionType = toyData._id ? 'UPDATE_TOY' : 'ADD_TOY'
        return toyService.save(toyData).then(toy => {
            console.log(toy)
            dispatch({
                type: actionType,
                toy
            })
            
            return Promise.resolve()
        })
        .catch(()=>{
            setMsg({type:'danger',txt:'Faild to save'})

        })
    }


}
export function removeToy(toyId) {
    return dispatch => {
        return toyService.remove(toyId).then(() => {
            dispatch({
                type: 'REMOVE_TOY',
                toyId
            })
           return Promise.resolve()
        })
        .catch(()=>{
            setMsg({type:'danger',txt:'Faild to remove'})
        })
    }


}
export function loadToys(filterBy) {
    
    return dispatch => {
        return toyService.query(filterBy)
            .then(toys => {
                console.log(toys)
                dispatch({
                    type: 'SET_TOYS',
                    toys
                })
                
            })
            .catch((err)=>{
                console.log(err, 'happend in filter')
            })
    }
}

