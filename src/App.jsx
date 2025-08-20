import { useState } from 'react'
import Header from './components/Header';
import DiscountForm from './components/DiscountForm';
import ResultCard from './components/ResultCard';

function App() {
  const [finalPrice, setfinalPrice] = useState(null)


  //Creando un header para el app.jsx
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <Header />
      <DiscountForm setFinalPrice={setFinalPrice} />
      {finalPrice !== null && <ResultCard finalPrice={finalPrice} />}
    </div>
  );
}

export default App
