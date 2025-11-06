import { getProducts, createOrder } from "./api/api.js";

async function loadData() {
  const products = await getProducts();
  console.log(products);
}

async function newOrder() {
  const order = await createOrder({
    supplier_id: 1,
    eta_date: "2025-11-10",
    items: [
      { product_id: 3, quantity: 50 },
      { product_id: 4, quantity: 30 },
    ],
  });
  console.log("Created order:", order);
}
How to use it in your React frontend:
