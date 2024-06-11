import { Button, Grid, GridItem, Image } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import supabase from "../supabaseClient";

import { useAppContext } from "../context/appContext";
import NameForm from "./NameForm";
import { useCallback } from "react";
export default function Header() {
  const { username, setUsername, randomUsername, session } = useAppContext();

  const handleLogIn = useCallback(() => {
    const redirectTo = import.meta.env.VITE_SUPABASE_REDIRECT_URL || window.location.origin;
    supabase.auth.signInWithOAuth({
      provider: 'github',
      redirectTo,
    });
  }, [])

  const handleLogOut = useCallback(() => {
    const { error } = supabase.auth.signOut();
    if (error) return console.error("error signOut", error);
    const username = randomUsername();
    setUsername(username);
    localStorage.setItem("username", username);
  }, [])

  return (
    <Grid
      templateColumns="max-content 1fr min-content"
      justifyItems="center"
      alignItems="center"
      bg="white"
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="20px solid #edf2f7"
    >
      <GridItem justifySelf="start" m="2">
        <Image src="/logo.png" height="30px" ml="2" />
      </GridItem>
      {session ? (
        <>
          <GridItem justifySelf="end" alignSelf="center" mr="4">
            Welcome <strong>{username}</strong>
          </GridItem>
          <Button
            marginRight="4"
            size="sm"
            variant="link"
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <GridItem justifySelf="end" alignSelf="end">
            <NameForm username={username} setUsername={setUsername} />
          </GridItem>
          <Button
            size="sm"
            marginRight="2"
            colorScheme="teal"
            rightIcon={<FaGithub />}
            variant="outline"
            onClick={handleLogIn}
          >
            Login
          </Button>
        </>
      )}
    </Grid>
  );
}
