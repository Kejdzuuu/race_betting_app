import React from "react";
import RaceList from "./components/RaceList";
import RaceDetails from "./components/RaceDetails";
import { useDispatch } from "react-redux";
import { fetchRaces } from "./reducers/races/racesSlice";
import { fetchParticipants } from "./reducers/participants/participantsSlice";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Container, Header, Divider, Icon } from "semantic-ui-react";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchRaces());
    dispatch(fetchParticipants());
  }, [dispatch]);

  return (
    <Router>
      <Container>
        <Divider hidden />
        <Link to="/">
          <Header size="huge" textAlign="center" icon>
            <Icon name="trophy" color="yellow" />
            Race Betting App
          </Header>
        </Link>
        <Divider hidden />
        <Routes>
          <Route path="race/:id" element={<RaceDetails />} />
          <Route path="/" element={<RaceList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
