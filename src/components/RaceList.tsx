import React from "react";
import { Menu, Grid, Segment, Label, List, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Race } from "../types";
import { useSelector } from "react-redux";
import {
  getAllRaces,
  getActiveRaces,
  getNotActiveRaces as getInactiveRaces,
} from "../reducers/races/racesSlice";

type ActiveItem = {
  value: "all" | "active" | "inactive";
};

const RaceList = () => {
  const [selectedRaces, setSelectedRaces] = React.useState<Race[]>();
  const [activeItem, setActiveItem] = React.useState<ActiveItem>({
    value: "all",
  });

  const allRaces = useSelector(getAllRaces);
  const activeRaces = useSelector(getActiveRaces);
  const inactiveRaces = useSelector(getInactiveRaces);

  const handleShowAllButton = () => {
    setActiveItem({ value: "all" });
    setSelectedRaces(allRaces);
  };

  const handleShowActiveButton = () => {
    setActiveItem({ value: "active" });
    setSelectedRaces(activeRaces);
  };

  const handleShowInactiveButton = () => {
    setActiveItem({ value: "inactive" });
    setSelectedRaces(inactiveRaces);
  };

  React.useEffect(() => {
    setSelectedRaces(allRaces);
  }, [allRaces]);

  return (
    <>
      {!selectedRaces ? (
        "No races"
      ) : (
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item
                name="all races"
                active={activeItem.value === "all"}
                onClick={handleShowAllButton}
              >
                <Label color={activeItem.value === "all" ? "teal" : undefined}>
                  {allRaces.length}
                </Label>
                All races
              </Menu.Item>
              <Menu.Item
                name="active races"
                active={activeItem.value === "active"}
                onClick={handleShowActiveButton}
              >
                <Label
                  color={activeItem.value === "active" ? "teal" : undefined}
                >
                  {activeRaces.length}
                </Label>
                Active races
              </Menu.Item>
              <Menu.Item
                name="inactive races"
                active={activeItem.value === "inactive"}
                onClick={handleShowInactiveButton}
              >
                <Label
                  color={activeItem.value === "inactive" ? "teal" : undefined}
                >
                  {inactiveRaces.length}
                </Label>
                Inactive races
              </Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={12}>
            <Segment>
              <List>
                {selectedRaces.map((race) => (
                  <List.Item key={`race_${race.id}`}>
                    <Header as="h4">
                      <Link to={`/race/${race.id}`}>{race.name}</Link>
                    </Header>
                  </List.Item>
                ))}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default RaceList;
