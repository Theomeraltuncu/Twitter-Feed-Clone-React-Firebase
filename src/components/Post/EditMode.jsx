import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { BsArrowReturnLeft } from "react-icons/bs";

const EditMode = ({ tweet, close }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTitle = e.target[0].value;

    const tweetRef = doc(db, "tweets", tweet.id);

    if (isPicDeleting) {
      await updateDoc(tweetRef, {
        textContent: newTitle,
        imageContent: null,
        isEdited: true,
      });
    } else {
      await updateDoc(tweetRef, {
        textContent: newTitle,
        isEdited: true,
      });
    }
    close();
  };
  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        defaultValue={tweet.textContent}
        className="rounded p-1 px-2 text-blue-500"
        type="text"
      />

      <button
        type="submit"
        className="mx-5 p-2 border border-zinc-500 text-green-400 rounded-lg shadow hover:bg-zinc-700"
      >
        <FaSave />
      </button>

      <button
        type="button"
        onClick={close}
        className="mx-5 p-2 border border-zinc-500 text-red-400 rounded-lg shadow hover:bg-zinc-700"
      >
        <MdOutlineCancel />
      </button>

      {tweet.imageContent && (
        <div className="relative ">
          <img
            className={`
            ${isPicDeleting ? "blur" : ""}
            my-4 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />

          <button
            type="button"
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-400 hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <BsArrowReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </form>
  );
};

export default EditMode;
