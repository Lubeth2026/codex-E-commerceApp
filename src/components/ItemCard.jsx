
import React from 'react'
import "./ItemCard.css"

function ItemCard({item}) {
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img
          src={item.thumbnail}
          alt={item.description}
          className="item-image"
        />
        <span className="item-category">{item.category}</span>
      </div>
      <div className="item-content">
        <h2>{item.title}</h2>
        <p className="item-description">{item.description}</p>
      <div className="item-rating">⭐{item.rating}</div>
      <div className="item-footer">
        <div>
            <p className="price">${item.price}</p>
            <p className="stock">Available:{item.stock}</p>
        </div>
        <button>Add to Cart</button>
      </div>
      </div>
    </div>
  );
}

export default ItemCard