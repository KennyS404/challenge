
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const [item] = useState<any>(null); 

  useEffect(() => {
 
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: {item.price}</p>
    
    </div>
  );
};

export default ItemDetailPage;
