import React from "react";

const Map = () => {
  return (
    <div className="map-container" style={{ height: "600px", width: "100%" }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999444473644!2d2.292292515674148!3d48.85884417928744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fcd3dfb1c6b%3A0x20b82f1b9a1d6f0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1593782021253!5m2!1sen!2sfr"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
