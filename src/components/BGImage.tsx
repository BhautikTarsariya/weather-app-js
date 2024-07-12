import { useState, useEffect } from "react";

const BGImage = (props: any) => {
  const [dayOrNight, setDayOrNight] = useState<any>("");
  const [currTime, setCurrTime] = useState<any>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hours = currTime.getHours();
    if (hours >= 6 && hours < 18) {
      setDayOrNight("day-bg");
    } else {
      setDayOrNight("night-bg");
    }
  }, [currTime]);
  return <div className={`${dayOrNight}`}>{props.children}</div>;
};

export default BGImage;
