import AnimatedBackground from "./components/AnumatedBackground";
import commonStyle from "../../../_commonStyles/commonStyle.module.css";
import Container from "./components/Container";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useState } from "react";

export default function Authentication() {
  const containerStyle = `
        ${commonStyle.dFlex} ${commonStyle.jcc} ${commonStyle.aic}
    `;

  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <div className={containerStyle}>
      <AnimatedBackground />
      <Container>{isSignIn ? <SignIn setIsSignIn={setIsSignIn} isSignIn={isSignIn} /> : <SignUp setIsSignIn={setIsSignIn} isSignIn={isSignIn} />}</Container>
    </div>
  );
}
