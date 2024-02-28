import AnimatedBackground from "./components/AnumatedBackground";
import commonDefault from "../../../_commonStyles/commonDefault.module.css";
import Container from "./components/Container";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { useState } from "react";
import PopapComponent from "../../../_commonComponents/PopapComponent";
import ForgotPassword from "./components/ForgotPassword";

export default function Authentication() {
  const containerStyle = `
        ${commonDefault.dFlex} ${commonDefault.jcc} ${commonDefault.aic}
    `;
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className={containerStyle}>
      <AnimatedBackground />
      <Container>
        {isSignIn ? (
          <SignIn setIsSignIn={setIsSignIn} isSignIn={isSignIn} handleChange={setIsForgotPassword}/>
        ) : (
          <SignUp setIsSignIn={setIsSignIn} isSignIn={isSignIn} />
        )}
      </Container>
      {isForgotPassword ? <PopapComponent handleChange={setIsForgotPassword}><ForgotPassword handleChange={setIsForgotPassword}/></PopapComponent> : ""}
    </div>
  );
}
