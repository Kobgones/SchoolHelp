import React, { useState, useContext } from "react";
import CurrentUserContext from "../contexts/userContext";

function Contact() {
  const { currentUser } = useContext(CurrentUserContext);

  const [formData, setFormData] = useState({
    name: `${currentUser.firstname} ${currentUser.lastname}`,
    email: currentUser.email,
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Réinitialisez le formulaire après l'envoi.
    setFormData({
      ...formData,
      message: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <h1 className="text-mainBlue font-bold text-3xl mb-6">Contactez-nous</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">
              Nom:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              readOnly // Rend le champ non modifiable
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly // Rend le champ non modifiable
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-semibold">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-mainBlue text-white py-2 px-4 rounded-full hover:bg-opacity-90"
          >
            Envoyer le message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
