import {Link} from 'react-router-dom';
import {useEffect} from 'react';
import {useUsers} from '../hooks/ApiHooks';

const Nav = () => {
  const {getUser} = useUsers();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      const user = await getUser(token);
      console.log(user);
    };

    checkUser();
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
