import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DummyPage from "../components/Pages/Dummy/DummyPage";
import CategoryPage from "../components/Pages/Admin/Category/CategoryPage";

const Routes = (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={DummyPage} />
                <Route path="/category" exact component={CategoryPage} />
            </Switch>
        </Router>
    );
};

export default Routes;
