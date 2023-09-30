import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png "
        alt="not found"
        className="notfound-image"
      />
      <h1 className="notfound-heading">Page Not found</h1>
      <p className="notfound-description">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
