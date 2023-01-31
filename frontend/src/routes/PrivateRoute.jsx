import { Route, Redirect } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { userAtom } from '../store/userStore';

const PrivateRoutes = ({
  path,
  component,
  exact = false,
  redirectLink = '/login',
}) => {
  const [userData] = useAtom(userAtom);

  if (!userData.isLoggedIn) {
    return <Redirect to={redirectLink}></Redirect>;
  }

  return (
    <Route path={path} exact={exact}>
      {component}
    </Route>
  );
};

export { PrivateRoutes };
