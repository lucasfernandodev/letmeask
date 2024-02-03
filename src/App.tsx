import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AuthContextProvider } from "./contexts/AuthContext";
import './styles/global.css';
import { AdminRoom } from "./pages/AdminRoom";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
