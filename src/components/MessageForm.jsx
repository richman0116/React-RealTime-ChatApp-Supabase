import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Input,
  Stack,
  IconButton,
  useToast,
  Box,
  Container,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";

export default function MessageForm() {
  const { username, country, session } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from("messages").select("*");
      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
    };
    fetchMessages();
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowUp" && !isEditing && message === "" && messages.length > 0) {
        const lastIndex = messages.length - 1;
        const lastMessage = messages[lastIndex];

        if (lastMessage && lastMessage.text) {
          setMessage(lastMessage.text);
          setIsEditing(true);
          setEditIndex(lastIndex);
          inputRef.current.focus();
        }
      }
    },
    [messages, isEditing, message]
  );

  useEffect(() => {
    const inputElement = inputRef.current;
    inputElement.addEventListener("keydown", handleKeyDown);

    return () => {
      inputElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast({
        description: "You need to log in to use the public chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!message.trim()) {
      toast({
        description: "Please input your message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSending(true);

    try {
      if (isEditing && editIndex !== null) {
        const { error } = await supabase
          .from("messages")
          .update({ text: message.trim() })
          .eq("id", messages[editIndex].id);

        if (error) {
          throw error;
        }

        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === editIndex ? { ...msg, text: message.trim() } : msg
          )
        );
      } else {
        const { data, error } = await supabase.from("messages").insert([
          {
            text: message.trim(),
            username,
            country,
            is_authenticated: !!session,
          },
        ]).single();

        if (error) {
          throw error;
        }

        setMessages((prevMessages) => [...prevMessages, data]);
      }

      setIsEditing(false);
      setEditIndex(null);
      setMessage("");
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box py="10px" pt="15px" bg="gray.100">
      <Container maxW="600px">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack direction="row">
            <Input
              name="message"
              placeholder="Enter a message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              bg="white"
              border="none"
              ref={inputRef}
              autoFocus
              maxLength="500"
            />
            <IconButton
              colorScheme="teal"
              aria-label="Send"
              fontSize="20px"
              icon={<BiSend />}
              type="submit"
              isLoading={isSending}
            />
          </Stack>
        </form>
        <Box fontSize="10px" mt="1">
          Warning: do not share any sensitive information, it's a public chat room 🙂
        </Box>
      </Container>
    </Box>
  );
}
