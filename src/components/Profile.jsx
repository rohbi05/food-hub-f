import { useEffect, useState } from "react";
import { useRetailer } from "../context/retailerContext";
import retailerService from "../api/services/retailer";

export default function Profile() {
  const { retailerProfile, loading } = useRetailer;
  const [profile, setProfile] = useState({
    restaurant_name: "",
    restaurant_email: "",
    restaurant_phone: "",
    restaurant_address: "",
    restaurant_image: null, // in case image update is supported
  });
  const [saving, setSaving] = useState(false);

  // Pre-populate when retailerProfile changes
  useEffect(() => {
    if (retailerProfile) {
      setProfile({
        restaurant_name: retailerProfile.restaurant_name || "",
        restaurant_email: retailerProfile.restaurant_email || "",
        restaurant_phone: retailerProfile.restaurant_phone || "",
        restaurant_address: retailerProfile.restaurant_address || "",
        restaurant_image: null, // keep null unless user chooses new file
        document_good_conduct: retailerProfile.document_good_conduct,
        document_food_hygiene: retailerProfile.document_food_hygiene,
      });
    }
  }, [retailerProfile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // If it's a file input
    if (files) {
      setProfile((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await retailerService.updateRetailer(profile); // will create FormData internally
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurant_name"
              className="w-full border p-3 rounded-lg"
              value={profile.restaurant_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="restaurant_email"
              className="w-full border p-3 rounded-lg"
              value={profile.restaurant_email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="restaurant_phone"
              className="w-full border p-3 rounded-lg"
              value={profile.restaurant_phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="restaurant_address"
              className="w-full border p-3 rounded-lg"
              value={profile.restaurant_address}
              onChange={handleChange}
            />
          </div>

          {/* Optional: Upload image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Restaurant Image
            </label>
            <input
              type="file"
              name="restaurant_image"
              accept="image/*"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Document of good conduct
            </label>
            <input
              type="file"
              name="document_good_conduct"
              // accept="image/*"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Document of food hygiene
            </label>
            <input
              type="file"
              name="document_food_hygiene"
              // accept="image/*"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-3 rounded-lg shadow-md"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
