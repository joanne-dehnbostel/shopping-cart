// provides a button and uses onClick to move 1 item into the Shopping Cart
// uses React.useState to keep track of items in the Cart.
// list out the Cart items in another column
function ShoppingCart({ availableItems }) {
  const { Button } = ReactBootstrap;

  // creates state for stock and cart using React.useState
const [stock, setStock] = React.useState(availableItems);
  const [cart, setCart] = React.useState([]);
  const moveToCart = (e) => {
    //  creates product and numInStock variables
     let [product, numInStock] = e.target.innerHTML.split(':');
    // Determines whether numInStock is greater than 0. If not, finds the product that was clicked and updates its numInStock
     if (numInStock <= 0) return; // zero items in stock
    let item = stock.filter((item) => item.product == product);
    let newStock = stock.map((item) => {
      if (item.product == product) {
        item.inStock--;
      }
      return item;
    });
    // Updates the stock state to include the new stock
    setStock([...newStock]);
    // TODO: Update the cart state to include the updated item
    setCart([...cart, ...item]); // for now don't worry about repeat items in Cart
    console.log(`Cart: ${JSON.stringify(cart)}`);
  };
  

  //  don't update beyond this point
  const availableItemsButtons = availableItems.map((item, index) => {
    return (
      <Button id={item.product} key={index} onClick={moveToCart}>
        {item.product}:{item.inStock}
      </Button>
    );
  });

  // Note: React requires a single Parent element, that's why we use <>
  return (
    <>
      <ul key="stock" style={{ listStyleType: 'none' }}>
        {availableItemsButtons}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}

function Cart({ cartitems }) {
  const { Button } = ReactBootstrap;
  console.log('rendering Cart');
  const availableItemsButtons = cartitems.map((item, index) => {
    return (
      <Button id={item.product} key={index}>
        {item.product}
      </Button>
    );
  });
  return (
    <ul id="cart-items" style={{ listStyleType: 'none' }} key="cart">
      {availableItemsButtons}
    </ul>
  );
}

//const availableItems = [
 // { product: 'Jacket', inStock: 2 },
 // { product: 'Pants', inStock: 3 },
  //{ product: 'Scarf', inStock: 0 },
 // { product: 'Pajamas', inStock: 3 },
  //{ product: 'Shirt', inStock: 1 },
//];
const availableItems = [
  { product:'Apples:',name: "Apples_:", country: "Italy", cost: 3, inStock: 10 },
  { product:'Oranges:',name: "Oranges:", country: "Spain", cost: 4, inStock: 3 },
  { product:'Beans:',name: "Beans__:", country: "USA", cost: 2, inStock: 5 },
  { product:'Cabbage:',name: "Cabbage:", country: "USA", cost: 1, inStock: 8 },
];
ReactDOM.render(<ShoppingCart availableItems={availableItems} />, document.getElementById('root'));
