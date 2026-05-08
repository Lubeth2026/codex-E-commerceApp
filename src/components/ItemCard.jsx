
import React from 'react'

function ItemCard({item}) {
  return (
    <div className="item-card">
      <div className="item-image-container">
        <img src={item.thumbnail} alt={item.description} className="item-image"/>
        <span className="item-category">{item.category}</span>
      </div>
    </div>
  )
}

export default ItemCard