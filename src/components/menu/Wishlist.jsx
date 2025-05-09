import React, { useEffect, useState } from "react";
import ProductCard from "../main/chat/ProductCard";
import axios from "axios";
import Loading from "../tools/Loading";
import { notify } from "../tools/CustomToaster";

function Wishlist({closeWishlist}) {
  const userId = "11111111-1111-1111-1111-111111111111";
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/wishlist/${userId}`);
      setWishlist(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notify(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="text-center text-2xl font-bold mb-3">Wishlist</h3>

      {!loading ? (
        wishlist && wishlist.length > 0 ? (
          <div className="w-full h-full flex justify-center">
            <div className="flex px-4 m-auto py-5 gap-3 flex-wrap h-full overflow-y-auto flex-1">
              {wishlist.map((item) => (
                <ProductCard key={item.id} product={item} setWishlist={setWishlist} wishlist={wishlist} closeWishlist={closeWishlist}/>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-xl font-semibold font-inter text-gray-500 mt-10 capitalize">
            Wishlist is Empty
          </div>
        )
      ) : (
        <div className="w-full h-full p-5 flex justify-center items-center flex-1">
          <Loading size={0.65} />
        </div>
      )}
    </div>
  );
}

export default Wishlist;
