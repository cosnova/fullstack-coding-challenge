import { BasketProvider } from "contexts/Basket";
import { ProductsListPage } from "pages/ProductsListPage";

function App() {
  return (
    <BasketProvider>
      <ProductsListPage />
    </BasketProvider>
  );
}

export default App;
