import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FaGithub, FaAddressCard } from "react-icons/fa";
import MessageForm from "../components/MessageForm";
export default function Footer() {
  return (
    <Box position="fixed" bottom="0" width="100%">
      <MessageForm />

      <Grid
        gridTemplateColumns="auto 1fr"
        textAlign="center"
        alignItems="center"
        py="4px"
        px="30px"
        height="40px"
        bg="white"
      >
        <GridItem justifySelf="start">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaAddressCard style={{ display: "inline" }} />
            My Portfolio
          </a>
        </GridItem>
        <GridItem justifySelf="end">
          <a
            href="https://github.com/richman0116/React-RealTime-ChatApp-Supabase"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub style={{ display: "inline" }} /> Source code
          </a>
        </GridItem>
      </Grid>
    </Box>
  );
}
