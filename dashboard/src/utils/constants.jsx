export const SIDEBAR_LINKS = [
  {
    icon: "pi pi-home",
    name: "Trang chủ",
    link: "/",
  },
  {
    icon: "pi pi-comment",
    name: "Tin nhắn",
    link: "/chat",
  },
  {
    icon: "pi pi-calendar",
    name: "Lịch khám",
    link: "/appointment",
  },
  {
    icon: "pi pi-receipt",
    name: "Hóa đơn khám bệnh",
    link: "/invoice",
  },
  {
    icon: "pi pi-book",
    name: "Phiếu dịch vụ",
    link: "/medical-service-invoice",
  },
  {
    icon: "pi pi-book",
    name: "Hóa đơn thuốc",
    link: "/prescription",
  },
  {
    icon: "pi pi-address-book",
    name: "Hồ sơ bệnh án",
    link: "/medical-record",
  },
  {
    icon: "pi pi-book",
    name: "Dịch vụ khám",
    link: "/medical-service",
  },
  {
    icon: "pi pi-box",
    name: "Danh mục thuốc",
    link: "/medicine-category",
  },
  {
    icon: "pi pi-users",
    name: "Bệnh nhân",
    link: "/patient",
  },
  {
    icon: "pi pi-users",
    name: "Nhân viên",
    link: "/employee",
  },
  {
    icon: "pi pi-users",
    name: "Nhà cung cấp",
    link: "/supplier",
  },
  {
    icon: "pi pi-box",
    name: "Dược phẩm & thuốc",
    link: "/medicine",
  },
  {
    icon: "pi pi-server",
    name: "Vật tư",
    link: "/device",
  },
  {
    icon: "pi pi-warehouse",
    name: "Kho",
    link: "/inventory",
  },
  {
    icon: "pi pi-book",
    name: "Bài viết",
    link: "/post",
  },
];

export const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const medicalSchoolsInVietnam = [
  "Đại học Y Hà Nội",
  "Đại học Y Dược TP. Hồ Chí Minh",
  "Đại học Y Dược Huế",
  "Đại học Y Dược Thái Bình",
  "Đại học Y Hải Phòng",
  "Đại học Y Dược Cần Thơ",
  "Học viện Quân y",
  "Đại học Y Dược - Đại học Quốc gia Hà Nội",
  "Đại học Kỹ thuật Y Dược Đà Nẵng",
  "Đại học Y khoa Phạm Ngọc Thạch",
  "Đại học Y Dược - Đại học Quốc gia TP. Hồ Chí Minh",
  "Đại học Y Dược - Đại học Thái Nguyên",
  "Đại học Y Dược - Đại học Đà Nẵng",
  "Đại học Y khoa VinUniversity",
  "Đại học Y Dược - Đại học Huế",
];

export const commonSpecialtiesInPrivateClinics = [
  "Nội khoa",
  "Ngoại khoa",
  "Nhi khoa",
  "Sản khoa",
  "Phụ khoa",
  "Nhãn khoa",
  "Răng hàm mặt",
  "Tai mũi họng",
  "Da liễu",
  "Tim mạch",
  "Tiêu hóa",
  "Thần kinh",
  "Cơ xương khớp",
  "Nội tiết",
  "Hô hấp",
  "Thận - Tiết niệu",
  "Tâm thần",
  "Vật lý trị liệu",
  "Chẩn đoán hình ảnh",
  "Y học cổ truyền",
  "Điều dưỡng",
];

export const terminationReasons = [
  "Vi phạm kỷ luật công ty",
  "Hiệu suất làm việc thấp kéo dài",
  "Lạm dụng quyền hạn hoặc vi phạm đạo đức nghề nghiệp",
  "Sử dụng tài sản công ty cho mục đích cá nhân",
  "Không tuân thủ quy định về an toàn lao động",
  "Thường xuyên đi làm muộn hoặc vắng mặt không lý do",
  "Hành vi gây mất đoàn kết trong công ty",
  "Không hoàn thành công việc được giao",
  "Tiết lộ thông tin bảo mật của công ty",
  "Lạm dụng chính sách nghỉ phép của công ty",
];

