import styles from "./style.module.css";
import defaultStyles from "../../../../../_commonStyles/commonDefault.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsRemember } from "../../../../../../features/user/userSlice";

export default function RememberMeComponent() {
  const isRemember = useSelector((state) => state?.user?.isRemember);
  const dispatch = useDispatch();
  const labelStyle = `
  ${defaultStyles.dFlex} ${defaultStyles.aic} ${defaultStyles.jcs} ${defaultStyles.pointer}
  `

  return (
    <label
      className={labelStyle}
    >
      <input
        type="checkbox"
        value={isRemember}
        onChange={() => dispatch(setIsRemember(!isRemember))}
      />
      <p className={styles.rememberText}>Remember me</p>
    </label>
  );
}
