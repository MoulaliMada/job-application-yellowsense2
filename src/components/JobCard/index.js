import "./index.css";

function Jobcard(props) {
  const { jobDetails, clickJobCard } = props;
  const { title, location, whatsappNo, primaryDetails, id } = jobDetails;
  const { Salary } = primaryDetails;

  const onClickJobCard = () => {
    clickJobCard(id);
  };

  return (
    <li className="jobcard" onClick={onClickJobCard}>
      <div className="job-card-container">
        <p className="job-title">{title}</p>
        <div className="watsapp-salary">
          <p className="whatsapp">{whatsappNo}</p>
          <p className="salary">{Salary}</p>
        </div>
        <p className="location">Location: {location}</p>
        <button className="apply-now-btn">Apply Now</button>
      </div>
    </li>
  );
}
export default Jobcard;
