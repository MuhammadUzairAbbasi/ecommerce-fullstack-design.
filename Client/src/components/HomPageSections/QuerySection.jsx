import React, { useState } from "react";
import QueryBackground from "../../assets/QueryBackground.png";

const QuerySection = () => {
  const [item, setItem] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Pcs");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Inquiry sent:", { item, details, quantity, unit });
      alert("Inquiry sent successfully!");
      setItem("");
      setDetails("");
      setQuantity("");
      setUnit("Pcs");
    } catch (error) {
      console.error("Error sending inquiry:", error.message);
      alert("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex md:p-8 "
        style={{
          backgroundImage: `url(${QueryBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between space-x-8">
          {/* Left section - Blue overlay with text */}
          <div className=" text-white p-8 md:py-6 md:w-1/3">
            <h2 className="text-3xl font-semibold text-wrap mb-2">
              An easy way to send requests to all suppliers
            </h2>
            <p className="hidden md:inline-block text-md opacity-90">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <button className="md:hidden p-3 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors mt-4">
              Send Inquiry
            </button>
          </div>

          {/* Right section - White form */}
          <div className="hidden md:flex md:flex-col bg-white p-6 md:p-8 md:w-1/2">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Send quote to suppliers
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Form Fields (Hidden on Mobile, Visible on Web) */}
              <div className="md:block hidden ">
                <div className="mb-4">
                  <input
                    id="item"
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="What item you need?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                  />
                  <textarea
                    id="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Type more details"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                  <div className="flex-1">
                    <input
                      id="quantity"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Quantity"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                    />
                  </div>
                  <div className="w-full md:w-24 mt-4 md:mt-0">
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pcs">Pcs</option>
                      <option value="Kg">Kg</option>
                      <option value="Boxes">Boxes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Send Inquiry Button (Always Visible) */}
              <button
                type="submit"
                className=" bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800 transition-colors"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuerySection;
