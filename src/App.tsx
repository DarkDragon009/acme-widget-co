import "@/App.css";

// layouts
import { Header } from "@/layouts/Header";

// components
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { ShoppingCart } from "@/components/ShoppingCart";

const App = () => {
  return (
    <div className="app bg-light">
      <div className="container py-5">
        <Header />
        <main>
          {/* <ProductCatalogue /> */}
          <ShoppingCart />
        </main>
      </div>
    </div>
  );
};

export default App;
