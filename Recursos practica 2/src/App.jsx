import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Footer } from './components/footer'
import { Header } from './components/header'
import {db} from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  function initialCart(){
    const localStorageCart=localStorage.getItem('cart');
      return localStorageCart? JSON.parse(localStorageCart):[];
  }

  const [data, setData]=useState(db)
  const [cart, setCart] = useState(initialCart);
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
  },[cart]);

  function addToCart(guitar){
    const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
    console.log(itemIndex);
    if(itemIndex=== -1){
      guitar.quantity=1;
      setCart([...cart,guitar]);
    }else{
      const updateCart=[...cart];
      updateCart[itemIndex].quantity++;
      setCart(updateCart);
    }
  }
function decreaseQuantity(id) {
  let updateCart = [...cart];
  updateCart.forEach((item) => {
    if (item.id === id && item.quantity > 1) {
      item.quantity--; 
    }
  });
  setCart(updateCart);
}

function increaseQuantity(id) {
  let updateCart = [...cart];
  updateCart.forEach((item) => {
    if (item.id === id) {
      item.quantity++; 
    }
  });
  setCart(updateCart);
}

function removeFromCart(id) {
  let updatedCart = cart.filter((item) => item.id !== id); 
  setCart(updatedCart);
}

function emptyCart() {
  setCart([]); 
}

function calculateTotal(){
 let total=cart.reduce((total,item)=>total+item.price*item.quantity,0)
  return total;
}


  return (
    <>
    
    <Header
        cart={cart}
        total={calculateTotal()}
        decreaseQuantity={decreaseQuantity} 
        increaseQuantity={increaseQuantity}
        removeFromCart={removeFromCart}
        emptyCart={emptyCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart} />
          ))}
        </div>
    </main>
    <Footer/>
    </>
  )
}

export default App
