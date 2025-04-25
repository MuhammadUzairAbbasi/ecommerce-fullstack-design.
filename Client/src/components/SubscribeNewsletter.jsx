
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Subscribed with email:", email);
      alert("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error.message);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 p-4 md:p-6 rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        Subscribe on Our Newsletter
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2">
        <div className="relative w-full md:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaEnvelope className="text-gray-400 w-5 h-5" />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          disabled={loading || !email}
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default NewsletterSubscription;