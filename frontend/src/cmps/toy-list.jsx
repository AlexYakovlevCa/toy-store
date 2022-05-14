import { ToyPreview } from './toy-preview.jsx'



export function ToyList({ onRemove, toys }) {

    return <div className="toy-list">
        {toys.map(toy => <ToyPreview key={toy._id} toy={toy} remove={onRemove} />)}
    </div>

}