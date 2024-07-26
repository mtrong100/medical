import React from "react";
import { Button } from "primereact/button";

const GoogleLogin = ({ onGoogleLogin, loading }) => {
  return (
    <Button
      label="Tiếp tục với google"
      icon="pi pi-google"
      loading={loading}
      severity="warning"
      onClick={onGoogleLogin}
      className="w-full"
      type="button"
    />
  );
};

export default GoogleLogin;
