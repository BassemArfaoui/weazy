import React, { useState } from "react";
import axios from "axios";

function Test() {
  // Use state to handle form data
  const [branchId, setBranchId] = useState(1);
  const [level, setLevel] = useState(2);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the data to send
    const data = {
      branch_id: branchId,
      level: level,
    };

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:3333/add-class", data);
      console.log(response.data); // Log success message from backend
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-5 m-6 justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div>
          <label htmlFor="branchId">Branch ID: </label>
          <input
            id="branchId"
            type="number"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="level">Level: </label>
          <input
            id="level"
            type="number"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="border">Add Class</button>
      </form>
    </div>
  );
}

export default Test;
