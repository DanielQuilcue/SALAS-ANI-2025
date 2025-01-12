import EventCalendar from "./components/EventCalendar";
import { Route, Switch } from "wouter";
import Bienestar from "./pages/Bienestar";
import Sala24 from "./pages/Sala-2-4";
import Sala25 from "./pages/Sala-2-5";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/Auth/SignIn";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Switch>
        <Route path="/" component={EventCalendar} />

        <Route path="/bienestar" component={Bienestar} />
        <Route path="/sala24" component={Sala24} />
        <Route path="/sala25 " component={Sala25} />

        <Route path="/login" component={SignIn} />

        {/* Default route in a switch */}
        <Route>404: No such page!</Route>
      </Switch>

      <Navigation />
    </>
  );
}

export default App;
