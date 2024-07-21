import UpdateProfile from "./UpdateProfile";
import TitleSection from "../../components/TitleSection";
import React from "react";
import MyMedicalRecord from "./MyMedicalRecord";
import MyAppointment from "./MyAppointment";
import { TabView, TabPanel } from "primereact/tabview";

const Profile = () => {
  return (
    <div className="page-container">
      <div className="mt-10">
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
  );
};

export default Profile;
