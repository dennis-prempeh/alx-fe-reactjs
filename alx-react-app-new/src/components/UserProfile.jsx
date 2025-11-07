const UserProfile = (props) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h2 style={{ color: "blue" }}>{props.name}</h2>
      <p>
        <span style={{ fontWeight: "bold" }}>Age: {props.age}</span>
      </p>
      <p style={{ color: "blue", fontStyle: "italic" }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
