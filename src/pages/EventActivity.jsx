import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect } from "react";
import "../styles/eventActivity.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const [dataEvent, setDataEvent] = React.useState([]);

  const loadActivity = async () => {
    const path = window.location.pathname.split("/")[2];
    const response = await fetch(
      `http://localhost:3000/activity/byEvent/${path}`
    );
    const data = await response.json();
    setDataEvent(data);
    console.log(data);
  };

  useEffect(() => {
    loadActivity();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <section className="containerShowA">
      {dataEvent.map((activity, index) => (
        <Card key={activity.id} sx={{ maxWidth: 345, marginRight: ".5rem" }} className="card">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={activity.name}
            subheader={activity.createdAt}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://images.pexels.com/photos/5935232/pexels-photo-5935232.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Paella dish"
          />
          <CardContent>
            <Typography>
              {activity.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph >Participantes</Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, sint quae similique repellat porro cupiditate, nemo voluptatem ad nulla exercitationem reprehenderit ea fuga magni atque, molestiae officiis voluptas veritatis commodi!
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </section>
  );
}
