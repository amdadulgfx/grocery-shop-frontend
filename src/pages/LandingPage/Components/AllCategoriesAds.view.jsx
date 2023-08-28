import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CategoryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme?.palette?.primary?.light,
  },
}));

const SubCategoryPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#e0e0e0', // Use color string directly
}));

const AllCategoriesAds = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Category 1', subCategories: ['Subcategory 1.1', 'Subcategory 1.2', 'Subcategory 1.3'] },
    { id: 2, name: 'Category 2', subCategories: ['Subcategory 2.1', 'Subcategory 2.2'] },
    { id: 3, name: 'Category 3', subCategories: ['Subcategory 3.1', 'Subcategory 3.2', 'Subcategory 3.3'] },
  ];

  return (
    <Grid container spacing={2}>
      {categories.map((category) => (
        <Grid item xs={12} key={category.id}>
          <CategoryPaper
            onMouseEnter={() => setSelectedCategory(category.id)}
            onMouseLeave={() => setSelectedCategory(null)}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
          >
            <Typography variant="h6">{category.name}</Typography>
            {selectedCategory === category.id &&
              category.subCategories.map((subCategory, index) => (
                <SubCategoryPaper key={index}>
                  <Typography variant="body1">{subCategory}</Typography>
                </SubCategoryPaper>
              ))}
          </CategoryPaper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AllCategoriesAds;
