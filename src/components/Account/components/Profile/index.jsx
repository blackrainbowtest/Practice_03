import commonDefault from "../../../_commonStyles/commonDefault.module.css";
import commonStyle from "../../../_commonStyles/commonStyle.module.css";
import AnimatedBackground from "./components/AnimatedBackground";
import ProfileContent from "./components/ProfileContent";

export default function ProfileComponent() {
  const containerStyle = `
    ${commonDefault.dFlex} ${commonDefault.jcc} ${commonDefault.aic} ${commonStyle.WHMax} ${commonDefault.relative}
    `;

  return (
    <div className={containerStyle}>
        <AnimatedBackground>
            <ProfileContent />
        </AnimatedBackground>
    </div>
  );
}
