import { Box, Grid, GridItem, Flex, Text, Image } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { truncateText } from "../utils";

export default function Message({ message, isYou }) {

  function formatTimestampTo12Hour(timestamp) {
    // Create a new Date object from the timestamp
    const date = new Date(timestamp);

    // Get the hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad minutes with leading zero if needed
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    // Return the formatted time string
    return `${hours}:${minutesStr} ${ampm}`;
  }

  return (
    <Flex display={"flex"} direction={'row'} gap={4} mt={5}>
      <Box display={isYou ? "none" : "block"}><Image src="../../public/default.webp" rounded={'full'} width={'8'} height={'7'}/></Box>
      <Flex display={"flex"} width={'full'} direction={'column'}>
        <Box display="grid" justifyItems={isYou ? "end" : "start"}>
          {!isYou ? <Text fontSize="10px">{message.username + ", " + formatTimestampTo12Hour(message.timestamp)}</Text> : <Text fontSize="10px">{formatTimestampTo12Hour(message.timestamp)}</Text>}
        </Box>
        <Box display="grid" justifyItems={isYou ? "end" : "start"} width={'full'}>
          <Grid
            templateColumns="1fr"
            maxW="85%"
            w="auto"
            pl="3"
            pr="4"
            py="2"
            borderRadius="15px"
            borderTopLeftRadius={isYou ? "15px" : "0"}
            borderTopRightRadius={isYou ? "0" : "15px"}
            bg={isYou ? "#0e3b82" : "#292929"}
            position="relative"
            _after={{
              position: "absolute",
              content: "''",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: isYou ? "0px 0px 10px 10px" : "0px 10px 10px 0",
              borderColor: isYou
                ? "transparent transparent transparent #0e3b82"
                : "transparent #292929 transparent transparent",
              top: 0,
              left: isYou ? "auto" : "-10px",
              right: isYou ? "-10px" : "auto",
            }}
          >
            <GridItem
              justifySelf="start"
              textAlign="left"
              wordBreak="break-word"
              fontSize="md"
              fontFamily="Montserrat, sans-serif"
            >
              {truncateText(message.text)}
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
}
