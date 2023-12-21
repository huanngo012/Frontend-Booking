import React from "react";
import "./Comment.scss";
import icons from "../../utils/icons";

const Comment = ({ image, name, comment }) => {
  return (
    <div className="comment">
      <div className="left">
        <img
          src={image ? image : icons?.noUser}
          alt="avatar"
          className="image"
        />
      </div>
      <div className="right">
        <div className="top">
          <h3 className="top-name">{name}</h3>
        </div>
        <div className="bottom">
          <span className="box-comment">
            <span className="title-comment">Nhận xét:</span>
            <span className="text-comment">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
