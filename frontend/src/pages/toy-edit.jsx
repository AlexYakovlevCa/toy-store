import React from 'react'
import { connect } from 'react-redux'
import { addToy } from '../store/actions/toy.action.js'

import { toyService } from '../services/toy.service.js'
import { setMsg } from '../store/actions/msg.action.js'

export class _ToyEdit extends React.Component {

    state = {
        toy: {
            img: "",
            inStock: true,
            labels: [],
            name: '',
            price: '',
            // _id: "nMkKCW"
        }

    }
    componentDidMount() {
        const { toyId } = this.props.match.params
        if (toyId) {

            toyService.getById(toyId).then((toy) => {
                this.setState({ toy })
            })
        }
        const allLabels = toyService.getLabes()
        this.setState({ ...this.state, allLabels })
    }
    handleLableChange = ({ target: { value } }) => {
        let labels = [...this.state.toy.labels]
        if (labels.includes(value)) {
            labels = labels.filter(label => {
                return label !== value
            })
        } else {
            labels.push(value)
        }
        this.setState({ ...this.state, toy: { ...this.state.toy, labels } })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        const { inStock } = this.state.toy
        if (field === 'stock') {
            this.setState({ ...this.state, toy: { ...this.state.toy, inStock: !inStock } })
        } else {
            this.setState({ ...this.state, toy: { ...this.state.toy, [field]: value } })

        }

    }
    submitToy = (ev) => {
        ev.preventDefault()
        this.props.addToy(this.state.toy, this.props).then(() => {

            this.props.history.push('/toy')
            this.props.setMsg({ type: 'success', txt: 'Toy saved' })
        })


    }

    render() {
        const { toy, allLabels } = this.state
        const { img } = toy
        if (!allLabels) return <React.Fragment></React.Fragment>
        return (
            <form onSubmit={this.submitToy} className="toy-edit">
                <div className="edit-img">
                    <img src={img} alt="" />
                </div>
                <label >
                    <input type="checkbox" checked={toy.inStock} onChange={this.handleChange} className='toy-stock-checkbox' name="stock" />
                    in Stock?
                </label>
                <label >
                    Name:
                    <input type="text" name='name' onChange={this.handleChange} value={toy.name} />
                </label>
                {/* <div style={{ backgroundImage:toy.img}} className="img-toy"></div> */}
                <div className="edit-labels">
                    {allLabels.map(label => <label key={label} > <input type='checkbox' onChange={this.handleLableChange} checked={toy.labels.includes(label)} value={label} /> {label}</label>)}
                </div>
                <input type="text" name='img' onChange={this.handleChange} value={img} />

                <button className="submit-toy-form">Submit</button>
            </form>
        )
    }

}
const mapStateToProps = (storeState) => {
    return {

    }
}
const mapDispatchToProps = {
    addToy,
    setMsg
}

export const ToyEdit = connect(
    mapStateToProps, mapDispatchToProps
)(_ToyEdit)
