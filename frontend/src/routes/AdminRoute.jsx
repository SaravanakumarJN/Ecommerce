import { Route, Redirect } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { userAtom } from '../store/userStore';

const AdminRoutes = ({
  path,
  component,
  exact = false,
  redirectLink = '/login',
}) => {
  const [userData] = useAtom(userAtom);

  if (!userData.isLoggedIn) {
    return <Redirect to={redirectLink}></Redirect>;
  }

  if (!userData.isSeller) {
    return <Redirect to='/'></Redirect>;
  }

  return (
    <Route path={path} exact={exact}>
      {component}
    </Route>
  );
};

export { AdminRoutes };
