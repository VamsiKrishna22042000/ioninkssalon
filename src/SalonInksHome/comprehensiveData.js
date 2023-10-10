import "./saloninkshome.css";

const ComprehensiveData = (props) => {
  const { comprehensiveData } = props;

  console.log(comprehensiveData);
  return (
    <ul className="comprehensive-content">
      {comprehensiveData.map((each) => (
        <li key={each.head} className="content-com">
          <h6 className="comprehensive-head">{each.head}</h6>
          <h6 className="comprehensive-para">{each.data}</h6>
          <button type="button">Learn more ❯</button>
        </li>
      ))}
    </ul>
  );
};

export default ComprehensiveData;
