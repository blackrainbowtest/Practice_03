import { useSelector } from "react-redux";
import Account from "../Account";
import { useEffect } from "react";

export default function Home() {
  const data = useSelector((state) => state?.user?.data);

  useEffect(() => {

  }, [])
  
  console.log(data);
  return (
    <>
      <Account />
    </>
  );
}
