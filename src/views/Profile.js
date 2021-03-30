const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <h1>Profile</h1>
      <p>{user.full_name}</p>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </>
  );
};

export default Profile;
