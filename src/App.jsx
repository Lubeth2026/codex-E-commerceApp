
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
//When you SEARCH it should FILTER items: so items searched for come up w/ specific category selected//
     const filteredItems = items.filter((item)=>{
      const matchedSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      {/*This is going to combine search/filter w/ the radio buttons in app*/}
      const matchedCategory = categoryTerm === "" || categoryTerm === item.category;
      return matchedSearch && matchedCategory;
    });
  //console.log(filteredItems);

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
            <label key={categories.slug}>{categories.slug}
              <input type="radio" name="category" id="category" value={categories.slug} 
              checked={categoryTerm === categories.slug} onChange={(event)=> setCategoryTerm(event.target.value)}/>
            </label>
          )
        })}
       </div>
       <button onClick={()=>{setCategoryTerm(""); setSearchTerm("");}}>Clear All</button>
       <div className="items">
        {filteredItems.map((item)=>(<ItemCard key={item.id} item={item}/>))}
       </div>
    </div>
  )
}

export default App
