
import React, { useState } from "react";

const HomePage = () => {
  const [lang, setLang] = useState("en");
  const content = JSON.parse(localStorage.getItem("villageData")) || {
    welcome: "Welcome to Pathaveerapuram",
    about: "Pathaveerapuram is a peaceful village in Andhra Pradesh.",
    culture: "Villagers celebrate Sankranthi, Ugadi, Deepavali with joy.",
    contact: "Sarpanch: ",
    image: null,
    gallery: [],
  };

  const translations = {
    en: { welcome: content.welcome, about: content.about, culture: content.culture, contact: content.contact },
    te: { welcome: "పథవీరాపురంలోకి స్వాగతం", about: "పథవీరాపురం ఆంధ్రప్రదేశ్‌లో ఒక శాంతమైన గ్రామం.", culture: "సంక్రాంతి, ఉగాది, దీపావళిని గ్రామస్తులు ఆనందంగా జరుపుకుంటారు.", contact: "సర్పంచ్: " }
  };

  const t = translations[lang];

  return (
    <div className="container">
      <header>
        <h1>Pathaveerapuram</h1>
        <select onChange={(e) => setLang(e.target.value)} value={lang}>
          <option value="en">English</option>
          <option value="te">తెలుగు</option>
        </select>
      </header>
      {content.image && <img src={content.image} alt="Banner" className="banner-image" />}
      <section><h2>{t.welcome}</h2></section>
      <section><h2>About</h2><p>{t.about}</p></section>
      <section><h2>Culture</h2><p>{t.culture}</p></section>
      <section><h2>Contact</h2><pre>{t.contact}</pre></section>
      <section>
        <h2>Gallery</h2>
        <div className="gallery">
          {content.gallery?.map((img, idx) => (
            <img key={idx} src={img} alt={`gallery-${idx}`} className="gallery-img" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
