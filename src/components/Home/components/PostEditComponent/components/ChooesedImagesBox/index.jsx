import styles from "./style.module.css"

export default function ChooesedImagesBox({selectedImages, setSelectedImages}) {
    return (
        <div className={styles.imagesBox}>
            {
                selectedImages.map((image, index) => {
                    return (
                        <div key={index} className={styles.imageContainer}>
                            <img key={index} src={URL.createObjectURL(image)} alt="" />
                            <div className={styles.deleteButton} onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setSelectedImages(prev => prev.filter((_, ind) => ind !== index))
                            }}>X</div>
                        </div>
                    )
                })
            }
        </div>
    )
}