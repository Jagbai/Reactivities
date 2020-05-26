import React, { useState, useEffect, Fragment } from "react";

import { Container } from "semantic-ui-react";
import { IActivity } from "./models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/nav/activities/dashboard/ActivityDashboard";
import agent from "./api/agent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  /* set activity as the state itself and setActivity as the function used to set state
  we define useState as the initial state which is an empty array of tpye IActivity */
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  /*Selected activity set as state of type activity but can also be null with initial state null*/
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };
  /* handler for select activity that filters out everything other than the activity that matches the id
as a parameter*/

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    agent.Activities.create(activity).then(() => {
      /*When we create a resource in the api we use a command but that command doesn't
      return the created resource back to the request. But we don't need it to because 
      we have a newly generated activity which is generating a guid on the client side which is the
      sent up to the server. So we create resources on the server, wait for acknowledgement that its happened
      and then send up our changes */
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleEditActivity = (activity: IActivity) => {
    agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
    });
  };

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split(".")[0];
        activities.push(activity);
      });
      setActivities(activities);
      //Pass activities through setActivities
    });
  }, []);
  //Empty array used as second parameter to stop infinitie calls

  /*axios get method returns a promise which means we
     can use a then statment to say what we want to do when 
     we get this data back from the server*/

  //ctrl+k+c to comment code

  /*When component first mounts we're going to set the states here
    We're gonna set the values to 2 different objects which wil then be output onto our screen */

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          //Pass activities as a prop to activity dashboard
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};
export default App;
