import React from "react";
import ProductCard from "./ProductCard";

// function ProductsList({ products }) {
//     return (
//       <div className="w-[95%] md:w-[90%] pl-2 pr-8">
//         <div className="flex flex-nowrap gap-3 overflow-x-auto  py-2 px-1 pb-4">
//           {products.map((product) => (
//               <ProductCard product={product} />
//           ))}
//         </div>
//       </div>
//     );
//   }


function ProductsList({ products }) {
  return (
    <div className="flex flex-wrap gap-4 mt-2 gap-y-5">
      {products && products.length > 0 && (
        products.map((product) => (
          <div key={product.id} >
            <ProductCard product={product} />
          </div>
        ))
      ) }
    </div>
  );
}


export default ProductsList;