export const MEDICINE_UNITS = [
  "Viên",
  "Vỉ",
  "Hộp",
  "Chai",
  "Ống",
  "Gói",
  "Ống tiêm",
  "Lọ",
  "Kem",
  "Gel",
  "Thuốc mỡ",
  "Xi-rô",
  "Dung dịch",
  "Bột",
  "Viên nang",
];

export const doctorSchedules = [
  "7:00 - 8:00",
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:00 - 11:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export const LIMIT_AMOUNT = 999;

export const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const DEFAULT_AVATAR =
  "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

export const ACCOUNT_STATUS = {
  ISACTIVE: "Đang hoạt động",
  ISLOCKED: "Khóa tài khoản",
};

export const EMPLOYEE_STATUS = {
  ISWORKING: "Đang làm việc",
  ISFIRED: "Đã nghỉ việc",
};

export const GENDER = {
  MALE: "Nam",
  FEMALE: "Nữ",
};

export const EMPLOYEE_ROLE = {
  DOCTOR: "Bác sĩ",
  CASHIER: "Thu ngân",
  RECEPTIONIST: "Lễ tân",
  NURSE: "Y tá",
  ACCOUNTANT: "Kế toán",
  CLEANING_STAFF: "Nhân viên vệ sinh",
  GUARD: "Bảo vệ",
};

export const EMPLOYEE_SALARY = {
  DOCTOR: 13000000,
  CASHIER: 8000000,
  RECEPTIONIST: 8000000,
  NURSE: 9000000,
  ACCOUNTANT: 10000000,
  CLEANING_STAFF: 6000000,
  GUARD: 5000000,
};

export const PAYMENT_STATUS = {
  PAID: "Đã thanh toán",
  UNPAID: "Chưa thanh toán",
};

export const APPOINTMENT_STATUS = {
  PENDING: "Đang chờ",
  CANCELLED: "Đã hủy",
  COMPLETED: "Đã khám",
};

export const genders = [GENDER.MALE, GENDER.FEMALE];

export const accountStatus = [ACCOUNT_STATUS.ISACTIVE, ACCOUNT_STATUS.ISLOCKED];

export const employeeStatus = [
  EMPLOYEE_STATUS.ISWORKING,
  EMPLOYEE_STATUS.ISFIRED,
];

export const roles = [
  EMPLOYEE_ROLE.DOCTOR,
  EMPLOYEE_ROLE.CASHIER,
  EMPLOYEE_ROLE.RECEPTIONIST,
  EMPLOYEE_ROLE.NURSE,
  EMPLOYEE_ROLE.ACCOUNTANT,
  EMPLOYEE_ROLE.CLEANING_STAFF,
  EMPLOYEE_ROLE.GUARD,
];

export const salaries = [
  EMPLOYEE_SALARY.DOCTOR,
  EMPLOYEE_SALARY.CASHIER,
  EMPLOYEE_SALARY.RECEPTIONIST,
  EMPLOYEE_SALARY.NURSE,
  EMPLOYEE_SALARY.ACCOUNTANT,
  EMPLOYEE_SALARY.CLEANING_STAFF,
  EMPLOYEE_SALARY.GUARD,
];

export const paymentStatus = [PAYMENT_STATUS.PAID, PAYMENT_STATUS.UNPAID];

export const appointmentStatus = [
  APPOINTMENT_STATUS.PENDING,
  APPOINTMENT_STATUS.CANCELLED,
  APPOINTMENT_STATUS.COMPLETED,
];

export const POST_CATGORIES = [
  "Dinh dưỡng",
  "Sức khỏe",
  "Trẻ đẹp",
  "Mẹ và bé",
  "Răng miệng",
  "Bệnh về mắt",
  "Thảo được",
  "Phòng bệnh",
];

export const MATERIALS = [
  "Vật tư y tế",
  "Thiết bị y tế",
  "Đồ dùng văn phòng",
  "Nội thất",
  "Tài liệu và sách",
];
