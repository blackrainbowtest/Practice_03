import { useState } from "react";
import InputComponent from "../../../../_common/Input/InputComponent";
import { useSelector } from "react-redux";
import FormComponent from "../../../../_common/Form";
import styles from "./style.module.css"

import {
  emailCheck,
  loginCheck,
  passwordCheck,
  userNameCheck,
  userSurnameCheck,
} from "../../../../../../utils/dataCheckLogic";
import SubmitButtonComponent from "../../../../_common/SubmitButton";

export default function EditProfile({ callback }) {
  const data = useSelector((state) => state?.user?.data);
  const [userData, setUserData] = useState({
    login: data.login,
    password: "",
    email: data.email,
    userName: data.userName,
    userSurname: data.userSurname,
    userBirthday: data.userBirthday && "",
  });
  const [modificatedData, setModificatedData] = useState([]);
  const [dataErrors, setDataErrors] = useState({
    login: [],
    password: [],
    email: [],
    userName: [],
    userSurname: [],
    userBirthday: [],
  });

  const handleChange = (e, key) => {
    const inputValue = e.target.value;
    if (key === "login") {
      loginCheck(inputValue, setDataErrors, dataErrors);
      setUserData({ ...userData, [key]: inputValue });
    } else if (key === "password") {
      passwordCheck(inputValue, setDataErrors, dataErrors);
      setUserData({ ...userData, [key]: inputValue });
    } else if (key === "userName") {
      userNameCheck(inputValue, setDataErrors, dataErrors);
      setUserData({ ...userData, [key]: inputValue });
    } else if (key === "userSurname") {
      userSurnameCheck(inputValue, setDataErrors, dataErrors);
      setUserData({ ...userData, [key]: inputValue });
    } else if (key === "email") {
      emailCheck(inputValue, setDataErrors, dataErrors);
      setUserData({ ...userData, [key]: inputValue });
    } else if (key === "userBirthday") {
      console.log(inputValue);
      setUserData({ ...userData, [key]: inputValue });
    }
    if(inputValue.trim()) {
      setModificatedData((prev) => {
        if (!prev.includes(key)) {
          return [...prev, key];
        }
        return prev;
      });
    } else {
      setModificatedData((prev) => {
        return prev.filter((item) => item !== key)
      });
    }
  };
  return (
    <>
      <FormComponent>
        <InputComponent
          handleChange={(e) => handleChange(e, "login")}
          label="Login"
          value={userData.login}
          errors={dataErrors.login}
        />
        <InputComponent
          handleChange={(e) => handleChange(e, "email")}
          label="Email"
          value={userData.email}
          errors={dataErrors.email}
          type={"email"}
        />
        <InputComponent
          handleChange={(e) => handleChange(e, "password")}
          label="Password"
          value={userData.password}
          errors={dataErrors.password}
          required={false}
          type="password"
        />
        <InputComponent
          handleChange={(e) => handleChange(e, "userName")}
          label="Name"
          value={userData.userName}
          errors={dataErrors.userName}
          required={false}
        />
        <InputComponent
          handleChange={(e) => handleChange(e, "userSurname")}
          label="Surname"
          value={userData.userSurname}
          errors={dataErrors.userSurname}
          required={false}
        />
        <InputComponent
          handleChange={(e) => handleChange(e, "userBirthday")}
          label="Birthday"
          value={userData.userBirthday}
          errors={dataErrors.userBirthday}
          required={false}
          type="date"
        />
        <div className={styles.mainContainer}>
          <div className={styles.submitButton} onClick={(e) => {
            e.preventDefault()
            if(Object.values(dataErrors).every((errorsArray) => errorsArray.length === 0)) {
              callback(modificatedData, userData)
            }
          }}>
            <SubmitButtonComponent value={"Save"} />
          </div>
        </div>
      </FormComponent>
    </>
  );
}
