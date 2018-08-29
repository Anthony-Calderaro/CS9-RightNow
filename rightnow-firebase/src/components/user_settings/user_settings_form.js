import React, {Component} from 'react';
import EmailPhone from '../share_settings/email_phone'
import UserNotification from '../share_settings/user_notification';
import UserChangePassword from '../share_settings/user_change_password';
import UpcomingAppointments from '../share_settings/upcoming_appointments';
import PastAppointments from '../share_settings/past_appointments';
import ContactForm from '../share_settings/contact_form';
import glamorous from "glamorous";

export const FormContainer = glamorous.div({
    // border: '1px solid blue',
    width: '100%',
});

const Button = glamorous.button({
    borderRadius: '7px',
    background: '#00c6fd',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    margin: '0 1%',
    padding: '0 3%',
    fontWeight: 600,
    fontSize: '1.3em',
    color: '#EBEBEB',
    ':hover': {
        cursor: 'pointer',
        boxShadow: '2px 2px gray'
    }
});

class UserSettings extends Component {

    render() {
        return (
            <div>
                <h1>User Settings</h1>
                <FormContainer>
                    <UpcomingAppointments />
                    <PastAppointments />
                    <ContactForm/>
                    <UserChangePassword/>
                    <h1>Notifications</h1>
                    <UserNotification/>
                    <Button>Save</Button>
                </FormContainer>
            </div>
        );
    }
}

export default UserSettings;