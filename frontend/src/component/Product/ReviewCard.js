import { Rating } from "@material-ui/lab";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&usqp=CAU" alt="User" />
      <div className="reviwerName">{review.name}</div>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;