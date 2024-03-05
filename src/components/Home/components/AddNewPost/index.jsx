import { useState } from "react";
import styles from "./style.module.css";
import FormComponent from "../../_common/Form";
import SubmitButtonComponent from "../../_common/SubmitButton";
import PopapComponent from "../../../_commonComponents/PopapComponent";
import TextBoxComponent from "./components/TextBox";
import ImageBoxComponent from "./components/ImageBox";
import ChooesedImagesBox from "./components/ChooesedImagesBox";

export default function AddNewPost() {
  const [isNew, setIsNew] = useState(false);
  const [text, setText] = useState('')

  const newPostHandle = (e) => {
    setIsNew((prev) => !prev);
  };
  const textChangeHandle = (e) => {
    setText(e.target.value)
  }
  return (
    <>
      {isNew ? (
        <PopapComponent handleChange={newPostHandle}>
          <div className={styles.mainContainer} onClick={e => e.stopPropagation()}>
            <FormComponent handleSubmitAction={newPostHandle}>
              <TextBoxComponent value={text} callback={textChangeHandle}/>
              <ImageBoxComponent />
              <ChooesedImagesBox />
              <SubmitButtonComponent value={"Send"} />
            </FormComponent>
          </div>
        </PopapComponent>
      ) : (
        ""
      )}

      <div className={styles.postBox} onClick={newPostHandle}>
        +
      </div>
    </>
  );
}
