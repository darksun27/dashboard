import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ProductCard } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [products] = useState(mockData);
  const [link, setLink] = useState('');
  let { id } = JSON.parse(localStorage.getItem('user'));

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {products.map(product => (
            <Grid
              item
              key={product.id}
              lg={4}
              md={6}
              xs={12}
            >
              <ProductCard product={product} user={id} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ProductList;
