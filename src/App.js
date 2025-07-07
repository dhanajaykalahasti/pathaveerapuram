import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const maxImages = 5;

  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("main"); // 'main' | 'admin'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [storedPassword, setStoredPassword] = useState(
    localStorage.getItem("village-password") || "admin"
  );

  const [texts, setTexts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("village-texts")) || {
        about: "Pathaveerapuram is a peaceful village in Andhra Pradesh.",
        culture: "We celebrate traditional festivals and support local agriculture.",
      }
    );
  });

  const [images, setImages] = useState(() => {
    return JSON.parse(localStorage.getItem("village-images")) || [];
  });

  const [formTexts, setFormTexts] = useState({ ...texts });
  const [newPassword, setNewPassword] = useState("");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [fullViewImage, setFullViewImage] = useState(null);

  useEffect(() => {
    localStorage.setItem("village-texts", JSON.stringify(texts));
  }, [texts]);

  useEffect(() => {
    localStorage.setItem("village-images", JSON.stringify(images));
  }, [images]);

  const toggleLang = () => setLang(lang === "en" ? "te" : "en");

  const handleLogin = () => {
    if (password === storedPassword) {
      setIsLoggedIn(true);
      setPassword("");
    } else {
      alert("Wrong password");
    }
  };

  const updateTexts = () => {
    setTexts({ ...formTexts });
    alert(lang === "en" ? "Texts updated" : "టెక్స్ట్‌లు నవీకరించబడ్డాయి");
  };

  const handleImageUpload = (e) => {
    if (images.length >= maxImages) {
      alert(
        lang === "en"
          ? `Maximum ${maxImages} images allowed`
          : `గరిష్టం ${maxImages} చిత్రాలు మాత్రమే అప్‌లోడ్ చేయొచ్చు`
      );
      return;
    }
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImages((prev) => [...prev, event.target.result]);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // reset input to allow same file re-upload if needed
  };

  const changePassword = () => {
    if (newPassword.length < 4) {
      alert(
        lang === "en"
          ? "Password must be at least 4 characters"
          : "పాస్‌వర్డ్ కనీసం 4 అక్షరాలు ఉండాలి"
      );
      return;
    }
    setStoredPassword(newPassword);
    localStorage.setItem("village-password", newPassword);
    alert(lang === "en" ? "Password changed" : "పాస్‌వర్డ్ మార్చబడింది");
    setNewPassword("");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setPage("main");
  };

  const prevImage = () => {
    setSliderIndex((sliderIndex - 1 + images.length) % images.length);
  };
  const nextImage = () => {
    setSliderIndex((sliderIndex + 1) % images.length);
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>Pathaveerapuram</h1>
        <div>
          <button className="lang-button" onClick={toggleLang}>
            {lang === "en" ? "తెలుగు" : "English"}
          </button>
          <button className="admin-button" onClick={() => setPage("admin")}>
            {lang === "en" ? "Admin Panel" : "అడ్మిన్"}
          </button>
        </div>
      </div>

      {page === "main" && (
        <>
          {/* Hero */}
          <div
            className="hero"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL + "/banner.jpg"})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: 300,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h2>{lang === "en" ? "Welcome to Pathaveerapuram" : "పాఠవీరాపురానికి స్వాగతం"}</h2>
          </div>

          {/* Content */}
          <div className="container">
            <section>
              <h2>{lang === "en" ? "About Village" : "గ్రామం గురించి"}</h2>
              <p>{texts.about}</p>
            </section>

            <section>
              <h2>{lang === "en" ? "Culture & Traditions" : "సాంస్కృతిక పరంపరలు"}</h2>
              <p>{texts.culture}</p>
            </section>

            <section>
              <h2>{lang === "en" ? "Gallery" : "గ్యాలరీ"}</h2>
              {images.length > 0 ? (
                <div className="slider">
                  <button className="slider-btn" onClick={prevImage}>
                    &lt;
                  </button>
                  <img
                    src={images[sliderIndex]}
                    alt={`gallery-${sliderIndex}`}
                    className="gallery-img"
                    style={{ cursor: "pointer" }}
                    onClick={() => setFullViewImage(images[sliderIndex])}
                  />
                  <button className="slider-btn" onClick={nextImage}>
                    &gt;
                  </button>
                  <div style={{ marginTop: 10 }}>
                    {sliderIndex + 1} / {images.length}
                  </div>
                </div>
              ) : (
                <p>{lang === "en" ? "No images yet." : "చిత్రాలు లేవు."}</p>
              )}
            </section>
          </div>

          {/* Full Image Modal */}
          {fullViewImage && (
            <div className="modal" onClick={() => setFullViewImage(null)}>
              <img src={fullViewImage} alt="Full view" className="modal-img" />
            </div>
          )}
        </>
      )}

      {page === "admin" && (
        <div className="container">
          {!isLoggedIn ? (
            <>
              <h2>{lang === "en" ? "Admin Login" : "అడ్మిన్ లాగిన్"}</h2>
              <input
                type="password"
                placeholder={lang === "en" ? "Enter password" : "పాస్‌వర్డ్ నమోదు చేయండి"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>{lang === "en" ? "Login" : "లాగిన్"}</button>
              <button onClick={() => setPage("main")} style={{ marginTop: 10 }}>
                {lang === "en" ? "Back to Home" : "హోమ్‌కి వెళ్ళండి"}
              </button>
            </>
          ) : (
            <>
              <h2>{lang === "en" ? "Admin Dashboard" : "అడ్మిన్ డాష్‌బోర్డ్"}</h2>

              <h3>{lang === "en" ? "Update Texts" : "టెక్స్ట్ మార్పులు"}</h3>
              <label>About:</label>
              <textarea
                rows={3}
                value={formTexts.about}
                onChange={(e) => setFormTexts({ ...formTexts, about: e.target.value })}
              />
              <label>Culture:</label>
              <textarea
                rows={3}
                value={formTexts.culture}
                onChange={(e) => setFormTexts({ ...formTexts, culture: e.target.value })}
              />
              <button onClick={updateTexts}>Save Text</button>

              <h3>{lang === "en" ? "Upload Images (max 5)" : "చిత్రాలు అప్‌లోడ్ చేయండి (గరిష్టం 5)"}</h3>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={images.length >= maxImages}
              />
              {images.length >= maxImages && (
                <p style={{ color: "red" }}>
                  {lang === "en"
                    ? "Maximum 5 images uploaded."
                    : "గరిష్టం 5 చిత్రాలు అప్‌లోడ్ అయ్యాయి."}
                </p>
              )}

              <h3>{lang === "en" ? "Change Admin Password" : "పాస్‌వర్డ్ మార్చు"}</h3>
              <input
                type="password"
                placeholder={lang === "en" ? "New password" : "కొత్త పాస్‌వర్డ్"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={changePassword}>Change</button>

              <button
                onClick={logout}
                style={{ marginTop: 20, backgroundColor: "#dc3545", color: "white" }}
              >
                {lang === "en" ? "Logout" : "లాగ్ అవుట్"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
