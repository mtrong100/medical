import useUpdateAvatar from "./useUpdateAvatar";
import useGetPatientDetail from "./useGetPatientDetail";
import UpdateInfomation from "./UpdateInfomation";
import TitleSection from "../../components/TitleSection";
import React, { useEffect } from "react";
import FileInput from "../../components/FileInput";
import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import { ProgressSpinner } from "primereact/progressspinner";
import { Image } from "primereact/image";

const UpdatePatient = () => {
  const { id } = useParams();
  const { detail, loading, fetchDetail } = useGetPatientDetail();
  const { isUploading, onUpload } = useUpdateAvatar(fetchDetail);

  useEffect(() => {
    fetchDetail(id);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <div>
      <TitleSection>Cập nhật bệnh nhân</TitleSection>

      <div className="grid mt-10 grid-cols-[350px_minmax(0,1fr)] gap-5 items-start place-items-center">
        <div className="space-y-2 flex flex-col mx-auto justify-center items-center">
          <Image
            src={detail?.avatar}
            alt="Image"
            width="200"
            preview
            imageStyle={{
              borderRadius: "100rem",
              objectFit: "cover",
              height: "200px",
            }}
          />

          <FileInput
            onUpload={(event) => onUpload(event, id)}
            isUploading={isUploading}
          />
        </div>

        <section className="w-full max-w-5xl mx-auto">
          <TabView>
            <TabPanel header="Cập nhật thông tin cá nhân">
              <div className="m-0">
                <UpdateInfomation data={detail} />
              </div>
            </TabPanel>
          </TabView>
        </section>
      </div>
    </div>
  );
};

export default UpdatePatient;
