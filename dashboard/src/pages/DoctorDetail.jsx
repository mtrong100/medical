import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleSection from "../components/TitleSection";
import { getDoctorDetailApi } from "../api/doctorApi";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Fieldset } from "primereact/fieldset";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { TabView, TabPanel } from "primereact/tabview";
import { formatCurrencyVND } from "../utils/helper";
import parse from "html-react-parser";

const DoctorDetail = () => {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(doctor);

  useEffect(() => {
    fetchDoctorDetail();
  }, []);

  const fetchDoctorDetail = async () => {
    try {
      setLoading(true);
      const res = await getDoctorDetailApi(doctorId);
      setDoctor(res);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TitleSection>Thông tin chi tiết</TitleSection>

      <div className="mt-10">
        <div className="w-full max-w-5xl mx-auto">
          <div className="space-y-5 flex justify-center items-center flex-col">
            <Image
              src={doctor?.avatar}
              alt="Image"
              width="200"
              preview
              imageStyle={{
                borderRadius: "100rem",
                objectFit: "cover",
                height: "200px",
              }}
            />
          </div>

          <TabView>
            <TabPanel header="Thông tin cá nhân">
              <div className="m-0 grid grid-cols-2 gap-5">
                <Fieldset legend="Tên">
                  <p className="m-0">{doctor?.name}</p>
                </Fieldset>
                <Fieldset legend="Số điện thoại">
                  <p className="m-0">{doctor?.phoneNumber}</p>
                </Fieldset>
                <Fieldset legend="Địa chỉ">
                  <p className="m-0">{doctor?.address}</p>
                </Fieldset>
                <Fieldset legend="Email">
                  <p className="m-0">{doctor?.email}</p>
                </Fieldset>
                <Fieldset legend="Ngày sinh">
                  <p className="m-0">{doctor?.dateOfBirth}</p>
                </Fieldset>
                <Fieldset legend="Tốt nghiệp">
                  <p className="m-0">{doctor?.graduatedFrom}</p>
                </Fieldset>
                <Fieldset legend="Chuyên khoa">
                  <p className="m-0">{doctor?.specialization}</p>
                </Fieldset>
                <Fieldset legend="Lương cơ bản">
                  <p className="m-0">{formatCurrencyVND(doctor?.salary)}</p>
                </Fieldset>
              </div>
            </TabPanel>
            <TabPanel header="Giới thiệu">
              <p className="m-0">{parse(doctor?.description || "")}</p>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
