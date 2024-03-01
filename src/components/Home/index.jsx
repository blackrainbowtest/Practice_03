import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const data = useSelector((state) => state?.user?.data);

  useEffect(() => {

  }, [])
  
  console.log(data);
  return (
    <div>
      lalala
    </div>
  );
}
