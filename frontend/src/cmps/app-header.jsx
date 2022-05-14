import React from 'react'
import { NavLink , Link} from 'react-router-dom'



export class AppHeader extends React.Component {



    render() {
        return (
            <div className="app-header">
                <Link to='/' >
               <div className="logo">Logo</div>
                </Link>
               <nav>
                   <NavLink exact to='/'>Home</NavLink>
                   <NavLink to='/about' >About</NavLink>
                   <NavLink to='/toy' >Toys</NavLink>
               </nav>
            </div>
        )
    }
}