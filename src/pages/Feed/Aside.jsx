import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    const tweetsCol = collection(db, "tweets");
    onSnapshot(tweetsCol, (snapshot) => {
      setCount(snapshot.size);
    });
  }, []);
  return (
    <div className="max-xl:hidden p-4">
      <h1 className="text-xl font-semibold ">{count} Tweets sent </h1>
    </div>
  );
};

//to avoid second render from feed/index user state change. no user need here
export default React.memo(Aside);
