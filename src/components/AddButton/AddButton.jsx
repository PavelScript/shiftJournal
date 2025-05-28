import styles from "./AddButton.module.scss"
import AddModalZayavka from "../AddModalZayavka/AddModalZayavka";
import {React, useState} from "react";

const AddButton = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <button onClick={()=> setShowModal(true)} className={styles.addButton}>+ <br></br> <p className={styles.textButton}>Добавить заявку</p></button>
        {showModal && <AddModalZayavka onClose={() => setShowModal(false)} />}
        </>
    )

}

export default AddButton;