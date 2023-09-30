import {Link} from 'react-router-dom'

import './index.css'

const HomeCardDetails = props => {
  const {homeDetails} = props
  const {name, logoUrl, id} = homeDetails

  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list-container">
        <img src={logoUrl} alt={name} className="logo-url" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default HomeCardDetails
