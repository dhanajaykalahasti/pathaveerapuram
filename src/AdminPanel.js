
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [formData, setFormData] = useState({ welcome: "", about: "", culture: "", contact: "", image: null, gallery: [] });
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("villageData"));
    if (data) setFormData(data);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(images => {
      setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...images] }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("villageData", JSON.stringify(formData));
    alert("Content Saved!");
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPass && newPass === confirmPass) {
      localStorage.setItem("adminPassword", newPass);
      alert("Password changed!");
      setNewPass(""); setConfirmPass("");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <label>Welcome:<textarea name="welcome" value={formData.welcome} onChange={handleChange} /></label>
        <label>About:<textarea name="about" value={formData.about} onChange={handleChange} /></label>
        <label>Culture:<textarea name="culture" value={formData.culture} onChange={handleChange} /></label>
        <label>Contact:<textarea name="contact" value={formData.contact} onChange={handleChange} /></label>
        <label>Banner Image:<input type="file" accept="image/*" onChange={handleImage} /></label>
        <label>Gallery Images:<input type="file" accept="image/*" multiple onChange={handleGalleryUpload} /></label>
        <button type="submit">Save</button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={handlePasswordChange}>
        <input type="password" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
        <button type="submit">Change</button>
      </form>
    </div>
  );
};

export default AdminPanel;
