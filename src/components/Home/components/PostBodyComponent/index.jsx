import PopapComponent from "../../../_commonComponents/PopapComponent"
import FormComponent from "../../_common/Form"
import InputComponent from "../../_common/Input/InputComponent"
import SubmitButtonComponent from "../../_common/SubmitButton"
import ChooesedImagesBox from "./components/ChooesedImagesBox"
import ImageBoxComponent from "./components/ImageBox"
import TextBoxComponent from "./components/TextBox"
import styles from "./style.module.css"

export default function PostBodyComponent({
    setSelectedImages,
    title,
    text,
    changePostHandle,
    newPostHandle,
    changeTitleHandle,
    textChangeHandle,
    selectedImages
}) {
    return(
        <PopapComponent handleChange={changePostHandle}>
          <div
            className={styles.mainContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <FormComponent handleSubmitAction={newPostHandle}>
              <InputComponent
                label="Title"
                value={title}
                handleChange={changeTitleHandle}
              />
              <TextBoxComponent
                value={text}
                handleChange={textChangeHandle}
                label="Post text"
              />
              {selectedImages.length < 10 ? (
                <ImageBoxComponent
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
              ) : (
                ""
              )}
              {selectedImages.length > 0 ? (
                <ChooesedImagesBox
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
              ) : (
                ""
              )}
              <SubmitButtonComponent value={"Send"} />
            </FormComponent>
          </div>
        </PopapComponent>
    )
}