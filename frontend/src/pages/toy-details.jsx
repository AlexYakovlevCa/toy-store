import React from 'react'
import { Link } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import defaultImg from '../assests/style/imgs/toy-2.png'


export class ToyDetails extends React.Component {
    state = {

    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        toyService.getById(toyId).then((toy) => {
            this.setState({ toy })
        })
    }

    render() {

        const { toy } = this.state
        if (!toy) return <React.Fragment></React.Fragment>
        return <div className="toy-details">
            <div className="details-img">
                <img src={defaultImg} alt="" />
            </div>
            <h2 className="toy-name-details">{toy.name}</h2>
            <h3 className="toy-price-details">{toy.price}</h3>
            <p className="toy-details-labels">{toy.labels.join(',')}</p>
            <p className="toy-date">${utilService.dateToString(toy.createdAt)}</p>

            <span className="toy-stock">{toy.inStock ? 'In stock' : 'Out of stock'}</span>
            <Link to='/toy'>
                <button className="go-back-btn">Go back</button>
            </Link>

        </div>


    }
}
