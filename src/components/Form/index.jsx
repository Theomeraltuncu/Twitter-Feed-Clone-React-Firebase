import React, { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "./../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Loader from "../Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const tweetsCol = collection(db, "tweets");

  const uploadImage = async (file) => {
    if (!file || !file?.type.startsWith("image")) return null;

    const imageRef = ref(storage, v4(), file.name);

    try {
      await uploadBytes(imageRef, file);

      return await getDownloadURL(imageRef);
    } catch (err) {
      toast.error("The image was not uploaded");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const textContent = e.target[0].value;

    const file = e.target[1].files[0];

    if (!textContent && !file)
      return toast.info("Please add content", { position: "bottom-right" });

    setIsLoading(true);

    try {
      const url = await uploadImage(file);

      await addDoc(tweetsCol, {
        textContent: textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      toast.error("An error occured during sending tweet");
    }
    setIsLoading(false);

    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />

      <div className="w-full">
        <input
          className="w-full mt-1 mb-2 bg-transparent outline-none md:text-lg "
          placeholder="What's happening?"
          type="text"
        />

        <div className="flex justify-between items-center">
          <label
            className="text-lg transition p-1 cursor-pointer rounded-full hover:bg-gray-800"
            htmlFor="icon"
          >
            <BsCardImage />
          </label>

          <input className="hidden" type="file" id="icon" />
          <button className="bg-blue-400 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-500">
            {isLoading ? <Loader /> : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Form);
