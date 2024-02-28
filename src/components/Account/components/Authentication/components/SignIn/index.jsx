import HeaderComponent from "../_common/Header";
import FormComponent from "../_common/Form";
import SubmitButtonComponent from "../_common/SubmitButton";
import InputComponent from "../_common/Input/InputComponent";
import { useState } from "react";
import LinkComponent from "../_common/Link";

export default function SignIn({ setIsSignIn, isSignIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleSubmitAction");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleForgotPassword");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignIn((prev) => !prev);
  };

  const handleNameChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <HeaderComponent title={"Sign In"} />
      <FormComponent handleSubmitAction={handleSubmitAction}>
        <InputComponent handleChange={handleNameChange} type={"text"} required={true} label={"Username"} value={login} autoComplete={"username"}/>
        <InputComponent handleChange={handlePasswordChange} type={"password"} required={true} label={"Password"} value={password} autoComplete={"current-password"}/>
        <LinkComponent handleChange={handleSignUp} isSignIn={isSignIn} handleForgotPassword={handleForgotPassword} />
        <SubmitButtonComponent value={"Sign in"} />
      </FormComponent>
    </>
  );
}
