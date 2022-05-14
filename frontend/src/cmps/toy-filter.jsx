import React from 'react'

import { toyService } from '../services/toy.service'


export class ToyFilter extends React.Component {
    state = {
        filterBy:{

            txt: '',
            labels: [],
            inStock: '',
            pageIdx: 0,
            sort: ''
        }
        ,
        isLabels:false

    }
    handleChange = ({ target: { selectedOptions, value, name } }) => {
        let currVal = value
        const field = name
        if (field === 'labels') currVal = Array.from(selectedOptions).map(option => option.value)
        this.setState((prevState => ({ ...prevState, filterBy:{...prevState.filterBy,[field]: currVal} })), () => {
        })

    }
    toggleLabels=(isClear)=>{
        

            const {isLabels}=this.state
            this.setState((prevState)=>({...prevState,isLabels:!isLabels}))
    }
    submitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }
    render() {
        const {isLabels} = this.state
        const { txt, labels } = this.state.filterBy
        const allLabels = toyService.getLabes()

        return <form onSubmit={this.submitFilter} className="toy-filter">

            <select name='inStock' onChange={this.handleChange} >

                <option name='inStock' value="">All</option>
                <option name='inStock' value='in-stock'>In stock</option>
                <option name='inStock' value='no-stock'>Out of stock</option>

            </select>
            <select name='sort' onChange={this.handleChange} >

                <option name='sort' value="name">name</option>
                <option name='sort' value='price'>price</option>
                <option name='sort' value='date'>Post date</option>

            </select>
            <div  onClick={()=>this.toggleLabels(true)} className="labels-contianer">
            <input type="text"  placeholder='Filter by labels' disabled className='disabeld-inp' value={labels.join(', ')} />
            {isLabels&&<React.Fragment>
              
            <select name='labels' className='filter-labels' multiple  onChange={this.handleChange} >
                {allLabels.map(label => <option key={label} value={label}>{label}</option>)}
            </select>
            <div onClick={()=>this.toggleLabels(false)} className='toggle-visable'></div>

</React.Fragment>
            }
            </div>
            <input onChange={this.handleChange}placeholder='Filter by text' type="text" name='txt' className="filter-txt-input" value={txt} />
            <button className='submit-btn btn-classic'>Sumbit</button>
          
        </form>


    }
}
