import React from "react";
import { Route, Switch } from "react-router-dom";
import Admin from "../components/admin/Admin";
import Home from "../components/home";
import Menu from "../components/menu";
import PageNotFound from "../components/pageNotFound";
import EditPost from "../components/post/EditPost";
import NewPost from "../components/post/NewPost";
import SinglePost from "../components/post/SinglePost";
import SingleUserPosts from "../components/post/SingleUserPosts";
import { UsersContainer } from "../components/users";
import PrivateRoute from "../components/users/auth/PrivateRoute";
import FindPeople from "../components/users/findPeople";
import ForgotPassword from "../components/users/fotgotPassword";
import Profile from "../components/users/profile";
import EditProfile from "../components/users/profile/EditProfile";
import ResetPassword from "../components/users/resetPassword/ResetPassword";
import SignIn from "../components/users/signin";
import Signup from "../components/users/signup";

const MainRouter = () => {
   return (
      <>
         <Menu />
         <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path={`/admin`} component={Admin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
               exact
               path="/reset-password/:resetPasswordToken"
               component={ResetPassword}
            />
            <PrivateRoute
               exact
               path={`/posts/by/:posterId`}
               component={SingleUserPosts}
            />
            <PrivateRoute exact path={`/post/create`} component={NewPost} />
            <PrivateRoute
               exact
               path="/post/edit/:postId"
               component={EditPost}
            />
            <Route exact path="/post/:postId" component={SinglePost} />
            <Route exact path={`/users`} component={UsersContainer} />
            <PrivateRoute exact path={`/findpeople`} component={FindPeople} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SignIn} />
            <PrivateRoute
               exact
               path={`/user/edit/:userId`}
               component={EditProfile}
            />
            <Route exact path={`/user/:userId`} component={Profile} />
            <Route exact path="" component={PageNotFound} />
         </Switch>
      </>
   );
};

export default MainRouter;
