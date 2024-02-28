import { useState } from "react";
import FormComponent from "../_common/Form";
import HeaderComponent from "../_common/Header";
import InputComponent from "../_common/Input/InputComponent";
import SubmitButtonComponent from "../_common/SubmitButton";
import LinkComponent from "../_common/Link";

export default function SignUp({ setIsSignIn, isSignIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleSubmitAction");
  };

  const handleNameChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignIn((prev) => !prev);
  };

  return (
    <>
      <HeaderComponent title={"Sign Up"} />
      <FormComponent handleSubmitAction={handleSubmitAction}>
        <InputComponent
          handleChange={handleNameChange}
          type={"text"}
          required={true}
          label={"Username"}
          value={login}
          autoComplete={"username"}
        />
        <InputComponent
          handleChange={handlePasswordChange}
          type={"password"}
          required={true}
          label={"Password"}
          value={password}
          autoComplete={"current-password"}
        />
        <LinkComponent handleChange={handleSignIn} isSignIn={isSignIn} />
        <SubmitButtonComponent value={"Sign up"} />
      </FormComponent>
    </>
  );
}
