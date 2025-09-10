import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function AdminDeleteVideo() {
    const { id } = useParams();
    const navigate = useNavigate();

    function handleDelete() {
        axios.delete(`http://127.0.0.1:4040/delete-video/${id}`)
        .then(() => {
            alert("Video Deleted Successfully");
            navigate("/admin-dash");
        })
        .catch(err => {
            alert("Error deleting video");
            console.error(err);
        });
    }

    return (
        <div>
            <h3>Are you sure you want to delete this video?</h3>
            <button onClick={handleDelete} className="btn btn-danger">Yes, Delete</button>
            <button onClick={() => navigate("/admin-dash")} className="btn btn-secondary mx-2">Cancel</button>
        </div>
    );
}
