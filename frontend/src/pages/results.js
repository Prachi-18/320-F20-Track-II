import React from "react";
import Radar from "./chart/chart";
import { withStyles, Typography, Box, Grid, Button } from "@material-ui/core";


const TextTypography = withStyles({
  root: {
    color: "#373a3c"
  }
})(Typography);

function Results({pages, setPages, activePage, setActivePage}) {
  function goToStakeholders(){
    if (!pages.stakeholders.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.stakeholders.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'stakeholders');
  }
  function goToFeedback(){
    if (!pages.feedback.visited) {
      setPages(prevPages => {
        let copy = {...prevPages};
        copy.feedback.visited = true;
        return copy;
      });
    }
    setActivePage(prevPage => 'feedback');
  }
  let Summary_Value = 2.03;
  let Coverage = { Safety: 0.5, Salary: 0.667, Reputation: 1.0, Privacy: 0.8 };
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Box mt = {5}>
          <TextTypography variant="h4" align="center" gutterBottom>
            Coverage Of Issues
          </TextTypography>
        </Box>
      </Grid>
      <Grid container direction="row" justify="space-between">
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation onClick={goToStakeholders}>Back</Button>
        </Grid>
        <Grid item style={{ marginRight: "2rem", marginRight: "0rem", marginTop: "-3rem" }}>
          <Button variant="contained" disableElevation color="primary" onClick={goToFeedback}>Next</Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Box m="2rem">
            <Radar coverage={Coverage} summary={Summary_Value} />
          </Box>
          <TextTypography variant="body1">
            Artificial intelligence and machine learning technologies are
            rapidly transforming society and will continue to do so in the
            coming decades. This social transformation will have deep ethical
            impact, with these powerful new technologies both improving and
            disrupting human lives. AI, as the externalization of human
            intelligence, offers us in amplified form everything that humanity
            already is, both good and evil. Much is at stake. At this crossroads
            in history we should think very carefully about how to make this
            transition, or we risk empowering the grimmer side of our nature,
            rather than the brighter.
          </TextTypography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Results;
