import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from '../helpers/AxiosInstance';
import Loader from '../helpers/Spinner';
import ProductCard from './productCard';
import '../helpers/AdminBody.css';

const List = () =>{

    const [products, setProducts] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(()=>{
        axios.get("/list"
        ).then(res=>{
            setProducts(res.data);
        }).catch(err=>{
            alert("Something went wrong, please try again after some time");
        }).finally(()=>{
            setShowLoader(false);
        })
    },[])

    return (
        <div className='admin_body_container'>
            <div className='admin_body_head'>
                <span>All Products</span>
                <Link to='/add_product' className='admin_body_head_link'>+ New Product </Link>
            </div>
            {showLoader ? 
                <div className='admin_body_loader'>
                    <Loader />
                </div> : 
                <div className='admin_body'>
                    {products.map(product =>(
                        <ProductCard key={product.id} productDetails={product}/>
                    ))}
                </div>
            }
        </div>
    );
}

export default List;