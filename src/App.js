import React, { Component } from "react";
import "./App.css";
import ViewUser from "./components/ViewUser";
import { getUsers } from "./Api/Users";
import { deleteUser, updateUser, addUser } from "./Api/Users";
import UsersForm from "./components/UsersForm";
class App extends Component {
  state = {
    users: [],
    user: {},
  };

  componentDidMount = () => {
    getUsers()
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        alert("connexion maybe");
      });
  };

  setActive = (user) => {
    this.setState({ user: user });
  };

  deleteUser = (user) => {
    //delete from server
    deleteUser(user.id)
      .then(() => {
        // delete from state
        let users = this.state.users;
        const index = users.indexOf(user);
        users.splice(index, 1);
        this.setState({ users });
      })
      .catch((error) => {
        alert("error happned");
      });
  };

  updateUser = (values) => {
    const id = this.state.user.id;
    updateUser(id, values)
      .then(() => {
        alert("success");
      })
      .catch((error) => {
        alert("error happned");
      });
  };

  addUser = (values) => {
    addUser(values)
      .then(() => {
        alert("success");
      })
      .catch((error) => {
        alert("error happned");
      });
  };

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}>
              {user.name}{" "}
              <button onClick={() => this.setActive(user)}>view</button>
              <button onClick={() => this.deleteUser(user)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <h3>User Details </h3>
          {this.state.user.id > 0 ? (
            <ViewUser user={this.state.user} />
          ) : (
            "please select a user "
          )}
        </div>

        <div>
          <h3>Edit User </h3>
          {this.state.user.id > 0 ? (
            <UsersForm values={this.state.user} onSubmit={this.updateUser} />
          ) : (
            "please select a user "
          )}
        </div>

        <div>
          <h3>Add new User </h3>
          <UsersForm
            values={{
              name: "",
              email: "",
            }}
            onSubmit={this.addUser}
          />
        </div>
      </div>
    );
  }
}

export default App;
