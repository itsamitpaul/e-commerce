import {useState, useEffect} from 'react';
import axios from '../helpers/AxiosInstance';
import Loader from '../helpers/Spinner';
import '../helpers/AdminBody.css';

const AddProduct = () =>{

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [sku, setSku] = useState('');
    const [mrp, setMrp] = useState('');
    const [brand, setBrand] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [disableSubCat, setDisableSubCat] = useState(true);

    useEffect(()=>{
        axios.get("/catlist"
        ).then(res=>{
            setCategoryList(res.data);
        }).catch(err=>{
            alert("Unable to fetch category list");
        }).finally(()=>{
            setShowLoader(false);
        })
    },[]);

    const loadSubCategory = (catId) =>{
        setCategory(catId);
        axios.get(`/subcatlist?cat_id=${catId}`
        ).then(res=>{
            setSubCategoryList(res.data);
            setDisableSubCat(false);
        }).catch(err=>{
            alert("Unable to fetch sub category list");
        })
    }

    const validateForm = () => {
        let error = {};
        let formIsValid = true;
    
        if (!name) {
          formIsValid = false;
          error["name"] = "*Please enter name of product.";
        }

        if (!category) {
            formIsValid = false;
            error["category"] = "*Please select category.";
        }

        if (!subCategory) {
            formIsValid = false;
            error["subCategory"] = "*Please select sub category.";
        }

        if (!quantity) {
            formIsValid = false;
            error["quantity"] = "*Please enter quantity.";
        }
      
        if (!image) {
            formIsValid = false;
            error["image"] = "*Please enter image URL.";
        }

        if (!sku) {
            formIsValid = false;
            error["sku"] = "*Please enter product SKU.";
        }

        if (!mrp) {
            formIsValid = false;
            error["mrp"] = "*Please enter product MRP.";
        }

        if (!brand) {
            formIsValid = false;
            error["brand"] = "*Please enter product brand.";
        }

        if (!rating) {
            formIsValid = false;
            error["rating"] = "*Please enter product rating.";
        }

        if (!description) {
            formIsValid = false;
            error["description"] = "*Please enter product description.";
        }
   
        setErrors(error);
        return formIsValid;
    };

    const createProduct = (e) =>{
        e.preventDefault();
        if(validateForm()){
            setShowLoader(true);
            axios.post('/create',{
                name: name,
                cat_id: category,
                sub_cat_id: subCategory,
                description: description,
                image: image,
                sku: sku,
                quantity: quantity,
                rating: rating,
                mrp: mrp,
                brand: brand
            }).then(res=>{
                setName('');
                setCategory('');
                setSubCategory('');
                setImage('');
                setSku('');
                setQuantity('');
                setMrp('');
                setBrand('');
                setRating('');
                setDescription('');
                setDisableSubCat(true);
                alert('Product created successfully');
            }).catch(err=>{
                alert("Unable to create product");
            }).finally(()=>{
                setShowLoader(false);
            })
        }
    }

    return (
        <div className='admin_body_container'>
            <div className='admin_body_head'>
                <span>Add New Product</span>
            </div>
            {showLoader ? 
                <div className='admin_body_loader'>
                    <Loader />
                </div> :
                <form className='admin_body_form' onSubmit={createProduct}>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Name*</label>
                        <input 
                            value={name} 
                            onChange={e=>setName(e.target.value)} 
                            className="admin_body_form_input" 
                            placeholder='ex: iphone 11'
                        />
                        <div className="admin_body_form_error">{errors.name}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Category*</label>
                        <select onChange={e=>loadSubCategory(e.target.value)} value={category} className="admin_body_form_input">
                            <option value=''>Please select</option>
                            {categoryList.map(cat =>(
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="admin_body_form_error">{errors.category}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Sub-Category*</label>
                        <select onChange={e=>setSubCategory(e.target.value)} value={subCategory} disabled={disableSubCat} className="admin_body_form_input">
                            <option value=''>Please select</option>
                            {subCategoryList.map(cat =>(
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <div className="admin_body_form_error">{errors.subCategory}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Quantity*</label>
                        <input 
                            type="number"
                            value={quantity} 
                            onChange={e=>setQuantity(e.target.value)} 
                            className="admin_body_form_input" 
                            placeholder='ex: 50'
                        />
                        <div className="admin_body_form_error">{errors.quantity}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Image URL*</label>
                        <input  
                            value={image} 
                            onChange={e=>setImage(e.target.value)} 
                            className="admin_body_form_input"
                            placeholder="ex: https://dummyjson.com/image/i/products/1/thumbnail.jpg"
                        />
                        <div className="admin_body_form_error">{errors.image}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product SKU*</label>
                        <input 
                            value={sku} 
                            onChange={e=>setSku(e.target.value)} 
                            className="admin_body_form_input"
                        />
                        <div className="admin_body_form_error">{errors.sku}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product MRP*</label>
                        <input 
                            value={mrp} 
                            onChange={e=>setMrp(e.target.value)} 
                            className="admin_body_form_input" 
                            placeholder='ex: 5000'
                        />
                        <div className="admin_body_form_error">{errors.mrp}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Brand*</label>
                        <input 
                            value={brand} 
                            onChange={e=>setBrand(e.target.value)} 
                            className="admin_body_form_input" 
                            placeholder='ex: Apple'
                        />
                        <div className="admin_body_form_error">{errors.brand}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Rating (Max 5)*</label>
                        <input 
                            value={rating} 
                            onChange={e=>setRating(e.target.value)} 
                            className="admin_body_form_input" 
                            placeholder='ex: 4.8'
                        />
                        <div className="admin_body_form_error">{errors.rating}</div>
                    </div>
                    <div className='admin_body_form_element'>
                        <label className="admin_body_form_label">Product Description*</label>
                        <textarea className='admin_body_textarea' value={description} onChange={e=>setDescription(e.target.value)}></textarea>
                        <div className="admin_body_form_error">{errors.description}</div>
                    </div>
                    <button type="submit"  className="admin_body_form_button">SUBMIT</button>
                </form>}
        </div>
    );
}

export default AddProduct;