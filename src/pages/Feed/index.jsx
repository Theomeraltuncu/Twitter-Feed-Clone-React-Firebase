import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

const Feed = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user_data) => {
      setUser(user_data);

      //leaving the page monitoring
      return () => unsub();
    });
  }, []);

  console.log(user);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
