import { useEffect, useState } from "react";
import Form from "./components/Form";
import ImagesList from "./components/ImagesList";

function App() {
  // App state
  const [ search, saveSearch ] = useState('');
  const [ images, saveImages ] = useState([]);
  const [ actualpage, saveActualPage ] = useState(1);
  const [ totalpages, saveTotalPages ] = useState(1);

  useEffect(() => {
    const consultAPI = async () => {
      if (search === '') return;

      const imagesPerPage = 30;
      const key = '30220258-65d3d7dcad1629235985e1bb2';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualpage}`;
  
      const response = await fetch(url);
      const result = await response.json();

      saveImages(result.hits);

      // Calculate total pages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(calculateTotalPages);

      // Move the screen to top
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }   
    consultAPI();
  }, [search, actualpage]);

  // Define previous page
  const previousPage = () => {
    const newActualPage = actualpage - 1;

    if (newActualPage === 0) return;

    saveActualPage(newActualPage);
  }

  // Define next page
  const nextPage = () => {
    const newActualPage = actualpage + 1;

    if (newActualPage > totalpages) return;

    saveActualPage(newActualPage);
  }

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

        { (actualpage) === 1 ? null 
        :         
        (<button
          type="button"
          className="btn btn-info mr-1"
          onClick={previousPage}
        >&laquo; Previous
        </button>) }

        <span className="ml-2 mr-3 pl-1 mt-1 h6">{actualpage}</span>

        { (actualpage === totalpages) ? null 
        :
        (<button
          type="button"
          className="btn btn-info"
          onClick={nextPage}
        >Next &raquo;
        </button>) }
      </div>
    </div>
  );
}

export default App;
