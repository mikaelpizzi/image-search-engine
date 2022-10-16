import { useEffect, useState } from "react";
import Form from "./components/Form";
import ImagesList from "./components/ImagesList";

function App() {
  // App state
  const [ search, saveSearch ] = useState('');
  const [ images, saveImages ] = useState([]);

  useEffect(() => {
    const consultAPI = async () => {
      if (search === '') return;

      const imagesPerPage = 30;
      const key = '30220258-65d3d7dcad1629235985e1bb2';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}`;
  
      const response = await fetch(url);
      const result = await response.json();

      saveImages(result.hits);
    }
    consultAPI();
  }, [search]);



  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Search Engine</p>

        <Form 
          saveSearch={saveSearch}
        />
      </div>

      <div className="row justify-content-center">
        <ImagesList 
          images={images}
        />
      </div>
    </div>
  );
}

export default App;
