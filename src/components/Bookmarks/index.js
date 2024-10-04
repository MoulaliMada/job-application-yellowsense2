import { Component } from "react";
import './index.css'
class Bookmarks extends Component {
  state = { bookmarks: [] };
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
  render() {
    return (
      <div>
        <h1 className="bookmarks-heading">bookmark</h1>
      </div>
    );
  }
}
export default Bookmarks;
