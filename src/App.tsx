import React, { useState } from "react";

// layouts
import { Header } from "@/layouts/Header";

// components
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { ShoppingCart } from "./components/ShoppingCart";
import { Modal } from "@/components/Modal";

import "@/App.css";

const App = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div className="app bg-light py-5">
      <div className="bg-white fixed-top py-3 shadow-sm">
        <Header setOpenModal={setOpenModal} />
      </div>
      <div className="container">
        <main>
          <ProductCatalogue setOpenModal={setOpenModal} />
          {openModal && (
            <Modal setOpenModal={setOpenModal}>
              <ShoppingCart />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
