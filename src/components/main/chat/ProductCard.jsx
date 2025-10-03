import React, { useState } from 'react';
import { FaShoppingCart, FaRegHeart ,FaQuestion  ,FaHeart } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { notify, successNotify } from '../../tools/CustomToaster';
import axios from 'axios';
import {useConversation} from "../../../Contexts/ConversationContext"
import { LuSparkles } from "react-icons/lu";

import PhotoDisplayer from '../../tools/PhotoDisplayer';
import TooltipWrapper from '../../tools/TooltipWrapper';
import { useLocation, useParams } from 'react-router-dom';




function ProductCard({product , setWishlist , wishlist , closeWishlist}) {
 
  const userId = "11111111-1111-1111-1111-111111111111";

  const API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const ML_API_URL = import.meta.env.VITE_MODELS_API_URL;

  const [isLiked , setIsLiked] = useState(product.is_liked)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { setConversation , setIsGenerating , shop} = useConversation()

  const location = useLocation()
  const {chatId} = useParams()



  
  const openPhotoModal = (img) => {
    setSelectedImage(img);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setSelectedImage(null);
    setIsPhotoModalOpen(false);
  };


  const likeProduct = async ()=>
  {
    try
    {
    setIsLiked(true)
    await axios.post(`${API_URL}/add-to-wishlist` , 
    {
      "user_id": userId,
      "product_id": product.id,
      shop
    })
    successNotify("Product added to Wishlist")
   }
    catch(err)
    {
    setIsLiked(false)
    notify("failed to add product to wishlist")
    }


  }

  const unlikeProduct = async () => {
    try {

      setIsLiked(false);
      if(wishlist && setWishlist ) setWishlist(wishlist.filter(item => item.id !== product.id));
  
      await axios.delete(`${API_URL}/delete-wishlist-item/${userId}/${product.id}`);
      successNotify("Product removed from Wishlist");
    } catch (err) {

      setIsLiked(true);
      if(wishlist && setWishlist ) setWishlist(prev => [...prev, product]);
      notify("Failed to remove product from wishlist");

    }
  }

  const askForDescription = async() => {
    if(!location.pathname.startsWith('/chat')) {
      notify("you need to have an open chat to get description")
      return
    }

    if(closeWishlist && setWishlist && wishlist || !chatId) {return}

    const newMessage = {
      id: Date.now(),
      sender: "user",
      message: `tell me more about ${product.productdisplayname}`,
      image_urls: [],
    };
    setConversation(prev => [...prev, newMessage]);
    setIsGenerating(true)
    
    try
    {
      const response = await axios.get(`${ML_API_URL}/description/${shop.toLowerCase()}/${product.id}`)
      const resp={
        id: Date.now(),
        sender: "model",
        message : response.data.description , 
        image_urls: [],
        products : [product]
      }
  
      setConversation(prev => [...prev, resp]);
      setIsGenerating(false)

      const savePayload = {
        request: {
          chat_id: chatId,
          sender_role: "user",
          text: newMessage.message,
          image_urls:  [],
          products: [],
        },
        response: {
          chat_id: chatId,
          sender_role: "model",
          text: resp.message,
          image_urls: [],
          products: [product.id],
        },
      }

      try{
        await axios.post(`${API_URL}/save-payload`, savePayload);
        }catch(error)
        {
          notify("failed to save messages")
        }

    }catch(err)
    {
      notify("Failed to get the response.");
      setConversation(prev => prev.filter(message => message.id !== newMessage.id));
      setIsGenerating(false);
    }

  }
  
  return (
    <div
      className="min-w-[125px] max-w-[125px] rounded-lg shadow-lg overflow-hidden bg-gray-800 text-white cursor-pointer"
      
    >
      <div className="relative h-29 bg-gray-700 flex items-center justify-center">
        <img
          src={product.link}
          alt={product.productdisplayname}
          className="h-full w-full object-cover"
                onClick={(e) => {
            e.stopPropagation();
            openPhotoModal(product.link);
          }}
        />

        {/* Full Screen Icon at bottom right */}
        {!setWishlist && !wishlist && !closeWishlist  && 
        <TooltipWrapper tooltip="generate product description" placement='bottom' small>
        <button
          className="absolute bottom-1 right-1 text-white p-1.5 aspect-square cursor-pointer bg-gray-700/90 hover:bg-black/70  rounded-full"
    
          onClick={(e)=>{
            e.stopPropagation()
            askForDescription()
          }}
        >
          <LuSparkles className="size-[15px] text-yellow-400" />
        </button>
        </TooltipWrapper>}

      </div>

      <div className="p-2 space-y-2">
       <TooltipWrapper tooltip={product.productdisplayname} placement='bottom' small>
       <h3 className="text-[12px] font-bold text-center text-gray-100 line-clamp-2">
          {product.productdisplayname}
        </h3>
       </TooltipWrapper>

        <div className="flex flex-wrap justify-center gap-y-2 gap-2 text-[9px] mt-3">
          <span className="px-2 py-1 rounded-full bg-gray-600 text-gray-200">
            {product.season}
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-600 text-gray-200">
            {product.gender}
          </span>
        </div>

        <div className="flex justify-between pt-3 mt-3 border-t-1 border-t-gray-200 space-x-2 px-3">

          {/* //! dont forget to stop propagation  */}
          <button className="text-[18px] text-white hover:text-blue-500 cursor-pointer" onClick={(e) => {e.stopPropagation()}}>
            <FaShoppingCart />
          </button>

          {!isLiked ? (
            <button
              className="text-[19px] cursor-pointer hover:text-red-500 "
              onClick={(e) => {
                e.stopPropagation();
                likeProduct();
              }}
            >
              <FaRegHeart />
            </button>
          ) : (
            <button
              className="text-[19px] text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                unlikeProduct();
              }}
            >
              <FaHeart />
            </button>
          )}

          {/* //! dont forget to stop propagation  */ }
          <button className="text-[16px] text-gray-200 cursor-pointer" onClick={(e) => {e.stopPropagation()}}>
            <FaArrowUpRightFromSquare />
          </button>
        </div>
      </div>

      <PhotoDisplayer
        open={isPhotoModalOpen}
        onClose={closePhotoModal}
        imageSrc={selectedImage}
      />
    </div>
  );
}

export default ProductCard;
