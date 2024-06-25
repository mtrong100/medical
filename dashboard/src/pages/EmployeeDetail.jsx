import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleSection from "../components/TitleSection";
import { Fieldset } from "primereact/fieldset";
import { Image } from "primereact/image";
import { TabView, TabPanel } from "primereact/tabview";
import { formatCurrencyVND } from "../utils/helper";
import parse from "html-react-parser";
import { getEmployeeDetaillApi } from "../api/employeeApi";

const EmployeeDetail = () => {
  const { id: employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployeeDetail();
  }, []);

  const fetchEmployeeDetail = async () => {
    try {
      setLoading(true);
      const res = await getEmployeeDetaillApi(employeeId);
      setEmployee(res);
    } catch (error) {
      console.log("Error: ", error);
      setEmployee(null);
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
              src={employee?.avatar}
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
                  <p className="m-0">{employee?.name}</p>
                </Fieldset>
                <Fieldset legend="Số điện thoại">
                  <p className="m-0">{employee?.phoneNumber}</p>
                </Fieldset>
                <Fieldset legend="Địa chỉ">
                  <p className="m-0">{employee?.address}</p>
                </Fieldset>
                <Fieldset legend="Email">
                  <p className="m-0">{employee?.email}</p>
                </Fieldset>
                <Fieldset legend="Ngày sinh">
                  <p className="m-0">{employee?.dateOfBirth}</p>
                </Fieldset>
                <Fieldset legend="Tốt nghiệp">
                  <p className="m-0">{employee?.graduatedFrom}</p>
                </Fieldset>
                <Fieldset legend="Chuyên khoa">
                  <p className="m-0">{employee?.specialization}</p>
                </Fieldset>
                <Fieldset legend="Lương cơ bản">
                  <p className="m-0">{formatCurrencyVND(employee?.salary)}</p>
                </Fieldset>
              </div>
            </TabPanel>
            <TabPanel header="Giới thiệu">
              <p className="m-0">{parse(employee?.description || "")}</p>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
