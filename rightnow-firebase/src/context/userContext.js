import React, { Component } from "react";
import firebase from "../firebase/firebase";
import axios from "axios";


export const UserContext = React.createContext();


export default class UserProvider extends Component {

  state = {
    uid: "",
    name: "",
    email: "",
    phone: "",
    photo: "",
    location: "",
    appointments: [],
    
    theo_appt_details: {},
    displayConfirm: false,

    query: "",
    queryResults: [],
    finished: false,
    lets_display: false,
    this_is_it: null,

    userSignedIn: false,

    updateState: async data => {
      await this.setState(data);
      console.log(this.state.query);
    },  

    handleSearch: async () => {
      const data = await axios
        .get(`https://us-central1-cs9-rightnow.cloudfunctions.net/haveAsesh/appointment?term=${this.state.query}`)
        .then(res => this.setState({ queryResults: res.data, finished: true }))
        .catch(err => console.log("error", err));
      return data;
    },

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      user.getIdTokenResult().then(token => console.log(token)).catch(err => console.log("error", err));
      if (user && !this.state.userSignedIn) {
        this.setState({
          userSignedIn: true,
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.email,
          photo: user.photoURL
        });
      }
      if (!user && this.state.userSignedIn) {
        this.setState({
          userSignedIn: false,
          uid: null,
          name: null,
          email: null,
          phone: null,
          photo: null
        });
      }
    });

    // firebase.auth().currentUser.getIdTokenResult().then(token => console.log(token)).catch(err => console.log("error", err));
  }


  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}


/*


DIRECTIONS TO USE CONTEXT:

  0. open the component file that you're working on

  1. import { UserContext } from "../some_path/context/userContext";

  2. inside of your render/return ...

    <UserContext.Consumer>
      {value => {

        // you can update state via value.updateState({ key: value })
        // you can access name, email, phone, etc. via value.data

        return (
          // whatever you want the component to display
          // see login_modal.js lines 43-56 for example
        )
        
      }}
    </UserContext.Consumer>

*/