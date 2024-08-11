import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';

const pizzas = [
  {
    name: "Pepperoni Pizza",
    ingredients: ["Pepperoni", "Mozzarella Cheese", "Tomato Sauce", "Basil"],
    price: 12.99,
    photo: "/Pizzas/pizza3.jpg",
    soldOut: false
  },
  {
    name: "Margherita Pizza",
    ingredients: ["Mozzarella Cheese", "Tomato Sauce", "Basil"],
    price: 10.99,
    photo: "/Pizzas/pizza2.jpg",
    soldOut: false
  },
  {
    name: "Hawaiian Pizza",
    ingredients: ["Ham", "Pineapple", "Mozzarella Cheese", "Tomato Sauce"],
    price: 12.49,
    photo: "/Pizzas/pizza1.jpg",
    soldOut: true
  },
  {
   name: "Veggie Pizza",
   ingredients: ["Bell Peppers", "Mushrooms", "Onions", "Black Olives", "Tomato Sauce"],
   price: 11.50,
   photo: "/Pizzas/pizza4.jpg",
   soldOut: false
 },
 {
   name: "BBQ Chicken Pizza",
   ingredients: ["Chicken", "BBQ Sauce", "Red Onions", "Cilantro"],
   price: 13.99,
   photo: "/Pizzas/pizza5.jpg",
   soldOut: false
 },
 {
   name: "Meat Lover's Pizza",
   ingredients: ["Pepperoni", "Ham", "Sausage", "Bacon", "Mozzarella Cheese", "Tomato Sauce"],
   price: 15.99,
   photo: "/Pizzas/pizza6.jpg",
   soldOut: false
 }
];

function App() {
  return (
    <div className="App">
     <Header/>
     
     <Menu pizzas={pizzas} /> 
      <Footer/>
    </div>
  );
}

function Header(){
  
  return (
    <header className="header">
      <Logo />
      <h1>Boshir vair Pizzeria Menu Dekho</h1>
    </header>
  );
}

function Logo() {
  return (
    <div className="logo-container">
      <a href="pizza.com" className="logo">PizzaBites</a>
    </div>
  );
}

function Menu({pizzas}){
  
  return(
  <div className="grid-container">
  {pizzas.map((pizza, index) => (
    <Pizza
      key={index}
      photo={pizza.photo}
      name={pizza.name}
      ingredients={pizza.ingredients}
      price={pizza.price}
     
      soldOut={pizza.soldOut}
    />
    
  ))}
</div>
  )
}
function Pizza({ name, ingredients, price, photo, soldOut }) {
  return (
    <div className="Pizza-card">
      <div>
      <img src={photo} alt={name} />
      <h3>{name}</h3>
      </div>      
      <div>
      <p>{ingredients.join(', ')}</p>
      <p>${price.toFixed(2)}</p>
      {soldOut && <p className="sold-out">Sold Out</p>}
      </div>
     
    </div>
  );
  
}

function Footer(){
   
  const hour=new Date().getHours();
  console.log(hour);
  //  return React.createElement("Footer",null,"We are currently open!");
  return <footer id="footer"> {new Date().toLocaleTimeString()}
        <h2>Restraunt &copy; all rights reserved</h2>
    </footer>
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
