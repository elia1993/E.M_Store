import React, { useEffect, useContext } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer, ProductContext } from '../context';

const ProductList = () => {
  const { products, setProducts } = useContext(ProductContext);

  useEffect(() => {
    // Fetch products from the server when the component mounts
    fetch('http://localhost:3001/api/products')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [setProducts]); // Include setProducts in the dependency array

  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products" />
          <div className="row">
            {products.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
