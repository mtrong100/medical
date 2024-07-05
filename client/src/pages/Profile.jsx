import React from "react";
import TitleSection from "../components/TitleSection";
import { TabView, TabPanel } from "primereact/tabview";
import UpdateProfile from "../components/UpdateProfile";
import MyAppointment from "../components/MyAppointment";
import MyMedicalRecord from "../components/MyMedicalRecord";

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
            <TabPanel header="Cập nhật mật khẩu">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Profile;
