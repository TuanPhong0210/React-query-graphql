import { useState } from "react";
// import { request } from "graphql-request";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import InforQuery from "./pages/InforQuery.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
// import { GetRoomsData } from "./query/query.js";

const urlAPI = "http://localhost:4000/graphql";
const rooms = [
  {
    id: 1,
    roomname: "Frontend Developer",
    totalmember: 10,
  },
  {
    id: 2,
    roomname: "Backend Developer",
    totalmember: 8,
  },
  {
    id: 3,
    roomname: "Server",
    totalmember: 7,
  },
  {
    id: 4,
    roomname: "QA",
    totalmember: 6,
  },
];

function App() {
  const [roomName, setRoomName] = useState("");
  const [totalMember, setTotalMember] = useState("");
  const queryClient = useQueryClient();

  // const fetchGQLRooms = async () => {
  //   const data = await request(urlAPI, GetRoomsData);
  //   return data.rooms;
  // };

  const getRooms = () => {
    // Call API template here
    return [...rooms];
  };
  const { isLoading, isError, data } = useQuery({
    queryKey: ["room"],
    queryFn: getRooms,
    retry: 0,
  });

  const addNewRoom = (room) => {
    return rooms.push({
      id: rooms.length + 1,
      roomname: room.roomName,
      totalmember: room.totalMember,
    });
  };

  // useMutaion can be Update / Create / Delete data
  const newMutation = useMutation({
    mutationFn: addNewRoom,
    onSuccess: () => {
      queryClient.invalidateQueries("room");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    newMutation.mutate({ roomName, totalMember });
  };

  // const { isLoading, isError, data } = useQuery("rooms", fetchGQLRooms);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong!</h1>;

  return (
    <Container>
      <Title variant="h4">RESEARCH REACT QUERY + GRAPHQL</Title>
      <Box display="flex" sx={{ margin: "30px 0" }}>
        <TitleStyled variant="h5">Interact with graphql by link: </TitleStyled>
        <LinkStyled href={urlAPI}>{urlAPI}</LinkStyled>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TitleStyled variant="h5">Create Room </TitleStyled>
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextField
                label="name room"
                name="name"
                sx={{ marginRight: 10, marginBottom: 3 }}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <TextField
                label="total member"
                name="total"
                sx={{ marginRight: 10, marginBottom: 3 }}
                onChange={(e) => setTotalMember(e.target.value)}
              />
              <Button
                sx={{ marginRight: 10, marginBottom: 3, padding: 2 }}
                type="submit"
                variant="contained"
                color="primary">
                {" "}
                Create new user
              </Button>
            </Stack>
          </form>
        </Grid>

        <Grid item xs={6}>
          <TitleStyled variant="h5">Lists room in company</TitleStyled>
          <ColumnStyled>
            <TitleText>Id</TitleText>
            <TitleText>Room Name</TitleText>
            <TitleText>Member</TitleText>
          </ColumnStyled>
          {rooms?.map((room) => (
            <ColumnStyled key={room.id}>
              <TextStyled>{room.id}</TextStyled>
              <TextStyled>{room.roomname}</TextStyled>
              <TextStyled>{room.totalmember}</TextStyled>
            </ColumnStyled>
          ))}
        </Grid>
      </Grid>
      <InforQuery />
    </Container>
  );
}

const LinkStyled = styled(Link)({
  fontSize: "1.6rem",
});
const Title = styled(Typography)({
  fontWeight: "600",
});
const TitleStyled = styled(Typography)({
  fontWeight: "600",
});
const ColumnStyled = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid gray",
  marginTop: 10,
});

const TextStyled = styled(Typography)({
  color: "#000",
  textDecoration: "none",
  fontSize: "1.2rem",
  marginBottom: "10px",
});
const TitleText = styled(TextStyled)({
  fontWeight: "600",
});

export default App;
