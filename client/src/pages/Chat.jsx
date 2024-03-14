import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
// import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  // const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } 
    else {
      Promise.resolve(JSON.parse(localStorage.getItem("chat-app-user")))
        .then(user => {
          setCurrentUser(user);
        })
        .catch(error => {
          console.error("Error parsing user data:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}/${currentUser._id}`)
          .then(response => {
            setContacts(response.data);
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  
  // const handleChatChange = (chat) => {
  //   setCurrentChat(chat);
  // };
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} />
          {/* {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )} */}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;