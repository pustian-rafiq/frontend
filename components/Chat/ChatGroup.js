import React, { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WhatsAppWidget from 'react-whatsapp-widget';

import EmChat from "./EmChat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";
import WhatsApp from "./WhatsApp";


const actions = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faComment} style={{ fontSize: '26px', color: '#fff', textAlign: 'center', }} className="messebger-chat" />,
    name: "Live Chat"
  },
  { id: 2, icon: <WhatsApp />, name: "Whats Up" },
];

const ChatGroup = () => {
  const [name, setName] = useState(false)
  const [open, setOpen] = useState(false)
  const [chatType, setChatType] = useState(null)


  const chatHandler = (id) => {
    setName(true);

    if (id === 1) {
      setChatType("liveChat");
    } else {
      setChatType("whatsApp");
    }

    const closeid = document.getElementById('close');
    closeid?.style.display = 'block'
  }

  const closeEmChatHandler = () => {
    setName(false);
    document.getElementById('close').style.display = 'none'
  }

  // open handler 
  const chatGroupHander = () => {
    setOpen(!open);
  }

  if(typeof window !== "undefined"){
    const chatGroup = document.getElementById("speedDial");
    chatGroup && chatGroup.children[0].addEventListener("click", chatGroupHander)
  }

  return (
    <>
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        id="speedDial"
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: "60px", right: "10px", '& > button': { width: "40px", height: "40px", backgroundColor: 'salmon' } }}
        icon={
          <span> 
          <FontAwesomeIcon icon={faCommentMedical}
            style={{
              fontSize: '26px',
              color: '#fff',
              textAlign: 'center',
            }}
            className="messebger-chat"
          />
          </span>
        }
        open={open}
      >
        {actions.map((action) => (
         
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => chatHandler(action.id)}
            sx={{ backgroundColor: 'var(--primary)' }}
          />
        ))}

      </SpeedDial>
      <span> 
      {name && chatType === "liveChat" && <EmChat closebtn={closeEmChatHandler} />}
      </span>
    </Box>
     </>
  );
};

export default ChatGroup;
