import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'

import { removeToy, loadToys } from '../store/actions/toy.action.js'
import { setFilter } from '../store/actions/filter.action'
import { setMsg } from '../store/actions/msg.action'


class _ToyApp extends React.Component {
    componentDidMount() {
        this.onLoadToys()
    }
    componentDidUpdate() {
        // const loggedInUser = this.props.user
        // if (!loggedInUser) this.props.history.push('/')
    }
    onLoadToys = () => {
        this.props.loadToys(this.props.filterBy)
    }
    onRemove = (toyId) => {
        this.props.removeToy(toyId).then(() => {

            this.props.setMsg({ type: 'success', txt: 'Toy removed' })
        })

    }

    onSetFilter = (filterBy) => {
        this.props.setFilter(filterBy).then(() => this.onLoadToys())

    }

    render() {
        const { toys } = this.props
        if (!toys) return <React.Fragment></React.Fragment>
        return (
            <div className="toy-app">
                <ToyFilter onSetFilter={this.onSetFilter} />
                <Link to='/toy/edit'>
                    <button className='add-toy-btn btn-classic'>Add a toy</button>
                </Link>
                <ToyList toys={toys} onRemove={this.onRemove} />

            </div>
        )
    }
}


const mapStateToProps = (storeState) => {
    return {
        // user: storeState.userModule.user,
        toys: storeState.toyModule.toys,
        filterBy: storeState.filterModule.filterBy

    }
}
const mapDispatchToProps = {
    removeToy,
    loadToys,
    setFilter,
    setMsg
    // addToy,
}

export const ToyApp = connect(
    mapStateToProps, mapDispatchToProps
)(_ToyApp)