import './loader.scss'
import gifLoader from '../../assets/Running Man.gif'

const Loader = () => {
  return (
    <div id="loading-bar-spinner" className="spinner">

        <img src={gifLoader} alt="Failed to load image" />
      
    </div>
  )
}

export default Loader
