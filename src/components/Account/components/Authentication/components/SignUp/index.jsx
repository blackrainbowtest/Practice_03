import { useEffect, useState } from "react";
import FormComponent from "../_common/Form";
import HeaderComponent from "../_common/Header";
import InputComponent from "../_common/Input/InputComponent";
import SubmitButtonComponent from "../_common/SubmitButton";
import LinkComponent from "../_common/Link";
import { passwordCheck } from "../../../../../../utils/dataCheckLogic";
import { useDispatch, useSelector } from "react-redux";
import { addUser, checkUser } from "../../../../../../features/user/userAPI";
import { setLoginErrors } from "../../../../../../features/user/userSlice";

export default function SignUp({ setIsSignIn, isSignIn }) {
  const dispatch = useDispatch();
  const loginErrors = useSelector((state) => state?.user?.loginErrors);

  const [userData, setUserData] = useState({
    login: "user1",
    password: "123456aA*",
    confirmPassword: "123456aA*",
    email: "test@gmail.com",
  });

  const [dataErrors, setDataErrors] = useState({
    login: [],
    password: [],
    confirmPassword: [],
    email: [],
  });

  const handleSubmitAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = userData;
    delete data.confirmPassword;
    dispatch(addUser(data));
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    const allowedCharactersRegex = /^[a-zA-Z0-9._]*$/;
    if (allowedCharactersRegex.test(inputValue)) {
      setDataErrors({ ...dataErrors, login: [] });
      setUserData({ ...userData, login: inputValue });
      dispatch(setLoginErrors({}));
      dispatch(checkUser({ login: inputValue }));
    } else {
      setDataErrors({
        ...dataErrors,
        login: "Invalid characters are not allowed",
      });
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    passwordCheck(passwordValue, setDataErrors, dataErrors);
    setUserData({ ...userData, password: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    if (userData.password === e.target.value) {
      setDataErrors({ ...dataErrors, confirmPassword: [] });
    } else {
      setDataErrors({ ...dataErrors, confirmPassword: "Password mismatch" });
    }
    setUserData({ ...userData, confirmPassword: e.target.value });
  };

  const handleEmailChange = (e) => {
    setDataErrors({ ...dataErrors, email: [] });
    setUserData({ ...userData, email: e.target.value });
    dispatch(setLoginErrors({}));
    dispatch(checkUser({ email: e.target.value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignIn((prev) => !prev);
  };

  useEffect(() => {
    if (loginErrors?.login) {
      setDataErrors({
        ...dataErrors,
        login: loginErrors.login,
      });
    } else if (loginErrors?.email) {
      setDataErrors({
        ...dataErrors,
        email: loginErrors.email,
      });
    }
  }, [loginErrors])

  return (
    <>
      <HeaderComponent title={"Sign Up"} />
      <FormComponent handleSubmitAction={handleSubmitAction}>
        <InputComponent
          handleChange={handleNameChange}
          type={"text"}
          required={true}
          label={"Login"}
          value={userData.login}
          errors={dataErrors.login}
        />
        <InputComponent
          handleChange={handleEmailChange}
          type={"email"}
          required={true}
          label={"Email"}
          value={userData.email}
          errors={dataErrors.email}
        />
        <InputComponent
          handleChange={handlePasswordChange}
          type={"password"}
          required={true}
          label={"Password"}
          value={userData.password}
          errors={dataErrors.password}
        />
        <InputComponent
          handleChange={handleConfirmPasswordChange}
          type={"password"}
          required={true}
          label={"Comfirm password"}
          value={userData.confirmPassword}
          errors={dataErrors.confirmPassword}
        />
        <LinkComponent handleChange={handleSignIn} isSignIn={isSignIn} />
        <SubmitButtonComponent value={"Sign in"} />
      </FormComponent>
    </>
  );
}
