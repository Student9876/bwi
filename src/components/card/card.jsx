import React from "react";
import './styles.css';

function Card(props) {

    return <>
        <div key={props.product.id} className="card" style={{ width: "18rem", margin: "1rem" }}>
            <img className='card-img-top' src={props.product.images[0]} alt='product photos' style={{ height: "260px", width: "auto" }} />
            <div className="card-body">
                <h5 className="card-title">{props.product.title}</h5>
                <p className="card-text" >{props.product.description}</p>

            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span style={{ textDecoration: "line-through" }}>Price: {props.product.price}</span>
                    <span style={{ paddingLeft: "10px" }}>Discount: {props.product.discountPercentage}<br /> </span>
                    New Price: {Math.round(props.product.price * (100 - props.product.discountPercentage) / 100)}
                </li>
                <li className="list-group-item">Rating: {props.product.rating}</li>
            </ul>
            <div className="card-body">
                {props.addToCart && <button className="btn btn-primary" value={props.product} onClick={(() => props.addToCart(props.product))}>Add to cart</button>}
                {props.removeCart && <button className="btn btn-primary" value={props.product.id} onClick={((e) => props.removeCart(e))}>Remove</button>}
            </div>
        </div>
    </>
}

export default Card;