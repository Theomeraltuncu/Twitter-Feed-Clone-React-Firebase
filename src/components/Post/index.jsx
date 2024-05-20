import Buttons from "./Buttons";
import Content from "./Content";
import UserInf from "./UserInf";
import { auth, db } from "./../../firebase/config";
import Dropdown from "./Dropdown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleDelete = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    deleteDoc(tweetRef)
      .then(() => toast.warn("Tweet has been removed"))
      .catch((err) => toast.error("We could not delete the tweet"));
  };
  const handleEdit = () => {
    setIsEditMode(true);
  };

  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  const toggleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    await updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex gap-3 border-b py-6 px-3 border-zinc-600">
      <img
        className="w-12 h-12 rounded-full "
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        <div className="flex justify-between items-center">
          <UserInf tweet={tweet} />
          {auth.currentUser.uid === tweet.user.id && (
            <Dropdown handleDelete={handleDelete} handleEdit={handleEdit} />
          )}
        </div>

        {isEditMode ? (
          <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
        ) : (
          <Content tweet={tweet} />
        )}

        <Buttons
          isLiked={isLiked}
          toggleLike={toggleLike}
          likeCount={tweet.likes.length}
        />
      </div>
    </div>
  );
};

export default Post;
