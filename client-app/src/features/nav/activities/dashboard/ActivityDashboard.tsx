import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../../app/layout/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "./details/ActivityDetails";
import ActivityForm from "./form/ActivityForm";

interface IProps {
  activities: IActivity[];
  //Pass activities down as a prop
}

const ActivityDashboard: React.FC<IProps> = ({ activities }) => {
  //Cant use props without making comp a type Functional component
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetails />
        <ActivityForm />
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
