/* eslint-disable react/prop-types */
const BulletPointList = ({ text }) => {
  const items = text.split("•").filter(item => item.trim()); // Remove empty items
  
    return (
      <ul className="list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{item.replace(/^[-*]\s*/, "").trim()}</li>
        ))}
      </ul>
    );
  };
  
  export default BulletPointList
