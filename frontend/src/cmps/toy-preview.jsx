
import { Link } from "react-router-dom"

export function ToyPreview({ toy, remove }) {
    return <div className="toy-preview">
        <div className="toy-img-container">
            <img src={toy.img} alt="" />
        </div>
        <h2 className='toy-name'>{toy.name}</h2>
        <p className="toy-price">${toy.price}</p>
        <div className="preview-buttons">
            <div onClick={() => remove(toy._id)} className='remove-toy-btn'></div>
            <Link to={`/toy/edit/${toy._id}`}>
                <div className='edit-toy-btn'></div>
            </Link>
            <Link to={`/toy/details/${toy._id}`}>
                <div className='details-toy-btn'></div>
            </Link>
        </div>
    </div>
}

