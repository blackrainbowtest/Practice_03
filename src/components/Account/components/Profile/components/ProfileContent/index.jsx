import { useDispatch, useSelector } from "react-redux";

import styles from "./style.module.css";
import { useState } from "react";
import SubmitButtonComponent from "../../../../_common/SubmitButton";
import EditProfile from "../EditProfile";
import LabelComponent from "../../../../_common/Label";

export default function ProfileContent() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const data = useSelector((state) => state?.user?.data);

  const changeEditHandle = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <>
      {data?.id ? (
        <div className={styles.profileBox}>
          {isEdit ? (
            <EditProfile />
          ) : (
            <>
                <LabelComponent data={data.login} title={"Login"}/>
                <LabelComponent data={data.userName} title={"Name"}/>
                <LabelComponent data={data.email} title={"Email"}/>
                <LabelComponent data={data.userSurname} title={"Surname"}/>
                <LabelComponent data={"********"} title={"Password"}/>
                <LabelComponent data={data.userBirthday} title={"Birthday"}/>
            </>
          )}
        </div>
      ) : (
        ""
      )}

      <div className={styles.mainContainer}>
        <div className={styles.submitButton} onClick={changeEditHandle}>
          <SubmitButtonComponent value={isEdit ? "Save" : "Edit"} />
        </div>
      </div>
    </>
  );
}
