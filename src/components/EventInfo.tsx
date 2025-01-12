import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { IEventInfo } from "./EventCalendar";

interface IProps {
  event: IEventInfo;
}

const EventInfo = ({ event }: IProps) => {
  console.log(event);
  return (
    <>
      {/* <Typography gutterBottom variant="h5" component="div">
        {event.description}
      </Typography>
      {event.pleople} */}

      {/* <List sx={{ width: "100%", maxWidth: 360 }}> */}
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MeetingRoomIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Nombre de reunión"
            secondary={event.description}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Responsable" secondary={event.pleople} />
        </ListItem>
      </List>
    </>
  );
};

export default EventInfo;
