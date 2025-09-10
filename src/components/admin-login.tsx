import { useState } from "react"
import { AdminContract } from "../contracts/admin-contract"
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function AdminLogin(){

    const [cookies, setCookie, removeCookie] =useCookies(['admin_id']);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            admin_id: '',
            password: ''
        },
        onSubmit: (admin) => {
            axios.get(`http://127.0.0.1:4040/admin`)
            .then(response=>{
                var record = response.data.find((item:any) => item.admin_id===admin.admin_id);
                if(record) {
                    if(record.password===admin.password){
                        setCookie('admin_id', admin.admin_id);
                        navigate('/admin-dash');
                    } else {
                        alert('Invalid Password');
                    }
                } else {
                    alert('Invalid Admin Id');
                }

            })
        }
    })



    return (
  <div className="container my-5">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card shadow p-4">
          <h3 className="text-center mb-3">Admin Login</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Admin Id</label>
              <input
                onChange={formik.handleChange}
                type="text"
                name="admin_id"
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
            <button type="submit" className="btn btn-warning w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

}