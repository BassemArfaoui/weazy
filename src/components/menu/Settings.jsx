import React, { useState } from 'react';
import { useConversation } from '../../Contexts/ConversationContext';

function Settings() {
  const { imageModel, setImageModel , resultLimit, setResultLimit } = useConversation();

  const handleModelChange = (e) => {
    setImageModel(e.target.value);
  };

  const handleLimitChange = (e) => {
    setResultLimit(Number(e.target.value));
  };

  const limitOptions = Array.from({ length: 16 }, (_, i) => 5 + i);

  return (
    <div>
      <h3 className="text-center text-title text-2xl font-bold">Settings</h3>
      <div className="p-4 text-white px-2 md:px-8 pt-7">
        <label htmlFor="model-select" className="block mb-2 text-md font-medium font-inter px-1">
          Image Search Model:
        </label>
        <div className="relative mb-6">
          <select
            id="model-select"
            value={imageModel}
            onChange={handleModelChange}
            className="bg-primary border py-3 border-gray-500 text-white font-bold text-sm rounded-lg block w-full appearance-none p-2.5 pr-10"
          >
            <option value="vgg16" className="font-bold font-inter">VGG16</option>
            <option value="resnet50" className="font-bold font-inter">ResNet50</option>
            <option value="clip" className="font-bold font-inter">CLIP</option>
          </select>
        </div>
        {/* Result Limit Dropdown */}
        <label htmlFor="limit-select" className="block mb-2 text-md font-medium font-inter px-1">
          Results Limit:
        </label>
        <div className="relative">
          <select
            id="limit-select"
            value={resultLimit}
            onChange={handleLimitChange}
            className="bg-primary border py-3 border-gray-500 text-white font-bold text-sm rounded-lg block w-full appearance-none p-2.5 pr-10"
          >
            {limitOptions.map((opt) => (
              <option key={opt} value={opt} className="font-inter">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Settings;
