import { useState } from "react";
import Jobs from "../Jobs";
import Bookmarks from "../Bookmarks";
import "./index.css";

function Home(){
  const [navigationPage, setNavigationPage] = useState("Jobs");
  const onClickJobs = () => setNavigationPage("Jobs");
  const onClickBookmarks = () => setNavigationPage("Bookmarks");
  return (
    <div className="app">
      {navigationPage === "Jobs" ? <Jobs /> : <Bookmarks />}
      <div className="bottom-nav-bar">
        <button
          onClick={onClickJobs}
          className={
            navigationPage === "Jobs" ? "active-nav-buttons" : "nav-buttons"
          }
        >
          Jobs
        </button>
        <button
          onClick={onClickBookmarks}
          className={
            navigationPage === "Bookmarks"
              ? "active-nav-buttons"
              : "nav-buttons"
          }
        >
          Bookmarks
        </button>
      </div>
    </div>
  );
  
}
export default Home;
