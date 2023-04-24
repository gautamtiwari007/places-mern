import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElement/LoadingSpinner";

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {

  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" exact element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Users />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }>
            <Routes>
              {routes}
            </Routes>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;