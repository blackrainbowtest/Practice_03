import { useState } from "react";
import styles from "./style.module.css";
import FormComponent from "../../_common/Form";
import SubmitButtonComponent from "../../_common/SubmitButton";

export default function AddNewPost() {
    const [isNew, setIsNew] = useState(false)

    const newPostHandle = (e) => {
        e.preventDefault()
        setIsNew(prev => !prev)
    }
  return (
    <>
        {
            isNew ? (
                <FormComponent handleSubmitAction={newPostHandle}>
                    <textarea name="" id="" cols="45" rows="3" style={{resize: "none"}}></textarea>
                    <SubmitButtonComponent value={"Send"} />
                </FormComponent>
            ): ""
        }
      <div className={styles.postBox} onClick={newPostHandle}>+</div>
    </>
  );
}
