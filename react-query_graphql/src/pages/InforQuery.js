import { request } from "graphql-request";
import { GetMembersData } from "../query/query.js";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const urlAPI = "http://localhost:4000/graphql";

function InforQuery() {
  const fetchGQLMembers = async () => {
    const data = await request(urlAPI, GetMembersData);
    return data.members;
  };

  const {
    isLoading,
    isError,
    data: dataMembers,
  } = useQuery("members", fetchGQLMembers);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Something went wrong!</h1>;
  return (
    <>
      {/* <TitleStyled variant="h5">Lists room in company</TitleStyled>
          <ColumnStyled>
            <TitleText>Id</TitleText>
            <TitleText>Room Name</TitleText>
            <TitleText>Member</TitleText>
          </ColumnStyled>
          {dataRooms?.map((room) => (
            <ColumnStyled key={room.id}>
              <TextStyled>{room.id}</TextStyled>
              <TextStyled>{room.roomname}</TextStyled>
              <TextStyled>{room.totalmember}</TextStyled>
            </ColumnStyled>
          ))} */}
      <TitleStyled variant="h5">Lists staff in company</TitleStyled>
      <ColumnStyled>
        <TitleText>Id</TitleText>
        <TitleText>Name</TitleText>
        <TitleText>Position</TitleText>
      </ColumnStyled>
      {dataMembers?.map((member) => (
        <ColumnStyled key={member.id}>
          <TextStyled>{member.id}</TextStyled>
          <TextStyled>{member.name}</TextStyled>
          <TextStyled>{member.position}</TextStyled>
        </ColumnStyled>
      ))}
    </>
  );
}

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
const TitleStyled = styled(Typography)({
  fontWeight: "600",
});

export default InforQuery;
