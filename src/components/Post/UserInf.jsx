import React from "react";
import moment from "moment/moment";

const UserInf = ({ tweet }) => {
  let date = tweet.createdAt?.toDate();

  date = moment(date).fromNow();
  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p>{tweet.user.name}</p>

      <p className="text-gray-400 text-sm">@{tweet.user.name}</p>

      <p className="text-gray-400 text-sm ">{date}</p>

      {tweet.isEdited && <p className="text-gray-400 text-sm">Edited</p>}
    </div>
  );
};

export default UserInf;
