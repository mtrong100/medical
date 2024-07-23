import UpdateProfile from "./UpdateProfile";
import TitleSection from "../../components/TitleSection";
import React, { useEffect } from "react";
import MyMedicalRecord from "./MyMedicalRecord";
import MyAppointment from "./MyAppointment";
import { TabView, TabPanel } from "primereact/tabview";
import Image from "../../assets/images/business.webp";

const Profile = () => {
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="mb-20">
      <div className="h-[300px] w-full mb-10">
        <img src={Image} alt="banner" className="w-full h-full object-cover" />
      </div>

      <div className="page-container">
        <div className="mt-10 mb-20">
          <TitleSection>Hồ sơ người dùng</TitleSection>
          <div className="mt-6">
            <TabView>
              <TabPanel header="Thông tin cá nhân">
                <div className="m-0">
                  <UpdateProfile />
                </div>
              </TabPanel>
              <TabPanel header="Hồ sơ bệnh án">
                <div className="m-0">
                  <MyMedicalRecord />
                </div>
              </TabPanel>
              <TabPanel header="Lịch khám bệnh">
                <div className="m-0">
                  <MyAppointment />
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
