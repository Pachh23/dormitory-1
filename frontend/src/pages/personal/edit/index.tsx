import { Space, Button, Col, Row, Divider, Form, Input, Card, message, DatePicker, InputNumber, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
//import { PersonalDetailInterface } from "../../../interfaces/PersonalDetails";
import { useNavigate, Link ,useParams} from "react-router-dom";
import { useEffect } from "react";
import { PersonalInterface } from "../../../interfaces/Personal";
import { AddressInterface } from "../../../interfaces/Address";
import { FamilyInterface } from "../../../interfaces/Family";
import { OtherInteface } from "../../../interfaces/Other";
import { GetAddressById,
	GetFamilyById,GetOtherById,GetPersonalById,
	UpdateAddressById,UpdateFamilyById,UpdateOtherById,UpdatePersonalById } from "../../../services/https";

interface CombinedData extends PersonalInterface ,AddressInterface, FamilyInterface, OtherInteface{} // Combining both interfaces

function PersonalEdit() {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams<{ id: any }>();
  const [form] = Form.useForm();
	const getStudentData = async (id: string) => {
		try {
			// เรียก API หลายตัวพร้อมกัน
			const [ personalRes, addressRes, familyRes, otherRes] = await Promise.all([
				GetPersonalById(id),
				GetAddressById(id),
				GetFamilyById(id),
				GetOtherById(id)
			]);

			// ตรวจสอบสถานะการตอบกลับของ API
			if (
				personalRes.status === 200 &&
				addressRes.status === 200 &&
				familyRes.status === 200 &&
				otherRes.status === 200
			) {
				// ตั้งค่าให้ฟอร์มเมื่อดึงข้อมูลสำเร็จ
				form.setFieldsValue({
					
					// ข้อมูลจาก Personal
					nickname: personalRes.data.nickname,
					citizen_id: personalRes.data.citizen_id,
					phone: personalRes.data.phone,
					nationality: personalRes.data.nationality,
					race: personalRes.data.race,
					Religion: personalRes.data.Religion,
					BloodGroup: personalRes.data.BloodGroup,
					UD: personalRes.data.UD,

					// ข้อมูลจาก Address
					address: addressRes.data.address,
					subdistrict: addressRes.data.subdistrict,
					district: addressRes.data.district,
					province: addressRes.data.province,
	
					// ข้อมูลจาก Family
					father_name: familyRes.data.father_name,
					mother_name: familyRes.data.mother_name,
	
					// ข้อมูลจาก Other
					gpax: otherRes.data.gpax,
					vehicles: otherRes.data.personalVehicles,
				});
			} else {
				// ถ้าไม่ได้รับข้อมูลจาก API
				messageApi.open({
					type: "error",
					content: "ไม่พบข้อมูลผู้ใช้",
				});
				setTimeout(() => {
					navigate("/personal");
				}, 2000);
			}
		} catch (error) {
			console.error("Error fetching student data", error);
			messageApi.open({
				type: "error",
				content: "เกิดข้อผิดพลาดในการดึงข้อมูล",
			});
		}
	};
	const onFinish = async (values: CombinedData) => {
	
		let personalPayload = {
			nickname: values.nickname,
			citizen_id: values.citizen_id,
			phone: values.phone,
			nationality: values.nationality,
			race: values.race,
			Religion: values.Religion,
			BloodGroup: values.BloodGroup,
			UD: values.UD,
	// ข้อมูลของ Personal ที่ต้องการอัปเดต
		};
	
		let addressPayload = {
			HouseNo: values.HouseNo,
				VillageNo: values.VillageNo,
				Village: values.Village,
				Alley: values.Alley,
				Road: values.Road,
				SubDistrict: values.SubDistrict,
				District: values.District,
				Province: values.Province,
				PostCode: values.PostCode,
			// ข้อมูลของ Address ที่ต้องการอัปเดต
		};
	
		let familyPayload = {
			FathersName: values.FathersName,
				MathersName: values.MathersName,
				OccupationFather: values.OccupationFather,
				OccupationMather: values.OccupationMather,
				PhoneFather: values.PhoneFather,
				PhoneMather: values.PhoneMather,
				family_status_id: values.family_status_id,
				guardian_id: values.guardian_id,
				OrGuardiansName: values.OrGuardiansName,
				Relationship: values.Relationship,
				OccupationGuardian: values.OccupationGuardian,
				PhoneGuardian: values.PhoneGuardian,
			// ข้อมูลของ Family ที่ต้องการอัปเดต
		};
	
		let otherPayload = {
			LatestGraduationFrom: values.LatestGraduationFrom,
				GraduatedYear: values.GraduatedYear,
				Gpax: values.Gpax,
				PersonalVehicles: values.PersonalVehicles,
				Color: values.Color,
				PlateNo: values.PlateNo,
				TaxDate: values.TaxDate,
				ProvinceVehicle: values.ProvinceVehicle,
				LicenseID: values.LicenseID,
				Type: values.Type,
				ExpiredCard: values.ExpiredCard,
			// ข้อมูลของ Other ที่ต้องการอัปเดต
		};
	
		try {
			const [personalRes, addressRes, familyRes, otherRes] = await Promise.all([
				UpdatePersonalById(id, personalPayload),
				UpdateAddressById(id, addressPayload),
				UpdateFamilyById(id, familyPayload),
				UpdateOtherById(id, otherPayload)
			]);
	
			// ตรวจสอบว่าทุก API ตอบกลับสถานะสำเร็จ (200)
			if (
				personalRes.status === 200 &&
				addressRes.status === 200 &&
				familyRes.status === 200 &&
				otherRes.status === 200
			) {
				messageApi.open({
					type: "success",
					content: "อัปเดตข้อมูลสำเร็จ",
				});
				setTimeout(() => {
					navigate("/personal");
				}, 2000);
			} else {
				messageApi.open({
					type: "error",
					content: "มีบางอย่างผิดพลาด",
				});
			}
		} catch (error) {
			console.error("Error updating data", error);
			messageApi.open({
				type: "error",
				content: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
			});
		}
	};
	
	useEffect(() => {
		getStudentData(id);
	}, [id]);
	

	return (
	<div>
		{contextHolder}
			<h2 style={{color: '#1f1f1f'}}>เปลี่ยนแปลงข้อมูลส่วนตัว</h2>
			<Card>
				<Form 
					labelCol={{ span: 10 }}
					name="basic"
					layout="horizontal"
					onFinish={onFinish}
					autoComplete="off"
					style={{ maxWidth: 1000 }}
				>
					<h4 style={{ marginTop: -10, marginBottom: -10,color: '#061178' }}>1. ข้อมูลส่วนตัวนักศึกษา</h4>
					<Divider/>
						<Row gutter={[16, 0]}>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ชื่อเล่น"
									name="nickname"
									rules={[{ required: true, message: "กรุณากรอกชื่อเล่น" }]}
								> 
								<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="รหัสบัตรประชาชน"
									name="citizen_id"
									rules={[{ required: true, message: "กรุณากรอกรหัสบัตรประชาชน" },
													{pattern: /^[0-9]{13}$/, message: "กรุณากรอกรหัสบัตรประชาชนที่ถูกต้อง (13 หลัก)" }]}
									>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="หมายเลขโทรศัพท์มือถือ"
									name="phone"
									rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ" },
												{pattern: /^[0-9]{10}$/, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ (10 หลัก)" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="สัญชาติ"
									name="nationality"
									rules={[{ required: true, message: "กรุณากรอกสัญชาติ" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="เชื้อชาติ"
									name="race"
									rules={[{ required: true, message: "กรุณากรอกเชื้อชาติ" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ศาสนา"
									name="Religion"
									rules={[{ required: true, message: "กรุณากรอกศาสนา" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="กลุ่มเลือด"
									name="BloodGroup"
									rules={[{ required: true, message: "กรุณากรอกกลุ่มเลือด" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
										label="โรคประจำตัว(ถ้ามี)"
										name="UD"
								>
									<Input />
								</Form.Item>
							</Col>
					<Divider />
					<h4 style={{ marginTop: -10, marginBottom: -10,color: '#061178' }}>2. ที่อยู่ปัจจุบัน(ตามทะเบียนบ้าน)</h4>
					<Divider />
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="บ้านเลขที่"
									name="HouseNo"
									rules={[{ required: true, message: "กรุณากรอกบ้านเลขที่" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="หมู่ที่"
									name="VillageNo"
									rules={[{ required: true, message: "กรุณากรอกบ้านหมู่ที่" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ชื่อหมู่บ้าน"
									name="Village"
									rules={[{ required: true, message: "กรุณากรอกชื่อหมู่บ้าน" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ซอย"
									name="Alley"
									rules={[{ required: true, message: "กรุณากรอกซอย" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ถนน"
									name="Road"
									rules={[{ required: true, message: "กรุณากรอกถนน !" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ตำบล/แขวง"
									name="SubDistrict"
									rules={[{ required: true, message: "กรุณากรอกตำบล/แขวง" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="อำเภอ/เขต"
									name="District"
									rules={[{ required: true, message: "กรุณากรอกอำเภอ/เขต" }]}
									>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="จังหวัด"
									name="Province"
									rules={[{ required: true, 
														message: "กรุณากรอกชื่อจังหวัดที่ถูกต้อง",}]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="รหัสไปรษณีย์"
									name="PostCode"
									rules={[{ required: true, message: "กรุณากรอกรหัสไปรษณีย์" },
										{pattern: /^[0-9]{5}$/, message: "กรุณากรอกรหัสไปรษณีย์ (5 หลัก)" }]}
									>
									<Input />
								</Form.Item>
							</Col>
					<Divider />
					<h4 style={{ marginTop: -10, marginBottom: -10,color: '#061178' }}>3. เกี่ยวกับครอบครัว</h4>
					<Divider />
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ชื่อ - สกุลบิดา"
									name="FathersName"
									rules={[{ required: true, message: "กรุณากรอกชื่อ-สกุลบิดา" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ชื่อ - สกุลมารดา"
									name="MathersName"
									rules={[{ required: true, message: "กรุณากรอกชื่อ-สกุลมารดา" }]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="อาชีพบิดา"
									name="OccupationFather"
									rules={[{ required: true, message: "กรุณากรอกอาชีพบิดา" }]}
								>
									<Input />
								</Form.Item>
							</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="อาชีพมารดา"
										name="OccupationMather"
										rules={[{ required: true, message: "กรุณากรอกอาชีพมารดา" }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="หมายเลขโทรศัพท์มือถือบิดา"
										name="PhoneFather"
										rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ" },
														{ pattern: /^[0-9]{10}$/, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ (10 หลัก)" }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="หมายเลขโทรศัพท์มือถือมารดา"
										name="PhoneMather"
										rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ" },
														{ pattern: /^[0-9]{10}$/, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ (10 หลัก)" }]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="สถานภาพครอบครัว"
										name="family_status_id"
										rules={[
												{
												required: true,
												message: "กรุณาเลือกสถานภาพครอบครัว",
												},]}
									>
									<Select
										defaultValue=""
										style={{ width: "100%" }}
										options={[
										{ value: "", lable: "กรุณาเลือกสถานภาพครอบครัว", disabled: true },
										{ value: 1, label: "อยู่ด้วยกัน" },
										{ value: 2, label: "แยกกันอยู่" },
										{ value: 3, label: "อื่นๆ (พ่อหรือแม่เสียชีวิต)" },
										]}
									/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="ผู้ปกครอง"
										name="guardian_id"
										rules={[{ required: true, message: "กรุณาเลือกผู้ปกครอง",}]}
									>
									<Select
										defaultValue=""
										style={{ width: "100%" }}
										options={[
										{ value: "", label: "กรุณาเลือกผู้ปกครอง", disabled: true },
										{ value: 1, label: "มารดา" },
										{ value: 2, label: "บิดา" },
										{ value: 3, label: "อื่นๆ (ระบุ)" },
										]}
									/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="หรือผู้ปกครอง ชื่อ/สกุล"
										name="OrGuardiansName"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="เกี่ยวข้องเป็น"
										name="Relationship"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="อาชีพ"
										name="OccupationGuardian"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24} lg={24} xl={12}>
									<Form.Item
										label="หมายเลขโทรศัพท์มือถือ"
										name="PhoneGuardian"
										rules={[{ message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ" },
														{ pattern: /^[0-9]{10}$/, message: "กรุณากรอกหมายเลขโทรศัพท์มือถือ (10 หลัก)" }]}
									>
										<Input />
									</Form.Item>
								</Col>
					<Divider />
					<h4 style={{ marginTop: -10, marginBottom: -10,color: '#061178' }}>4. ข้อมูลอื่นๆ</h4>
					<Divider />
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="สำเร็จการศึกษาขั้นสุดท้ายจาก"
									name="LatestGraduationFrom"
									rules={[{ required: true, message: "กรุณากรอกชื่อโรงเรียน" }]}
								>
									<Input placeholder="กรอกชื่อโรงเรียน" />
								</Form.Item>
							</Col>
							<Col></Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="เมื่อปี พ.ศ."
									name="GraduatedYear"
									rules={[{ required: true, message: "กรุณากรอก พ.ศ.",}]}
								>
								<InputNumber
									min={2500}
									max={2600}
									style={{ width: "100%" }}
								/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="GPAX"
									name="Gpax"
									rules={[{ required: true, message: "กรุณากรอก gpax",}]}
								>
								<InputNumber
									min={0.00}
									max={4.00}
									step={0.01} // เพิ่มทีละ 0.1
									style={{ width: "100%" }}
								/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="พาหนะส่วนตัวที่ใช้"
									name="PersonalVehicles"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="สี"
									name="Color"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="หมายเลขทะเบียน"
									name="PlateNo"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="วันครบกำหนดเสียภาษี"
									name="TaxDate"
								>
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="จังหวัด"
									name="ProvinceVehicle"
									rules={[{
											//pattern: /^[ก-ฮA-Za-z\s]{1,50}$/, 
											message: "กรุณากรอกชื่อจังหวัดที่ถูกต้อง",
									},]}
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ใบขับขี่"
									name="LicenseID"
									rules={[{ required: false, message: "กรุณาเลือกใบขับขี่",}]}
								>
								<Select
										defaultValue=""
										style={{ width: "100%" }}
										options={[
										{ value: "", label: "กรุณาเลือกใบขับขี่", disabled: false },
										{ value: 1, label: "มี" },
										{ value: 2, label: "ไม่มี" },
										]}
								/>
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="ประเภท (ถ้ามี)"
									name="Type"
								>
									<Input />
								</Form.Item>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12}>
								<Form.Item
									label="วันบัตรหมดอายุ"
									name="ExpiredCard"
								>
									<DatePicker style={{ width: "100%" }} />
								</Form.Item>
							</Col>
							
						</Row>
							<Row justify="end">
								<Col style={{ marginTop: "40px" }}>
									<Form.Item>
										<Space>
											<Button
												type="primary"
												htmlType="submit"
												icon={<EditOutlined />}
												style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
												>
												อัปเดตข้อมูล
											</Button>
												<Link to="/personal">
													<Button htmlType="button" style={{ marginRight: "0px" }}>
														ปิด
													</Button>
												</Link>
										</Space>
									</Form.Item>
								</Col>
							</Row>
						</Form>
				</Card>
  	</div>
  );
}

export default PersonalEdit;