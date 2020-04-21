import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Header, Icon, List, Container } from "semantic-ui-react";
import { IActivity } from "./models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/nav/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>();

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  /*axios get method returns a promise which means we
     can use a then statment to say what we want to do when 
     we get this data back from the server*/

  //ctrl+k+c to comment code

  /*When component first mounts we're going to set the states here
    We're gonna set the values to 2 different objects which wil then be output onto our screen */

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};
export default App;
