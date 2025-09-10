import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";


export function UserLogin(){
    
    const [cookies, setCookie, removeCookie] =useCookies(['user_id']);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userid: '',
            password: ''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:4040/users`)
            .then(response=>{
                let record = response.data.find((item:any) => item.userid===admin.userid);
                if(record) {
                    if(record.password===admin.password){
                        setCookie('user_id', admin.userid);
                        navigate('/user-dash');
                    } else {
                        alert('Invalid Password');
                    }
                } else {
                    alert('Invalid User Id');
                }

            })
        }
    })

    return(

  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card shadow p-4">
          <h3 className="text-center mb-3">User Login</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">User Id</label>
              <input 
                onChange={formik.handleChange} 
                type="text" 
                name="userid" 
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                onChange={formik.handleChange} 
                type="password" 
                name="password" 
                className="form-control" 
              />
            </div>
            <button className="btn btn-warning w-100" type="submit">
              Login
            </button>
            <div className="mt-3 text-center">
              <Link to="/register-user">New User Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

    
}