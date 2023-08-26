// import React from 'react';
// import StarRatingComponent from 'react-star-rating-component';

// function ProductRating({ rating }) {
//     return (
//         <StarRatingComponent
//             name="productRating"
//             starCount={5}
//             value={rating}
//         />
//     );
// }

// export default ProductRating;

import React from 'react';
import RatingStars from 'react-rating-stars-component';

function ProductRating({ rating }) {
    return (
        <RatingStars
            count={5}
            value={rating}
            edit={false} // Disable editing
            size={20}   // Size of the stars
            isHalf={true} // Enable half-star ratings
        />
    );
}

export default ProductRating;
