import React, { useMemo, useState } from 'react';

import CartItem from './CartItem';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faXmark } from '@fortawesome/free-solid-svg-icons';

import redWidgetImg from '@/assets/widgets/red-widget.png';
import greenWidgetImg from '@/assets/widgets/green-widget.png';
import blueWidgetImg from '@/assets/widgets/blue-widget.png';

const products = [
  {
    name: 'Red Widget',
    code: 'R01',
    price: 32.95,
    imageUrl: redWidgetImg,
  },
  {
    name: 'Green Widget',
    code: 'G01',
    price: 24.95,
    imageUrl: greenWidgetImg,
  },
  {
    name: 'Blue Widget',
    code: 'B01',
    price: 7.95,
    imageUrl: blueWidgetImg,
  },
];

const ShoppingCart = () => {
  return (
    <section className="shopping-cart-ui shadow-sm">
      <div className="row g-0">
        <div className="col-12 col-lg-8 shopping-cart-ui__left p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 mb-0 text-dark">Shopping Cart</h2>
            <div className="text-body-secondary small">3 items</div>
          </div>

          <table className="table table-striped">
            <tbody>
              {products.map((product) => (
                <CartItem key={product.code} product={product} />
              ))}
            </tbody>
          </table>
        </div>

        <aside className="col-12 col-lg-4 shopping-cart-ui__right p-4">
          <h3 className="h5 mb-4 text-dark">Summary</h3>

          <div className="vstack gap-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase small fw-semibold text-body-secondary">
                Items
              </div>
              <div className="fw-semibold text-secondary">3</div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <span className="text-uppercase small fw-semibold text-body-secondary">
                Delivery Charge
              </span>
              <span className="text-secondary">$2.95</span>
            </div>

            <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2">
              <div className="text-uppercase small fw-semibold text-body-secondary">
                Total price
              </div>
              <div className="fw-semibold text-secondary">$100</div>
            </div>

            <button className="btn btn-dark w-100 mt-2" type="button">
              CHECKOUT
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ShoppingCart;
