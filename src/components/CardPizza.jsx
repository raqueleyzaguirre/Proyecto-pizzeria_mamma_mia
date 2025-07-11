import { useCart } from "../context/CartContext";

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={pizza.img} className="card-img-top" alt={pizza.name} />
        <div className="card-body">
          <h5 className="card-title">{pizza.name}</h5>
          <ul className="list-unstyled">
            {pizza.ingredients.map((ing, i) => (
              <li key={i}>🍕 {ing}</li>
            ))}
          </ul>
          <p className="fw-bold">Precio: ${pizza.price.toLocaleString("es-CL")}</p>
          <button className="btn btn-success w-100" onClick={() => addToCart(pizza)}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
