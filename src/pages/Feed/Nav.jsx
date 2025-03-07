import { signOut } from "firebase/auth";

import { navSections } from "../../utils/constants";
import { CiReceipt } from "react-icons/ci";
import { BiDoorOpen } from "react-icons/bi";
import { auth } from "../../firebase/config";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col justify-between items-end px-2 py-4">
      <div>
        <img className="w-14 mb-4" src="x-logo.webp" alt="" />

        {navSections.map((i, key) => (
          <div
            className="flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-[#505050by max-md:justify-center] "
            key={key}
          >
            {i.icon}
            <span className="whitespace-nowrap max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>
      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-400 rounded-full animate-bounce" />
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <img
                className="w-12 h-12 rounded-full bg-gray-300"
                src={user.photoURL}
                alt=""
              />
              <p className="max-md:hidden ">{user.displayName} A.</p>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="flex justify-center items-center bg-zinc-700 rounded text-2xl transition md:text-[15px] hover:bg-zinc-900"
            >
              <BiDoorOpen />
              <span className="max-md:hidden">Log out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
