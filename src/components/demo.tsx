import { useEffect, useState } from "react";
import { FakestoreContract } from "../contracts/fakestore-contract";
import axios from "axios";

export function Demo(){

    const [categories, setCategories] = useState<string[]>();
    const [products, setProduct] = useState<FakestoreContract[]>();

    function LoadCategories(){
        axios.get(`https://fakestoreapi.com/products/categories`)
        .then(response=>{
            setCategories( response.data);
        })
    }
    function LoadProducts(){
        axios.get(`https://fakestoreapi.com/products`)
        .then(response=>{
            setProduct(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();
        LoadProducts();
    },[]);

    return(
        <div className="container-fluid">
            <header>
                <h3>Fakestore</h3>
            </header>
            <section className="row mt-4">
                <nav className="col-2">
                    <label className="form-label">Select Category</label>
                    <select className="form-select">
                        {
                            categories?.map(category=><option key={category}>{category}</option>)
                        }

                    </select>
                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto" style={{height:'500px'}}>
                    {
                        products?.map(product=>
                            <div key={product.id} className="card p-1 m-2" style={{width:'200px'}}>
                                <img src={product.image} className="card-img-top" height='120' />
                                <div className="card-header" style={{height:'100px'}}>
                                    {product.title}
                                </div>

                            </div>
                        )
                    }

                </main>
            </section>
           
        </div>
    )
}