import { Component } from "react";
import Jobcard from "../Jobcard";
import JobDetails from "../JobDetails";
import "./index.css";
class Bookmarks extends Component {
  state = { bookmarks: [], jobDetailsId: "", removedBookMartk: {} };
  componentDidMount() {
    this.detDataFromLocalstorage();
  }
  detDataFromLocalstorage = () => {
    const localstorageBookmarks = localStorage.getItem("bookmarks");
    const localStoragedata = JSON.parse(localstorageBookmarks);
    if (localStoragedata !== null) {
      this.setState({ bookmarks: localStoragedata });
    }
  };
  renderBookmarksEmptyView = () => {
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">Book Marks</h1>
        <div className="no-bookmarks-container">
          <p className="no-bookmarks">No jobs bookmarked yet.</p>
        </div>
      </div>
    );
  };

  onclickJobCard = (id) => {
    this.setState({ jobDetailsId: id });
  };

  renderBookmarksView = () => {
    const { bookmarks } = this.state;
    return (
      <div className="jobs-view">
        <h1 className="all-jobs-heading">Book Marks</h1>
        <ul className="jobs-ul-container">
          {bookmarks.map((eachjob) => (
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

  onClickBack = () => {
    this.setState({ jobDetailsId: "" });
  };

  onClickRemoveBookMark = (id) => {
    const { bookmarks } = this.state;
    const removeBookMark = bookmarks.filter((eachJob) => eachJob.id !== id);
    localStorage.setItem("bookmarks", JSON.stringify(removeBookMark));
    this.setState({ bookmarks: removeBookMark, jobDetailsId: "" });
  };

  onSwipedRight = (id) => {
    alert("swipe left to remove book mark");
  };

  onSwipedLeft = (id) => {
    this.onClickRemoveBookMark(id);
  };

  renderJobDetailsView = () => {
    const { bookmarks, jobDetailsId } = this.state;
    const jobData = bookmarks.find((eachjob) => eachjob.id === jobDetailsId);
    return (
      <JobDetails
        jobData={jobData}
        clickBack={this.onClickBack}
        clickRemoveBookMark={this.onClickRemoveBookMark}
        swipedRight={this.onSwipedRight}
        swipedLeft={this.onSwipedLeft}
      />
    );
  };

  render() {
    const { bookmarks, jobDetailsId } = this.state;
    if (bookmarks.length === 0) {
      return this.renderBookmarksEmptyView();
    } else if (jobDetailsId !== "") {
      return this.renderJobDetailsView();
    } else {
      return this.renderBookmarksView();
    }
  }
}
export default Bookmarks;
