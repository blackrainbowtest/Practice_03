import HeaderComponent from "../../../../_common/Header";
import FormComponent from "../../../../_common/Form";
import SubmitButtonComponent from "../../../../_common/SubmitButton";
import InputComponent from "../../../../_common/Input/InputComponent";
import { useState } from "react";
import LinkComponent from "../../../../_common/Link";
import { useDispatch } from "react-redux";
import { getUser } from "../../../../../../features/user/userAPI";
import RememberMeComponent from "../RememberMe";

export default function SignIn({ setIsSignIn, isSignIn, handleChange }) {
  const [login, setLogin] = useState("user1");
  const [password, setPassword] = useState("123456aA*");
  const [loginError, setLoginError] = useState([]);

  const dispatch = useDispatch();

  const handleSubmitAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(getUser({ login, password }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleChange((prev) => !prev);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignIn((prev) => !prev);
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const allowedCharactersRegex = /^[a-zA-Z0-9._]*$/;
    if (allowedCharactersRegex.test(inputValue)) {
      setLoginError([]);
      setLogin(e.target.value);
    } else {
      setLoginError("Invalid characters are not allowed");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <HeaderComponent title={"Sign In"} />
      <FormComponent handleSubmitAction={handleSubmitAction}>
        <InputComponent
          handleChange={handleNameChange}
          type={"text"}
          required={true}
          label={"Login"}
          value={login}
          autoComplete={"username"}
          errors={loginError}
        />
        <InputComponent
          handleChange={handlePasswordChange}
          type={"password"}
          required={true}
          label={"Password"}
          value={password}
          autoComplete={"current-password"}
        />
        <LinkComponent
          handleChange={handleSignUp}
          isSignIn={isSignIn}
          handleForgotPassword={handleForgotPassword}
        />
        <RememberMeComponent />
        <SubmitButtonComponent value={"Sign in"} />
      </FormComponent>
    </>
  );
}
