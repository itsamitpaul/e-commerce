import '../helpers/AdminBody.css';

const ProductCard = (props) =>{
    return(
        <div className="product_card_container">
            <img src={props?.productDetails?.image} className="product_card_image" alt="product image"/>
            <div className="product_card_body">
                <div className="product_card_title">{`${props?.productDetails?.name} (${props?.productDetails?.brand})`}</div>
                <div className={props?.productDetails?.rating > 3.5 ? "product_card_rating_green" : "product_card_rating_red"}>{props?.productDetails?.rating}</div>
                <div className="product_card_item"><span>Category: </span>{props?.productDetails?.category}</div>
                <div className="product_card_item"><span>Sub Category: </span>{props?.productDetails?.sub_category}</div>
                <div className="product_card_item"><span>Description: </span>{props?.productDetails?.description}</div>
                <div className="product_card_item"><span>SKU: </span>{props?.productDetails?.sku}</div>
                <div className="product_card_item"><span>Quantity: </span>{props?.productDetails?.quantity}</div>
                <div className="product_card_item"><span>MRP: </span>{`$ ${props?.productDetails?.mrp}`}</div>
            </div>
        </div>
    )
}

export default ProductCard;