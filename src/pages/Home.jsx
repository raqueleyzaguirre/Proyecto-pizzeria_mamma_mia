import { useEffect, useState } from "react";
import CardPizza from "../components/CardPizza";

const Home = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/pizzas");
        const data = await res.json();
        setPizzas(data);
      } catch (err) {
        console.error("Error al obtener las pizzas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando pizzas...</p>;

  return (
    <div className="container">
      <h2 className="text-center my-4">Nuestras Pizzas</h2>
      <div className="row">
        {pizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
