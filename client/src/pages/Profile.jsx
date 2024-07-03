import React from "react";
import TitleSection from "../components/TitleSection";
import { TabView, TabPanel } from "primereact/tabview";
import UpdateProfile from "../components/UpdateProfile";

const Profile = () => {
  return (
    <div className="mt-10">
      <TitleSection>Hồ sơ người dùng</TitleSection>

      <div className="mt-6">
        <TabView>
          <TabPanel header="Thông tin cá nhân">
            <div className="m-0">
              <UpdateProfile />
            </div>
          </TabPanel>
          <TabPanel header="Lịch sử khám bệnh">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel header="Hồ sơ bệnh án">
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Profile;
