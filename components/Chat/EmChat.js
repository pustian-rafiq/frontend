import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

import { Avatar, Paper, TextareaAutosize, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import chatstyles from "../../styles/Chat/Chat.module.css";

const EmChat = ({ closebtn }) => {
  const [messagetext, setMeeess] = useState([]);

  const nameref = useRef();

  const handlesend = () => {
    const meg = nameref.current.value;
    if (meg != " ") {
      setMeeess([...messagetext, meg]);
    }
    nameref.current.value = " ";
  };

  return (
    <Box className={chatstyles.chat_header} id="close">
      {/* customer header  */}
      <Box
        style={{
          backgroundColor: "var(--primary)",
          height: "60px",
          display: "flex",
          zIndex: "999999999",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#fff",
            color: "gray",
            marginLeft: "15px",
            marginTop: "10px",
          }}
          alt="Remy Sharp"
          // src="/broken-image.jpg"
        >
          M
        </Avatar>

        <Box sx={{ color: "#fff", marginLeft: "75px" }}>
          <Typography variant="h6" component="p">Customer Manager</Typography>
          <Typography variant="body2" component="p">Customer Manager (online)</Typography>
        </Box>

        {/* close icon  */}
       
          <CloseIcon
            sx={{
              color: "#fff",
              marginLeft: "auto",
              cursor: "pointer",
              marginTop: "4px",
              marginRight: "5px",
            }}
          onClick={closebtn}

          />
       
      </Box>

      <Paper>
        <Box
          sx={{
            height: "400px",
            position: "relative",
            border: "1px solid #dddddd",
          }}
        >
          {/* main message section  */}

          <Box sx={{ overflow: "auto" }}>
            {messagetext?.map((newmessage) => (
              <span>
                {newmessage} <br />
              </span>
            ))}
          </Box>

          {/* message bottom section  */}

          <Box
            sx={{
              py: "10px",
              position: "absolute",
              bottom: "0",
              borderTop: "1px solid #dddddd",
              display: "flex",
              width: "100%",
              overflow: "auto",
            }}
          >
            <TextareaAutosize
              type="text"
              placeholder="Type your message here..."
              id="chat-message-input"
              ref={nameref}
              style={{
                outline: "0",
                border: "0px",
                paddingLeft: "10px",
                width: "90%",
              }}
            />
            {/* <SendIcon /> */}
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{
                color: "var(--primary)",
                cursor: "pointer",
                fontSize: "17px",
                marginLeft: "15px",
              }}
              onClick={handlesend}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmChat;
