import './index.css'

const CoursesDetailsCard = props => {
  const {coursesDetailsList} = props
  const {name, description, imageUrl} = coursesDetailsList

  return (
    <li className="details-list-container">
      <img src={imageUrl} alt={name} className="details-logo" />

      <div className="name-description-container">
        <h1 className="details-name"> {name}</h1>
        <p className="details-description">{description}</p>
      </div>
    </li>
  )
}

export default CoursesDetailsCard
