import React from 'react'
import { connect } from 'react-redux'
import { setMsg } from '../store/actions/msg.action'


export class _UserMsg extends React.Component {

    msgTime
    componentDidMount() {
        // this.clearMsg()
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.msgTime) clearTimeout(this.msgTime)
        this.clearMsg()
    }
    clearMsg = () => {
        this.msgTime = setTimeout(() => {
            this.props.setMsg(null)
            clearTimeout(this.msgTime)
        }, 2000)
    }

    componentWillUnmount() {
        clearTimeout(this.msgTime)
    }




    render() {
        const { msg } = this.props
        if (!msg) return <React.Fragment></React.Fragment>
        return <section className={`user-msg ${msg.type}`}>
            <span>{msg.txt}</span>
            <button onClick={() => this.props.setMsg(null)}></button>
        </section>
    }





}
function mapStateToProps({ userMsgModule }) {
    return {
        msg: userMsgModule.msg

    }
}
const mapDispatchToProps = {
    setMsg

}
export const UserMsg = connect(mapStateToProps, mapDispatchToProps)(_UserMsg)

