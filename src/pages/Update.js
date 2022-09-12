import {useParams,useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";



const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tittle, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!tittle || !method || !rating) {
    setFormError("Please fill in all the fields");
    return;
  }
  const { data, error } = await supabase
    .from("smoothies")
    .update({ tittle, method, rating })
    .eq('id',id);
    
  if (error) {
    console.log(error);
    setFormError("Please fill in all the fields");
  }
  if (data) {
    console.log(data);
    setFormError(null);
    navigate("/");
  }
};

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.tittle);
        setMethod(data.method);
        setRating(data.rating);
      }
    };
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={tittle}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
