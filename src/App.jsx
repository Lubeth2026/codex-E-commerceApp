
import { useEffect, useState } from 'react'
import './App.css'

function App() {
//Input Field//STATE//
     const [searchTerm, setSearchTerm] = useState("");
     const [items, setItems] = useState([]);
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
       <div className="categories"></div>
       <button >Clear All</button>
       <div className="items"></div>
    </div>
  )
}

export default App
