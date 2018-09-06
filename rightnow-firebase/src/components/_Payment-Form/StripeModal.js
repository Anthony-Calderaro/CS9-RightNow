import React, { Component } from "react";
import glamorous from "glamorous";
import moment from "moment";
import axios from "axios";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";

export const Darkness = glamorous.div({
  height: "100vh",
  width: "100vw",
  position: "fixed",
  background: "rgba(0, 0, 0, 0.65)",
  zIndex: 5,
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const Modal = glamorous.div({
  height: "30vh",
  width: "30vw",
  zIndex: 6,
  borderRadius: "5px",
  background: "#EBEBEB",
  display: "flex",
  flexDirection: "column",

  "@media(max-width: 1550px)": {
    height: "40vh",
    width: "40vw"
  }
});

const createOptions = (fontSize, padding) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          zIndex: "7",
          '::placeholder': {
              color: '#aab7c4',
              background: "black",
            },
        },
        border: "1px solid black",
        invalid: {
          color: '#9e2146',
        },
      },
    };
   };

const Label = glamorous.label({
    color: "#6b7c93",
    fontWeight: 300,
    letterSpacing: "0.025em",
    display: "flex",
    justifyContent: "space-around",
    

  });
  
  const Button = glamorous.button({
    whiteSpace: "nowrap",
    border: 0,
    outline: 0,
    display: "inline-block",
    boxShadow: "0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.025em",
    backgroundColor: "#6772e5",
    textDecoration: "none",
    // -webkit-transition: all 150ms ease,
    transition: "all 150ms ease",
    width: "50%",
    padding: "2% 0",
    alignSelf: "flex-end",
    marginRight: "25%",

    ":hover": {
        color: "#fff",
        cursor: "pointer",
        backgroundColor: "#7795f8",
        transform: "translateY(-1px)",
        boxShadow: "0 7px 14px rgba(50, 50, 93, .10), 0 3px 6px rgba(0, 0, 0, .08)",
    }
  });
  
  const StripeStyles = glamorous.div({
     width: "65%",
     background: "white",
     boxShadow: "rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px",
     margin: "auto",

  });

  const Form = glamorous.form({
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      margin: "3%",
      position: "relative"
  });

class StripeForm extends Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? "14px" : "18px"
    };
    window.addEventListener("resize", () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== "14px") {
        this.setState({ elementFontSize: "14px" });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== "18px"
      ) {
        this.setState({ elementFontSize: "18px" });
      }
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    
    const token = await this.props.stripe
      .createToken()
      .then(({ token }) => token) // { stripeToken: token }
      .catch(err => console.log("error with stripe token\n", err));

    console.log("here's a token", token);
    axios
      .post("http://localhost:5000/cs9-rightnow/us-central1/haveAsesh/stripe", {
        stripeToken: token
      })
      .then(res => console.log(res))
      .catch(err => console.log("error", err));

    this.props.busnContext.updateState({ display_payment_modal: false })
  };

  render() {
    console.log(this.props);
    return (
      <Darkness>
        <Modal>
            <Form onSubmit={() => this.handleSubmit()}>
                <Label>Card number<StripeStyles><CardNumberElement {...createOptions(this.state.elementFontSize)}/></StripeStyles></Label>
                <Label>Expiration date<StripeStyles><CardExpiryElement {...createOptions(this.state.elementFontSize)} /></StripeStyles></Label>
                <Label>CVC<StripeStyles><CardCVCElement {...createOptions(this.state.elementFontSize)} /></StripeStyles></Label>
                <Label>Postal code<StripeStyles><PostalCodeElement {...createOptions(this.state.elementFontSize)}/></StripeStyles></Label>
                <Button>Pay</Button>
            </Form>
        </Modal>
      </Darkness>
    );
  }
}

export default injectStripe(StripeForm);
