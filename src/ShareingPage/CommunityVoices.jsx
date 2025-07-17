import React from "react";

const CommunityVoices = () => {
  return (
    <section className="bg-[#dedada80]  py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">Voices of Our Community</h2>
      <p className="text-gray-600 mb-10">
        See what people are saying about their NourishNet experience.
      </p>
      <div className="grid md:grid-cols-2 gap-8 mx-auto px-5">

        {/* Testimonial 1 */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="text-green-600 text-3xl mb-4">❝</div>
          <p className="text-gray-700 italic mb-4">
            "NourishNet has been a blessing. As a single mother, getting extra help with groceries makes a huge difference. The donors are so kind and the process is simple."
          </p>
          <div className="flex items-center justify-center mt-4">
            <img
              src="https://i.pravatar.cc/100?img=47"
              alt="Sarah L."
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">Sarah L.</p>
              <p className="text-sm text-gray-500">Community Member</p>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <div className="text-green-600 text-3xl mb-4">❝</div>
          <p className="text-gray-700 italic mb-4">
            "I own a small bakery and often have leftovers. Instead of throwing them away, I can now share them with people who truly need them. It's a win-win!"
          </p>
          <div className="flex items-center justify-center mt-4">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="Tom B."
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold text-gray-800">Tom B.</p>
              <p className="text-sm text-gray-500">Food Donor</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CommunityVoices;
