import EventCalendar from "./components/EventCalendar";
import { Route, Switch, useLocation } from "wouter";
import Bienestar from "./pages/Bienestar";
import Sala24 from "./pages/Sala-2-4";
import Header from "./components/Header/Header";
import Main from "./pages/Main";
import Sala25 from "./pages/Sala-2-5";
import Menu from "./components/Menu/Menu";
import VerSalas from "./pages/VerSalas";
import { useEffect } from "react";

function App() {
  const [location] = useLocation();

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return;

    // Mapa de colores según la ruta
    const routeColors: Record<string, string> = {
      "/": "#f5f5f5",
      "/auditorio": "#7f7f7f",
      "/sala24": "#0070c0",
      "/sala25": "#ff6600",
      "/bienestar": "#00b050",
    };

    rootElement.style.backgroundColor = routeColors[location] || "#f5f5f5";
  }, [location]);

  const isStandalonePage = location === "/ver-salas";

  return (
    <>
      {/* Renderiza el Header y el Menu solo si no estás en una página externa */}
      {!isStandalonePage && <Header />}
      {!isStandalonePage && <Menu />}

      <Switch>
        {/* auditorio */}
        <Route path="/" component={Main} />
        <Route path="/auditorio" component={EventCalendar} />
        <Route path="/sala24" component={Sala24} />
        <Route path="/sala25" component={Sala25} />
        <Route path="/bienestar" component={Bienestar} />
        {/* <Route path="/login" component={SignIn} /> */}

        {/* Página standalone */}
        <Route path="/ver-salas" component={VerSalas} />

        {/* Default route */}
        <Route>404: No such page!</Route>
      </Switch>
    </>
  );
}

export default App;
