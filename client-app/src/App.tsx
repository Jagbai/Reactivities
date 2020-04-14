import React, { Component } from "react";

import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
    //When component first loads state is going to be an empty array inside
    //The values property
  };
  /*axios get method returns a promise which means we
     can use a then statment to say what we want to do when 
     we get this data back from the server*/
  componentDidMount() {
    axios.get("http://localhost:5001/api/values").then((response) => {
      this.setState({
        values: response.data,
      });
    });
  }

  /*When component first mounts we're going to set the states here
    We're gonna set the values to 2 different objects which wil then be output onto our screen */

  render() {
    return (
      <div className="App">
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>

        {/*We use this because its in reference to the 
            class from above, we're also using map like a sexy foreach */}
      </div>
    );
  }
}

export default App;
