import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


// Sample pizza data with categories
const pizzas = [
  {
    name: "Pepperoni Pizza",
    category: "Meat",
    ingredients: ["Pepperoni", "Mozzarella Cheese", "Tomato Sauce", "Basil"],
    price: 12.99,
    photo: "/Pizzas/pizza3.jpg",
    soldOut: false
  },
  {
    name: "Margherita Pizza",
    category: "Vegetarian",
    ingredients: ["Mozzarella Cheese", "Tomato Sauce", "Basil"],
    price: 10.99,
    photo: "/Pizzas/pizza2.jpg",
    soldOut: false
  },
  {
    name: "Hawaiian Pizza",
    category: "Meat",
    ingredients: ["Ham", "Pineapple", "Mozzarella Cheese", "Tomato Sauce"],
    price: 12.49,
    photo: "/Pizzas/pizza1.jpg",
    soldOut: true
  },
  {
    name: "Veggie Pizza",
    category: "Vegetarian",
    ingredients: ["Bell Peppers", "Mushrooms", "Onions", "Black Olives", "Tomato Sauce"],
    price: 11.50,
    photo: "/Pizzas/pizza4.jpg",
    soldOut: false
  },
  {
    name: "BBQ Chicken Pizza",
    category: "Meat",
    ingredients: ["Chicken", "BBQ Sauce", "Red Onions", "Cilantro"],
    price: 13.99,
    photo: "/Pizzas/pizza5.jpg",
    soldOut: false
  },
  {
    name: "Meat Lover's Pizza",
    category: "Meat",
    ingredients: ["Pepperoni", "Ham", "Sausage", "Bacon", "Mozzarella Cheese", "Tomato Sauce"],
    price: 15.99,
    photo: "/Pizzas/pizza6.jpg",
    soldOut: false
  },
  {
    name: "Seafood Pizza",
    category: "Seafood",
    ingredients: ["Shrimp", "Calamari", "Mussels", "Tomato Sauce", "Mozzarella Cheese"],
    price: 14.99,
    photo: "/Pizzas/pizza7.jpg",
    soldOut: false
  },
  {
    name: "Four Cheese Pizza",
    category: "Vegetarian",
    ingredients: ["Mozzarella Cheese", "Parmesan Cheese", "Gorgonzola Cheese", "Feta Cheese", "Tomato Sauce"],
    price: 13.50,
    photo: "/Pizzas/pizza8.jpg",
    soldOut: false
  },
  {
    name: "Buffalo Chicken Pizza",
    category: "Meat",
    ingredients: ["Chicken", "Buffalo Sauce", "Mozzarella Cheese", "Blue Cheese"],
    price: 13.99,
    photo: "/Pizzas/pizza9.jpg",
    soldOut: false
  },
  {
    name: "Pesto Pizza",
    category: "Vegetarian",
    ingredients: ["Pesto Sauce", "Mozzarella Cheese", "Cherry Tomatoes", "Arugula"],
    price: 12.99,
    photo: "/Pizzas/pizza10.jpg",
    soldOut: false
  },
  {
    name: "Mushroom Truffle Pizza",
    category: "Vegetarian",
    ingredients: ["Mushrooms", "Truffle Oil", "Mozzarella Cheese", "Parmesan Cheese", "Garlic"],
    price: 16.99,
    photo: "/Pizzas/pizza11.jpg",
    soldOut: false
  },
  {
    name: "Spicy Italian Pizza",
    category: "Meat",
    ingredients: ["Spicy Italian Sausage", "Jalapeños", "Red Onions", "Tomato Sauce", "Mozzarella Cheese"],
    price: 14.99,
    photo: "/Pizzas/pizza12.jpg",
    soldOut: false
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  const addToCart = (pizza, quantity) => {
    if (quantity > 0) {
      setCart((prevCart) => {
        const existingPizza = prevCart.find(item => item.name === pizza.name);
        if (existingPizza) {
          return prevCart.map(item =>
            item.name === pizza.name
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevCart, { ...pizza, quantity }];
      });
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const filterPizzas = category === "All" ? pizzas : pizzas.filter(pizza => pizza.category === category);

  // Derive unique categories from the pizzas array
  const categories = ["All", ...new Set(pizzas.map(pizza => pizza.category))];

  return (
    <Router>
      <div className="App">
        <Header cart={cart} setCategory={setCategory} categories={categories} />
        <div className="content-container">
          <Routes>
            <Route
              path="/"
              element={<Menu pizzas={filterPizzas} addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} clearCart={clearCart} />}
            />
          </Routes>
        </div>
      
      <Footer />

      </div>
    </Router>
  );
}

function Header({ cart, setCategory, categories }) {
  const [showCart, setShowCart] = useState(false);

  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <ul>
          {categories.map((cat, index) => (
            <li key={index}>
              <button onClick={() => setCategory(cat)}>{cat}</button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="cart-icon-container" onClick={() => setShowCart(!showCart)}>
        <FaShoppingCart className="cart-icon" />
        <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        {showCart && (
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
            <Link to="/cart" className="view-cart-button">View Cart</Link>
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="logo-container">
      <a href="/" className="logo">PizzaBites</a>
    </div>
  );
}

// function Menu({ pizzas, addToCart }) {
//   return (
//     <div className="grid-container">
//       {pizzas.map((pizza, index) => (
//         <Pizza
//           key={index}
//           pizza={pizza}
//           addToCart={addToCart}
//         />
//       ))}
//     </div>
//   );
// }

function Menu({ pizzas, addToCart }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pizzasPerPage = 6;

  // Calculate the currently displayed pizzas
  const indexOfLastPizza = currentPage * pizzasPerPage;
  const indexOfFirstPizza = indexOfLastPizza - pizzasPerPage;
  const currentPizzas = pizzas.slice(indexOfFirstPizza, indexOfLastPizza);

  // Total pages
  const totalPages = Math.ceil(pizzas.length / pizzasPerPage);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="grid-container">
      {currentPizzas.map((pizza, index) => (
        <Pizza
          key={index}
          pizza={pizza}
          addToCart={addToCart}
        />
      ))}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="page-link">
          &#9664; Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <button key={number} onClick={() => paginate(number)} className={`page-link ${number === currentPage ? 'active' : ''}`}>
            {number}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages} className="page-link">
          Next &#9654;
        </button>
      </div>
    </div>
  );
}

function Pizza({ pizza, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(pizza, quantity);
  };

  return (
    <div className="Pizza-card">
      <div>
        <img src={pizza.photo} alt={pizza.name} />
        <h3>{pizza.name}</h3>
      </div>
      <div>
        <p>{pizza.ingredients.join(', ')}</p>
        <p>${pizza.price.toFixed(2)}</p>
        {pizza.soldOut ? (
          <p className="sold-out">Sold Out</p>
        ) : (
          <div className="quantity-container">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="quantity-input"
            />
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// function CartPage({ cart, clearCart }) {
//   return (
//     <div className="cart-page">
//       <h2>Your Cart is Ready</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {cart.map((item, index) => (
//               <li key={index} className="cart-item">
//                 <img src={item.photo} alt={item.name} className="cart-item-photo" />
//                 <div className="cart-item-details">
//                   <span>{item.name}</span> - <span>{item.quantity} x ${item.price.toFixed(2)}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
//           <PaymentForm />
//         </>
//       )}
//     </div>
//   );
// }
function CartPage({ cart, clearCart }) {
  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.photo} alt={item.name} className="cart-item-photo" />
                <div className="cart-item-details">
                  <span>{item.name}</span> - <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-cost">
            <h3>Total Cost: ${totalCost}</h3>
          </div>
          <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
          <PaymentForm />
          
        </>
      )}
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="payment-form">
      <h3>Payment Method</h3>
      <form>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" required />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" required />
        </div>
        <button type="submit" className="submit-button">Pay Now</button>
      </form>
    </div>
  );
}

// function Footer() {
//   const hour = new Date().getHours(); // Get the current hour in 24-hour format
//   const openhour = 9; // Restaurant opens at 9 AM
//   const closehour = 18; // Restaurant closes at 6 PM
//   const isOpen = hour >= openhour && hour < closehour; // Check if the current time is within open hours

//   return (
//     <footer id="footer">
//       {new Date().toLocaleTimeString()}
//       <h2>
//         Restaurant &copy; All rights reserved (
//         {isOpen ? "We are open now!" : "Sorry, we are closed"})
//       </h2>
//     </footer>
//   );
// }


function Footer() {
  const hour = new Date().getHours(); // Get the current hour in 24-hour format
  const openhour = 9; // Restaurant opens at 9 AM
  const closehour = 18; // Restaurant closes at 6 PM
  const isOpen = hour >= openhour && hour < closehour; // Check if the current time is within open hours

  return (
    <footer id="footer" style={{ textAlign: "center", padding: "20px", background: "#f8f8f8" }}>
      <p>{new Date().toLocaleTimeString()}</p>
      <h2>
        Restaurant &copy; All rights reserved (
        {isOpen ? "We are open now!" : "Sorry, we are closed"})
      </h2>
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <img src={"/Pizzas/footer.webp"} alt="bKash Logo" style={{ width: "1600px", margin: "30px" }} />
        {/* Increase the width as necessary; adjust margin for spacing */}
      </div>
    </footer>
  );
}



// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
