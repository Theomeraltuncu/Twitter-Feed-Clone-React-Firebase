import React, { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();

  useEffect(() => {
    const tweetsCol = collection(db, "tweets");

    const q = query(tweetsCol, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const temp = [];

      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setTweets(temp);
    });

    return () => unsub();
  }, []);
  return (
    <div className="border-zinc-700 border overflow-y-auto">
      <header className="font-bold p-4 border-b border-zinc-700">Feed</header>

      <Form user={user} />
      {!tweets ? (
        <Loader />
      ) : (
        tweets.map((tweet, i) => <Post key={i} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
