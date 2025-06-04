import React, { useRef, useEffect } from "react";
import ProductCard from "../main/chat/ProductCard";
import Loading from "../tools/Loading";
import { notify } from "../tools/CustomToaster";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

function Wishlist({ closeWishlist }) {
  const userId = "11111111-1111-1111-1111-111111111111";
  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const scrollContainerRef = useRef(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["wishlist", userId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(`${API_URL}/wishlist/${userId}?page=${pageParam}&limit=21`);
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined;
    },
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight -100
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="w-full h-full p-5 flex justify-center items-center flex-1">
        <Loading size={0.65} />
      </div>
    );
  }

  if (isError) {
    notify(error.message);
    return null;
  }

  const wishlist = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-center text-2xl font-bold mb-3">Wishlist</h3>

      {wishlist.length > 0 ? (
        <div className="flex flex-col h-full pb-5">
          <div
            ref={scrollContainerRef}
            className="flex justify-center px-4 py-5 gap-3 flex-wrap overflow-y-auto flex-1"
          >
            {wishlist.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                setWishlist={() => {}}
                wishlist={wishlist}
                closeWishlist={closeWishlist}
              />
            ))}
            {isFetchingNextPage && (
              <div className="w-full flex justify-center mt-4">
                <Loading size={0.5} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-xl font-semibold text-gray-500 mt-10">
          Wishlist is Empty
        </div>
      )}
    </div>
  );
}

export default Wishlist;
