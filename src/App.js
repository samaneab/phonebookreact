import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Searchform from "./components/Searchform";
// import { Log } from "./components/Log";
// import { Home } from "./components/Home";
import Allcontacts from "./components/Allcontacts";
// import Announcements from "./components/Announcements";

import "bootstrap/js/index.esm";
import "./components/style.css";

import logo from "./assets/image/Iran_transfo_logo.svg.png";

export default class App extends Component {
  render() {
    return (
      <Router>
        <>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img
                  src={logo}
                  style={{
                    width: "45px",
                    display: "inline-block",
                  }}
                ></img>
                <p
                  className="float-right"
                  style={{
                    color: "blue",
                    marginTop: "30px",
                    marginRight: "0px",
                    display: "inline-block",
                  }}
                >
                  دفترچه تلفن ایران ترانسفو
                </p>
                <nav style={{ float: "left", marginTop: "25px" }}>
                  <ul className="nav">
                    <li className="nav-item rounded">
                      {/* <NavLink
                        exact
                        activeClassName="active-menue "
                        className="nav-link"
                        to="/"
                      >
                        خانه
                      </NavLink> */}
                    </li>
                    <li className="nav-item rounded">
                      <NavLink
                        activeClassName="active-menue"
                        className="nav-link"
                        to="/allpersons"
                      >
                        لیست تماس
                      </NavLink>
                    </li>
                    <li className="nav-item rounded">
                      <NavLink
                        activeClassName="active-menue"
                        className="nav-link"
                        to="/search"
                      >
                        جستجو
                      </NavLink>
                    </li>
                    {/* <li className="nav-item rounded">
                      <NavLink
                        activeClassName="active-menue"
                        className="nav-link"
                        to="/announcements"
                      >
                        اطلاعیه ها
                      </NavLink>
                    </li> */}
                  </ul>
                </nav>
              </div>

              <main>
                <Switch>
                  <Route exact path="/" component={Allcontacts} />
                  <Route exact path="/allpersons" component={Allcontacts} />
                  <Route exact path="/search" component={Searchform} />
                  {/* <Route path="/announcements" component={Announcements} /> */}
                  {/* <Route path="/login" component={Log} /> */}

                  <Route path="*">
                    <h1>404</h1>
                    <h3>page not found!</h3>
                  </Route>
                </Switch>
              </main>
            </div>
          </div>
        </>
      </Router>
    );
  }
}
