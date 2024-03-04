import { useDispatch, useSelector } from "react-redux";

import styles from "./style.module.css";
import { useState } from "react";
import SubmitButtonComponent from "../../../../_common/SubmitButton";
import EditProfile from "../EditProfile";
import LabelComponent from "../../../../_common/Label";
import FormComponent from "../../../../_common/Form";
import { patchUser } from "../../../../../../features/user/userAPI";

export default function ProfileContent() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const data = useSelector((state) => state?.user?.data);

  const changeEditHandle = (e) => {
    e.preventDefault()
    setIsEdit((prev) => !prev);
  };

  const callback = (childArray, childData) => {
    const resultObject = {id: data.id};

    childArray.forEach((key) => {
      if (childData.hasOwnProperty(key)) {
        resultObject[key] = childData[key];
      }
    });
    setIsEdit((prev) => !prev);
    dispatch(patchUser(resultObject))
  };

  return (
    <>
      {data?.id ? (
        <div className={styles.profileBox}>
          {isEdit ? (
            <EditProfile callback={callback} />
          ) : (
            <FormComponent>
              <LabelComponent data={data.login} title={"Login"} />
              <LabelComponent data={data.email} title={"Email"} />
              <LabelComponent data={"********"} title={"Password"} />
              <LabelComponent data={data.userName} title={"Name"} />
              <LabelComponent data={data.userSurname} title={"Surname"} />
              <LabelComponent data={data.userBirthday} title={"Birthday"} />
              <div className={styles.mainContainer}>
                <div className={styles.submitButton} onClick={changeEditHandle}>
                  <SubmitButtonComponent value={"Edit"} />
                </div>
              </div>
            </FormComponent>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
