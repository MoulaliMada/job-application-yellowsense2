import { Component } from "react";
import { ThreeDots } from "react-loader-spinner";
import Jobcard from "../Jobcard";
import "./index.css";
class Jobs extends Component {
  state = {
    jobs: [],
    bookmarks: [],
    isLoading: false,
    error: "",
    jobDetailsId: "",
  };
  componentDidMount() {
    this.getJobDetails("1");
    this.getJobDetails("2");
    this.getJobDetails("3");
    this.detDataFromLocalstorage();
  }
  detDataFromLocalstorage = () => {
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    if (localStoragedata !== null) {
      this.setState({ bookmarks: localStoragedata });
    }
  };
  getJobDetails = async (page) => {
    const { jobs } = this.state;
    this.setState({ isLoading: true });
    try {
      const apiUrl = `https://testapi.getlokalapp.com/common/jobs?page=${page}`; //fetching data
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        const result = data.results;
        const updatedData = result.map((eachResult) => ({
          id: eachResult.id,
          companeyName: eachResult.company_name,
          jobCategory: eachResult.job_category,
          jobHours: eachResult.job_hours,
          location: eachResult.job_location_slug,
          jobRole: eachResult.job_role,
          openings: eachResult.openings_count,
          otherDetails: eachResult.other_details,
          primaryDetails: eachResult.primary_details,
          whatsappNo: eachResult.whatsapp_no,
          title: eachResult.title,
          numApplications: eachResult.num_applications,
        }));
        const validJobs = updatedData.filter((job) => job.id !== undefined);
        if (validJobs.length > 0) {
          this.setState((prevState) => ({
            jobs: [...prevState.jobs, ...validJobs], //update state with fetched data
            isLoading: false,
          }));
        } else {
          this.setState({ jobs, isLoading: false });
        }
      }
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  };
  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <ThreeDots color="black" height="70" width="70" />
    </div>
  );

  renderFailureView = () => {
    return (
      <div>
        <h1>failye</h1>
      </div>
    );
  };

  onclickJobCard = (id) => {
    this.setState({ jobDetailsId: id });
  };

  renderJobsView = () => {
    const { jobs } = this.state;
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">All Jobs</h1>
        <ul className="jobs-ul-container">
          {jobs.map((eachjob) => (
            <Jobcard
              key={eachjob.id}
              jobDetails={eachjob}
              clickJobCard={this.onclickJobCard}
            />
          ))}
        </ul>
      </div>
    );
  };

  render() {
    const { isLoading, jobs, error, jobDetailsId } = this.state;
    if (isLoading) {
      return this.renderLoadingView();
    } else if (jobs.length === 0 || error !== "") {
      return this.renderFailureView();
    } else {
      return this.renderJobsView();
    }
  }
}
export default Jobs;
