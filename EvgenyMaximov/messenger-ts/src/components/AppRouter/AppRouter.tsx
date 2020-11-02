import React from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "../../pages/Home";
import { ProfileContainer } from "../../containers/ProfileContainer";
import { Error } from "../../pages/Error";
import { MessengerContainer } from "../../containers/MessengerContainer";

export type PagesPropsType = {
	classform: string,
	classlist: string,
	classhomepage: string,
	classchattitle: string,
};

export const AppRouter:React.FC<PagesPropsType> = ({classform, classlist, classchattitle, classhomepage }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Home classhomepage={classhomepage} />
      </Route>
      <Route path="/profile" exact>
        <ProfileContainer />
      </Route>
      <Route
        path="/chats/:id([0-9]+)"
        render={(props) => (
          <MessengerContainer
            {...props}
            classform={classform}
            classlist={classlist}
            classchattitle={classchattitle}
          />
        )}
        exact
      />
      <Route path="*">
        <Error classhomepage={classhomepage} />
      </Route>
    </Switch>
  );
};
