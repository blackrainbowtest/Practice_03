import { useState } from "react";
import Container from "../Container";
import FormComponent from "../../../../_common/Form";
import HeaderComponent from "../../../../_common/Header";
import InputComponent from "../../../../_common/Input/InputComponent";
import SubmitButtonComponent from "../../../../_common/SubmitButton";

export default function ForgotPassword({handleChange}) {
  const [email, setEmail] = useState("")

  const handleBoxClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmitAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Your email sended");
    handleChange(prev => !prev)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div onClick={handleBoxClick}>
      <Container>
        <HeaderComponent title={"Enter your email"} />
        <FormComponent handleSubmitAction={handleSubmitAction}>
          <InputComponent
            handleChange={handleEmailChange}
            type={"email"}
            required={true}
            label={"Email"}
            value={email}
          />
          <SubmitButtonComponent value={"Send"} />
        </FormComponent>
      </Container>
    </div>
  );
}
