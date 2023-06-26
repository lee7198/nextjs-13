import React from "react";
import fullStar from "../../public/icon/full-star.png";
import halfStar from "../../public/icon/half-star.png";
import emptyStar from "../../public/icon/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utils/calclateReviewRatingAverage";

export default function Stars({ reviews }: { reviews: Review[] }) {
  const rating = calculateReviewRatingAverage(reviews);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference < 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star, index) => (
      <Image
        src={star}
        alt="rating-star"
        key={star + String(index)}
        width={16}
        height={16}
      />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
