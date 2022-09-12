import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ smoothie, onDelete }) => {
  const handledelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id);

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };
  return (
    <div className="smoothie-card">
      <h3>{smoothie.tittle}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link to={"/" + smoothie.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handledelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;