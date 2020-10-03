import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Stakeholder ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function VirtualizedList() {
  const classes = useStyles();

  let [showList, setShowContent] = React.useState(true);

  const toggleShow = () => {
    setShowContent(show => !show)
  };

  return (
    <div className={classes.root}>
      <Button onClick={toggleShow}>Gathered Information</Button>
      {showList &&
        <List>
          <ListItem button>
            <ListItemText height={400} width={300}>
              StakeHolder 1
          </ListItemText>
          </ListItem>

          <ListItem button>
            <ListItemText height={400} width={300}>
              StakeHolder 2
          </ListItemText>
          </ListItem>
        </List>
      }
    </div>
  );
}