import './App.css';
import Category from './Category';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [finalCategory, setFinalCategory] = useState([]);
  const [finalpro, setFinalProduct] = useState([]);
  const [catName, setCatname] = useState('');

  const getCategory = () => {
    axios
      .get('https://dummyjson.com/products/categories')
      .then((res) => {
        console.log('API Response:', res.data);
        setFinalCategory(res.data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  };

  const getProducts = () => {
    axios
      .get('https://dummyjson.com/products')
      .then((proRes) => proRes.data)
      .then((finalRes) => {
        setFinalProduct(finalRes.products);
      })
      .catch((err) => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    if (catName !== '') {
      axios
        .get(`https://dummyjson.com/products/category/${catName}`)
        .then((proRes) => proRes.data)
        .then((finalRes) => {
          setFinalProduct(finalRes.products);
        })
        .catch((err) => console.error('Error fetching category products:', err));
    }
  }, [catName]);

  const pitems = finalpro.map((products, index) => (
    <ProductItems key={index} pdata={products} />
  ));

  return (
    <div className="py-[40px]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-center text-[40px] font-bold mb-[30px]">Our Products</h1>
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
          <div>
            <Category finalCategory={finalCategory} setCatname={setCatname} />
          </div>
          <div className="grid grid-cols-3 gap-5">
            {finalpro.length >= 1 ? pitems : 'No Products Found'}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductItems({ pdata }) {
  return (
    <div className="shadow-lg text-center pb-4">
      <img src={pdata.thumbnail} className='w-[100%] h-[220px]' alt={pdata.title} />
      <h4>{pdata.title}</h4>
      <b>Rs {pdata.price}</b>
    </div>
  );
}

export default App;