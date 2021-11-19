import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { selectParticipants } from "../reducers/participants/participantsSlice";
import { getRace } from "../reducers/races/racesSlice";
import {
  Container,
  Table,
  Button,
  Grid,
  Label,
  Header,
  Radio,
  Divider,
  Input,
  Message,
} from "semantic-ui-react";
import { bet_storage_string } from "../constants";

const RaceDetails = () => {
  const { id } = useParams();
  const race = useSelector((state: RootState) => getRace(state, Number(id!)));
  const participants = useSelector((state: RootState) =>
    selectParticipants(state, race?.participants!)
  );

  const [msgVisible, setMsgVisible] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<string>("0");
  const [winnerIndex, setWinnerIndex] = React.useState<number | undefined>(
    undefined
  );
  const [secondIndex, setSecondIndex] = React.useState<number | undefined>(
    undefined
  );
  const [thirdIndex, setThirdIndex] = React.useState<number | undefined>(
    undefined
  );

  const handleWinnerChange = (index: number) => {
    if (secondIndex === index) setSecondIndex(undefined);
    if (thirdIndex === index) setThirdIndex(undefined);
    setWinnerIndex(index);
  };

  const handleSecondChange = (index: number) => {
    if (winnerIndex === index) setWinnerIndex(undefined);
    if (thirdIndex === index) setThirdIndex(undefined);
    setSecondIndex(index);
  };

  const handleThirdChange = (index: number) => {
    if (winnerIndex === index) setWinnerIndex(undefined);
    if (secondIndex === index) setSecondIndex(undefined);
    setThirdIndex(index);
  };

  const handleButtonPress = () => {
    const newBet = {
      amount,
      winnerIndex,
      secondIndex,
      thirdIndex,
    };
    const newBetString = JSON.stringify(newBet);
    window.localStorage.setItem(`${bet_storage_string}${id}`, newBetString);
    setMsgVisible(true);
  };

  React.useEffect(() => {
    if (id) {
      const placedBetString = window.localStorage.getItem(
        `${bet_storage_string}${id}`
      );
      if (placedBetString) {
        const { amount, winnerIndex, secondIndex, thirdIndex } =
          JSON.parse(placedBetString);
        setAmount(amount);
        setWinnerIndex(winnerIndex);
        setSecondIndex(secondIndex);
        setThirdIndex(thirdIndex);
      }
    }
  }, [id]);

  return (
    <Container>
      {!id || !race || !participants ? (
        <></>
      ) : (
        <>
          <Header as="h1">
            {race.name}
            <Label color={race.active ? "teal" : undefined}>
              {race.active ? "active" : "inactive"}
            </Label>
          </Header>
          <Divider />
          <Grid centered>
            <Grid.Row centered>
              <Grid.Column width={3}>
                <Input placeholder="Enter amount" type="number">
                  <input
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                  />
                </Input>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button
                  secondary
                  onClick={handleButtonPress}
                  disabled={!race.active}
                >
                  Place Bet
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Participant</Table.HeaderCell>
                <Table.HeaderCell>Winner</Table.HeaderCell>
                <Table.HeaderCell>Second</Table.HeaderCell>
                <Table.HeaderCell>Third</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {participants.map((participant, index) => (
                <Table.Row key={`participant_${participant.id}`}>
                  <Table.Cell>
                    <Header as="h5">{participant.body}</Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      checked={winnerIndex === index}
                      onChange={() => handleWinnerChange(index)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      checked={secondIndex === index}
                      onChange={() => handleSecondChange(index)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      checked={thirdIndex === index}
                      onChange={() => handleThirdChange(index)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Message positive hidden={!msgVisible}>
            You have placed your bet
          </Message>
        </>
      )}
    </Container>
  );
};

export default RaceDetails;
