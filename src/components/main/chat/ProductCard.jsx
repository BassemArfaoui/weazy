import React from 'react';
import { FaShoppingCart, FaRegHeart ,FaExpand } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

function ProductCard({product}) {
  return (
    <div className="min-w-[125px] max-w-[125px] rounded-lg shadow-lg overflow-hidden bg-gray-800 text-white">
      <div className="relative h-29 bg-gray-700 flex items-center justify-center">
        <img
          src={product.link}
          alt={product.productDisplayName}
          className="h-full w-full object-cover"
        />

        {/* Full Screen Icon at bottom right */}
        <button className="absolute bottom-1 right-1 text-white p-2 aspect-square cursor-pointer bg-black opacity-75 hover:opacity-100  rounded-full">
          <FaExpand className='size-[12px]'/>
        </button>
      </div>

      <div className="p-2 space-y-2">
        <h3 className="text-[12px] font-bold text-center text-gray-100 line-clamp-2">
          {product.productdisplayname}
        </h3>

        <div className="flex flex-wrap justify-center gap-y-2 gap-2 text-[9px] mt-3">
          <span className="px-2 py-1 rounded-full bg-gray-600 text-gray-200">{product.season}</span>
          <span className="px-2 py-1 rounded-full bg-gray-600 text-gray-200">{product.gender}</span>
        </div>

        <div className="flex justify-between pt-3 mt-3 border-t-1 border-t-gray-200 space-x-2 px-3">
          <button className="text-[18px] text-white hover:text-indigo-500 cursor-pointer">
            <FaShoppingCart />
          </button>

          <button className="text-[19px] cursor-pointer hover:text-red-400">
            <FaRegHeart />
          </button>

          <button className="text-[16px] text-gray-200 cursor-pointer">
            <FaArrowUpRightFromSquare />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
