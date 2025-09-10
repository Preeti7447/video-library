import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoriesContract } from "../contracts/categories-contarct";
import axios from "axios";
import { useFormik } from "formik";


export function AdminAddVideo(){

    const [categories, setCategories] = useState<CategoriesContract[]>();
    const navigate = useNavigate();

         const formik = useFormik({
            initialValues: {
                video_id: 0,
                title: '',
                description: '',
                url: '',
                likes: 0,
                dislikes: 0,
                views: 0,
                category_id: 0
            },
            onSubmit: (video)=>{
                
                axios.post(`http://127.0.0.1:4040/add-video`,video)
                alert('video added');
                navigate('/admin-dash');
            }
         })

    

        function LoadCategories(){
            axios.get(`http://127.0.0.1:4040/categories`)
            .then(response=>{
                response.data.unshift({category_id:-1, category_name:'Select Category'});
                setCategories(response.data);
            })
        }

        useEffect(()=>{

            LoadCategories();

        },[]);

    return(
        <div>
            <h3>Add Video</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl className="row">
                    <dt className="col-3">Video Id</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="number" name="video_id" className="form-control w-75" /></dd>
                    <dt className="col-3">Title</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="text" name="title" className="form-control w-75" /></dd>
                    <dt className="col-3">Description</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="text" name="description" className="form-control w-75" /></dd>
                    <dt className="col-3">Url</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="text" name="url" className="form-control w-75" /></dd>
                    <dt className="col-3">Likes</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="number" name="likes" className="form-control w-75" /></dd>
                    <dt className="col-3">Dislikes</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="number" name="dislikes" className="form-control w-75" /></dd>
                    <dt className="col-3">Views</dt>
                    <dd className="col-9"><input onChange={formik.handleChange} type="number" name="views" className="form-control w-75" /></dd>
                    <dt className="col-3">Category</dt>
                    <dd className="col-9">
                        <select name="category_id"  onChange={formik.handleChange}  className="form-control w-75">
                            {
                                categories?.map(category=><option key={category.category_id} value={category.category_id}> { category.category_name } </option>)
                            }
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-primary"> Add Video </button>
            </form>
            <Link to="/admin-dash" className="btn btn-link mt-4"> Back to Dashboard </Link>
        </div>
    )
}                                                                                                                                             