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

import { Rating } from '@mui/material';
import React from 'react';

const ProductRating = ({ rating }) => {
    return (
        <Rating
            sx={{ mt: 0.6 }}
            readOnly
            value={rating}
        />
    );
}

export default ProductRating;