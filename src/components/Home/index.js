import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import HomeCardDetails from '../HomeCardDetails'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const fetchedData = await fetch(apiUrl, options)

    if (fetchedData.ok) {
      const response = await fetchedData.json()
      console.log(response)
      const upDatedData = response.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        courseList: upDatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoading = () => (
    <>
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </>
  )

  renderSuccessMethod = () => {
    const {courseList} = this.state
    return (
      <ul className="ul-container">
        {courseList.map(eachItem => (
          <HomeCardDetails homeDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getCourseList()
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

  renderFinalOutPut = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessMethod()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.inProgress:
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="Home-container">
          <h1 className="main-heading">Courses</h1>

          <div className="courses-container">{this.renderFinalOutPut()}</div>
        </div>
      </>
    )
  }
}

export default Home
