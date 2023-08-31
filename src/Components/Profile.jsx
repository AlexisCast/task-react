const Profile = ({ user }) => {
  console.log('rofile', user);
  const { _id, name, email, age } = user;
  return (
    <div className="p-5 m-6 max-w-[300px] rounded bg-slate-300	">
      <h2>ID: {_id}</h2>
      <h2>Name: {name}</h2>
      <h2>Email: {email}</h2>
      <h3>Age: {age}</h3>
    </div>
  );
};

export default Profile;
