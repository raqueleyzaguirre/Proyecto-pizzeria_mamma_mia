import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const { id } = useParams(); // ← ID dinámico desde URL
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then(res => res.json())
      .then(data => setPizza(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!pizza) return <p>Pizza no encontrada</p>;

  return (
    <div className="container text-center mt-4">
      <h2>{pizza.name}</h2>
      <img src={pizza.img} alt={pizza.name} className="img-fluid mb-3" />
      <p>{pizza.desc}</p>
      <ul className="list-unstyled">
        {pizza.ingredients.map((ing, i) => (
          <li key={i}>🍕 {ing}</li>
        ))}
      </ul>
      <p className="fw-bold">Precio: ${pizza.price.toLocaleString("es-CL")}</p>
      <button className="btn btn-success">Añadir al carrito</button>
    </div>
  );
};

export default Pizza;
