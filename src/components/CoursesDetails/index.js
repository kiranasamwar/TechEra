import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import CoursesDetailsCard from '../CoursesDetailsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CoursesDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coursesDetailsList: [],
  }

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const fetchedData = await fetch(apiUrl, options)

    if (fetchedData.ok) {
      const data = await fetchedData.json()
      console.log(data)

      const upDatedData = [data.course_details].map(eachItem => ({
        id: eachItem.id,
        description: eachItem.description,
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))
      this.setState({
        coursesDetailsList: upDatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCorsesDetails = () => {
    const {coursesDetailsList} = this.state

    return (
      <ul className="ul-details-list">
        {coursesDetailsList.map(eachItem => (
          <CoursesDetailsCard coursesDetailsList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </>
  )

  onClickRetry = () => {
    this.getCoursesDetails()
  }

  renderFailureView = () => (
    <>
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt=" failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong </h1>
        <p className="failure-description">
          We Cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderCourses = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCorsesDetails()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    // const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="courses-details-container">
          {/* {isLoading ? this.renderLoading() : this.renderCorsesDetails()} */}
          {this.renderCourses()}
        </div>
      </>
    )
  }
}

export default CoursesDetails
