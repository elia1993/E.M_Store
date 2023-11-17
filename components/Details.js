// Details.js

import React, { useEffect, useContext } from 'react';
import { ProductConsumer, ProductContext } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

const Details = () => {
  const { id } = useContext(ProductContext).detailProduct;

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched product details:', data);
        // You can directly use the fetched data here if you don't want to update the context
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]); // Include id in the dependency array

  return (
    <ProductConsumer>
      {(value) => {
        const {img, info, price, name, inCart,description } = value.detailProduct;
        return (
          <div className="container py-5">
            {/*title*/}
            <div className="row">
              <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                <h1>{name}</h1>
              </div>
            </div>
            {/*end of title*/}
            {/*product info*/}
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <img src={img} className="img-fluid" alt="product" />
              </div>
              {/*product text*/}
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                <h2>model:{name}</h2>
                <h4 className="text-blue">
                  <strong>
                    Price : <span>$</span>
                    {price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  {description}
                </p>
                <p className="text-muted lead">{info}</p>
                {/*buttons*/}
                <div>
                  <Link to="/">
                    <ButtonContainer>back to products</ButtonContainer>
                  </Link>
                  <ButtonContainer
                    cart
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                    }}
                  >
                    {inCart ? 'inCart' : 'add to cart'}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ProductConsumer>
  );
};

export default Details;
