import React, { Component } from "react";
// import EmailPhone from '../share_settings/email_phone'
import {
  CheckBoxContainer,
  CheckBox,
  CheckBoxes
} from "../share_settings/user_notification";

import {
  Wrapper,
  PwLabel,
  ChangePasswordInput
} from "../share_settings/user_change_password";
import AppointmentDetails from "../share_settings/appointmentDetails/appointmentDetailsCustomerView";

import {
  Appointment,
  AppointmentList,
  Upcoming
} from "../share_settings/upcoming_appointments";
import { PastAppointment, Past } from "../share_settings/past_appointments";
import {
  Container,
  Label,
  InputField,
  LeftSide,
  ContactTitle
} from "../share_settings/contact_form";
import UserProvider, { UserContext } from "../../context/userContext";

import glamorous from "glamorous";

export const FormContainer = glamorous.div({
  // border: '1px solid blue',
  width: "100%",
  // margin: "2%",
  border: "10px 10px",
  backgroundColor: "#353A50",
  cover: "no-repeat",
  textAlign: "center",
  paddingTop: "2%"
});

const Button = glamorous.button({
  borderRadius: "7px",
  background: "#EF5B5B",
  width: "60%",
  height: "100%",
  alignSelf: "center",
  //margin: "0 1%",
  padding: "0 3%",
  fontWeight: 600,
  fontSize: "1.3em",
  color: "#EBEBEB",
  ":hover": {
    cursor: "pointer",
    boxShadow: "2px 2px gray"
  }
});

class UserSettings extends Component {

  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    location: ""
  }


  onInputChange = e => {
    const { name, value } = e.target;
  
    this.setState({ [name]: value });
  }
  
  handleSubmit = value => {
    // value.saveCustomerInfo(this.state);
    

  }

  render() {
  
    return (
      <UserProvider>
        <UserContext.Consumer>
          {value => {
            return (
              <FormContainer>
                <h3>User Settings</h3>
                {/*<UpcomingAppointments userState={value.queryResults} />*/}
                <Appointment>
                  <Upcoming>Upcoming Appointments</Upcoming>
                  <hr />
                  <AppointmentList>
                    <AppointmentDetails
                      service={"Hair Cut"}
                      time={"12:00 PM"}
                      day={"9-20-2018"}
                      company={"ProCuts"}
                      money={"45.00"}
                    />

                    <AppointmentDetails
                      service={"Hair Cut"}
                      time={"12:00 PM"}
                      day={"9-20-2018"}
                      company={"ProCuts"}
                      money={"45.00"}
                    />
                    <AppointmentDetails
                      service={"Hair Cut"}
                      time={"12:00 PM"}
                      day={"9-20-2018"}
                      company={"ProCuts"}
                      money={"45.00"}
                    />
                  </AppointmentList>
                </Appointment>
                <PastAppointment>
                  <Past>Past Appointments</Past>
                </PastAppointment>
                <Container>
                  {/*<PastAppointments userState={value} />*/}
                  {/*<ContactForm userState={value} />*/}
                  <ContactTitle>Profile Information</ContactTitle>

                  <LeftSide>
                    <Label for="test">First Name</Label>
                    <InputField
                      type="text"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onInputChange}
                      placeholder={value.name.split(" ")[0]}
                    />
                    <Label>Last Name</Label>
                    <InputField
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onInputChange}
                      type="text"
                      placeholder={value.name.split(" ")[1]}
                    />
                    <Label>Phone Number</Label>
                    <InputField
                      name="phone"
                      value={this.state.phone}
                    onChange={this.onInputChange}
                    type="text"
                    placeholder={value.phone}
                      />
                    <Label>Email</Label>
                    <InputField
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.onInputChange}
                      placeholder={value.email}
                    />
                    <Label>Location</Label>
                    <InputField
                      name="location"
                      type="text"
                      value={this.state.location}
                      onChange={this.onInputChange}
                      placeholder={value.location}
                    />
                  </LeftSide>
                </Container>

                {value.ifOAuth.includes("google") ||
                value.ifOAuth.includes("facebook") ? null : (
                  <Wrapper>
                    {/*< UserChangePassword />*/}
                    <h3>Password</h3>
                    <Label>Password</Label>

                    <ChangePasswordInput
                      type="password"
                      placeholder="password"
                      id="MyInput"
                    />
                    <PwLabel>Re-Enter Password</PwLabel>
                    <ChangePasswordInput
                      type="password"
                      placeholder="enter password"
                      id="MyInput2"
                    />
                    <PwLabel>Show Password</PwLabel>
                    <ChangePasswordInput
                      type="checkbox"
                      //onClick={showPassword}
                    />
                  </Wrapper>
                )}
                <CheckBoxContainer>
                  {/*<UserNotification />*/}
                  <h3>Communication Preferences</h3> 
                  <CheckBoxes>
                    <CheckBox>
                      <div className="pretty p-default">
                        <input type="checkbox" />
                        <div className="state p-primary">
                          <label>Email</label>
                        </div>
                      </div>
                    </CheckBox>

                    <CheckBox>
                      <div className="pretty p-default">
                        <input type="checkbox" />
                        <div className="state p-warning">
                          <label>Text</label>
                        </div>
                      </div>
                    </CheckBox>
                  </CheckBoxes>
                </CheckBoxContainer>
                <Button onClick={()=> this.handleSubmit()}>Save</Button>
              </FormContainer>
            );
          }}
        </UserContext.Consumer>
      </UserProvider>
    );
  }
}

export default UserSettings;
