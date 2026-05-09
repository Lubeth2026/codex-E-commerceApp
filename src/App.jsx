
import { useEffect, useState } from 'react'
import './App.css'
import ItemCard from './components/ItemCard';

function App() {
//Input Field//STATE//
     const [searchTerm, setSearchTerm] = useState("");
     const [items, setItems] = useState([]);
//Categories STATE//
     const [categories, setCategories] = useState([]);
     const [categoryTerm, setCategoryTerm] = useState("");
//Dropdown SORT STATE//
     const [sortTerm, setSortTerm] = useState("");
//When you SEARCH it should FILTER items: so items searched for come up w/ specific category selected//
     const filteredItems = items.filter((item)=>{
      const matchedSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      {/*This is going to combine search/filter w/ the radio buttons in app*/}
      const matchedCategory = categoryTerm === "" || categoryTerm === item.category;
      return matchedSearch && matchedCategory;
    });
  //console.log(filteredItems);
//Sorting//
     const sortedItems = [...filteredItems].sort((a, b)=>{
      if(sortTerm === "price-low-to-high"){
        return a.price - b.price; }
      if (sortTerm === "price-high-to-low") {
        return b.price - a.price; }
      if (sortTerm === "rating-low-to-high") {
        return a.rating - b.rating; }
      if (sortTerm === "rating-high-to-low") {
        return b.rating - a.rating; }
      if (sortTerm === "stock") {
        return a.stock - b.stock; }
      if(sortTerm === "name") {
        return a.title.localeCompare(b.title)
      }
     });
//GET Data back from API//
     useEffect(()=>{
      async function getData() {
        try {
          const res = await fetch("https://dummyjson.com/products");
          const data = await res.json();
          //console.log(data)
          setItems(data.products);
        } catch (error) {
          console.log(error)
        }
      }
      getData();
//GET Categories Data from API//
      async function getCategories() {
        try {
          const res = await fetch("https://dummyjson.com/products/categories");
          const data = await res.json();
          //console.log(data)
          setCategories(data.slice(0, 4));
        } catch (error) {
          console.log(error)
        }
      }
      getCategories();
     }, [])

  return (
    <div className="container">
       <div className="title-section">
        <h1>E-commerce App</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla voluptatibus veritatis minima asperiores id dolore soluta, voluptate, ratione quibusdam, sapiente iure autem itaque aperiam corrupti aliquid recusandae cupiditate magni tempora.
        </p>
       </div>
       {/*If input in a form/WONT refresh without logic, if input/ALONE no logic needed*/}
       <input id="search-input" type="text" placeholder="Search..." value={searchTerm} 
       onChange={(event)=> setSearchTerm(event.target.value)}/>
       <div className="categories">
        {categories.map((categories)=>{
          return(
            <label className={`label-radio ${categories.slug}`} key={categories.slug}>{categories.slug}
              <input type="radio" name="category" id="category" value={categories.slug} 
              checked={categoryTerm === categories.slug} onChange={(event)=> setCategoryTerm(event.target.value)}/>
            </label>
          )
        })}
       </div>
       <select value={sortTerm} onChange={(event)=> setSortTerm(event.target.value)}>
        <options value="">Sort by</options>
        <options value="price-low-to-high">Price: Low to High</options>
        <options value="price-high-to-low">Price: High to Low</options>
        <options value="rating-low-to-high">Rating: Low to High</options>
        <options value="rating-high-to-low">Rating: High to Low</options>
        <options value="stock">Stock</options>
       </select>
       <button onClick={()=>{setCategoryTerm(""); setSearchTerm(""); setSortTerm("");}}>Clear All</button>
       <div className="items">
        {sortedItems.map((item)=>(<ItemCard key={item.id} item={item}/>))}
       </div>
    </div>
  )
}

export default App
