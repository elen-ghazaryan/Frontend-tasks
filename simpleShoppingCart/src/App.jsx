import { useState } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 101,
      title: "Phylosophy",
      price: 28,
      picture:
        "https://static.periplus.com/hVAGm5jtR6fQZnhCVZt78VcuDa79yP3aswX06XDWynS7DyAodYgB7v18ABSneOc2g--",
    },
    {
      id: 102,
      title: "Art",
      price: 8,
      picture: "https://images.booksense.com/images/372/453/9781465453372.jpg",
    },
    {
      id: 103,
      title: "History",
      price: 45,
      picture:
        "https://bookazine.com.hk/cdn/shop/products/68fa1af4cb73f919f620253ca990118e.jpg?v=1589010646",
    },
    {
      id: 104,
      title: "Astronomy",
      price: 56,
      picture: "https://online.pubhtml5.com/aead/scwf/files/large/1.jpg",
    },
    {
      id: 105,
      title: "Psychology",
      price: 7.5,
      picture:
        "https://www.griffinbooksonline.co.uk/cdn/shop/files/9780241225936.jpg?v=1722602937",
    },
    {
      id: 106,
      title: "Biology",
      price: 10,
      picture:
        "https://hivoltagerecords.com/cdn/shop/files/new-book-the-biology-book-big-ideas-simply-explained-hardcover-31004415918135.jpg?v=1720471813",
    },
    {
      id: 107,
      title: "Mythology",
      price: 100,
      picture:
        "https://bookowlsbd.com/cdn/shop/files/TheMythologyBookBigIdeasSimplyExplainedbyDK.jpg?v=1742662629",
    },
    {
      id: 108,
      title: "Math",
      price: 87,
      picture:
        "https://booksandyou.in/cdn/shop/files/TheMathBook_1.webp?v=1732795361",
    },
    {
      id: 109,
      title: "Economycs",
      price: 44,
      picture:
        "https://m.media-amazon.com/images/I/81c6E2VdT3L._UF1000,1000_QL80_.jpg",
    },
  ]);
  const [basket, setBasket] = useState([]);
  
  const moveToCart = (product) => {
    const found = basket.find((item) => item.id === product.id);
    if (!found) {
      setBasket([...basket, { ...product, quantity: 1 }]);
    } else {
      found.quantity++;
      setBasket([...basket]);
    }
  };

  const increaseQuantity = (id) => {
    const newBasket = basket.map(item => 
        item.id === id ? {...item, quantity : item.quantity+1} 
            : item
        )
    setBasket([...newBasket])
  }

  const decreaseQuantity = (id) => {
    const newBasket = basket.map(item => 
        item.id === id ? {...item, quantity : item.quantity-1} 
            : item
        )
    setBasket([...newBasket])
  }

  const deleteFromBasket = (id) => {
    const newBasket = basket.filter(item => item.id != id)
    setBasket([...newBasket]) 
  }

  const sortBasket = (sortKey) => {
    let newBasket;
    switch (sortKey) {
        case 'price': 
            newBasket = basket.sort((a,b) => a.price - b.price)
            break;
        case 'quantity':
            newBasket = basket.sort((a,b) => a.quantity - b.quantity)
            break;
        case 'subtotal':
            newBasket = basket.sort((a,b) => (a.price * a.quantity) - (b.price * b.quantity))
            break;
    }
    setBasket([...newBasket])
  }

  return (
    <div className="container">
      <h1 className="display-3">Shopping cart</h1>
      <div className="row">
        <div className="col-md-8">
          <h2>Products</h2>
          <div className="row">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-md-4"
                style={{ marginTop: 30 }}
              >
                <img
                  src={product.picture}
                  style={{ width: 170, height: 200 }}
                />
                <p>{product.title}</p>
                <strong className="text-danger">{product.price}USD</strong>
                <button
                  onClick={() => moveToCart(product)}
                  className="btn btn-outline-danger"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4">
          <h2>Basket</h2>
          <table className="table table-dark table-border ">
            <thead>
              <tr>
                <th>product</th>
                <th onClick={() => sortBasket('price')}>price</th>
                <th onClick={() => sortBasket('quantity')}>quantity</th>
                <th onClick={() => sortBasket('subtotal')}>subtotal</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {basket.map((item) => {
                const filled =
                  item.price * item.quantity > 500
                    ? { letterSpacing: "3px" }
                    : {};
                return (
                  <tr style={filled} key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}USD</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity} USD</td>
                    <td>
                      <button className="btn btn-outline-success btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                      <button
                        disabled={item.quantity < 2}
                        onClick={() => decreaseQuantity(item.id)}
                        className="btn btn-outline-warning btn-sm"
                      >-</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => deleteFromBasket(item.id)}>x</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
