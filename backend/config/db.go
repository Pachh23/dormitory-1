package config

import (
	"fmt"
	"time"

	"dormitory.com/dormitory/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa3.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Students{},
		&entity.Admins{},
		&entity.Genders{},
		&entity.FamilyStatuses{},
		&entity.Guardians{},
		&entity.Licenses{},
		&entity.Address{},
		&entity.Family{},
		&entity.Other{},
		&entity.Personal{},
		&entity.Dorm{},
		&entity.Floor{},
		&entity.Room{},
		&entity.Reservation{},
	)

	// Seed ข้อมูลประเภท
	seedStudents()
	seedAdmins()
	seedGenders()
	seedFamilyStatuses()
	seedGuardians()
	seedLicenses()
	seedPersonals()
	seedAddresses()
	seedFamilies()
	seedOthers()
	seedDormBooking()
}

func seedGenders() {
	genderMale := entity.Genders{Gender: "Male"}
	genderFemale := entity.Genders{Gender: "Female"}
	db.FirstOrCreate(&genderMale, entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&genderFemale, entity.Genders{Gender: "Female"})
}

func seedFamilyStatuses() {
	familyStatusTogether := entity.FamilyStatuses{FamilyStatus: "อยู่ด้วยกัน"}
	familyStatusSeparated := entity.FamilyStatuses{FamilyStatus: "แยกกันอยู่"}
	familyStatusOther := entity.FamilyStatuses{FamilyStatus: "อื่นๆ (พ่อหรือแม่เสียชีวิต)"}
	db.FirstOrCreate(&familyStatusTogether, entity.FamilyStatuses{FamilyStatus: "อยู่ด้วยกัน"})
	db.FirstOrCreate(&familyStatusSeparated, entity.FamilyStatuses{FamilyStatus: "แยกกันอยู่"})
	db.FirstOrCreate(&familyStatusOther, entity.FamilyStatuses{FamilyStatus: "อื่นๆ (พ่อหรือแม่เสียชีวิต)"})
}

func seedGuardians() {
	guardianMother := entity.Guardians{Guardian: "มารดา"}
	guardianFather := entity.Guardians{Guardian: "บิดา"}
	guardianOther := entity.Guardians{Guardian: "อื่นๆ (ระบุ)"}
	db.FirstOrCreate(&guardianMother, entity.Guardians{Guardian: "มารดา"})
	db.FirstOrCreate(&guardianFather, entity.Guardians{Guardian: "บิดา"})
	db.FirstOrCreate(&guardianOther, entity.Guardians{Guardian: "อื่นๆ (ระบุ)"})
}

func seedLicenses() {
	hasLicense := entity.Licenses{License: "มี"}
	noLicense := entity.Licenses{License: "ไม่มี"}
	db.FirstOrCreate(&hasLicense, entity.Licenses{License: "มี"})
	db.FirstOrCreate(&noLicense, entity.Licenses{License: "ไม่มี"})
}

// ฟังก์ชันสำหรับการแปลงวันที่จากสตริง
func parseDate(dateStr string) time.Time {
	date, _ := time.Parse("2006-01-02", dateStr)
	return date
}

func seedStudents() {
	//studentHashedPassword, _ := HashPassword("1234567890123")
	//birthday, _ := time.Parse("2006-01-02", "2003-11-12")
	// สร้างข้อมูลนักศึกษา
	students := []entity.Students{
		{FirstName: "Nicha", LastName: "Wandee", StudentID: "B6510001", Password: HashPasswordOrPanic("B6510001"), Birthday: parseDate("2003-11-12"), Year: 3, Major: "วิศวกรรมศาสตร์", GenderID: 2},
		{FirstName: "Somchai", LastName: "Sukprasert", StudentID: "B6510002", Password: HashPasswordOrPanic("B6510002"), Birthday: parseDate("2004-06-25"), Year: 2, Major: "วิทยาศาสตร์", GenderID: 1},
		{FirstName: "Anan", LastName: "Yutthapong", StudentID: "B6510003", Password: HashPasswordOrPanic("B6510003"), Birthday: parseDate("2005-01-15"), Year: 1, Major: "แพทยศาสตร์", GenderID: 1},
		{FirstName: "Siriwan", LastName: "Petchsri", StudentID: "B6510004", Password: HashPasswordOrPanic("B6510004"), Birthday: parseDate("2001-07-18"), Year: 4, Major: "สาธารณสุขศาสตร์", GenderID: 2},
		{FirstName: "Patchara", LastName: "Tantawan", StudentID: "B6510005", Password: HashPasswordOrPanic("B6510005"), Birthday: parseDate("2005-09-20"), Year: 1, Major: "ทันตแพทยศาสตร์", GenderID: 1},
	}
	// บันทึก Students ก่อน
	for _, student := range students {
		db.FirstOrCreate(&student, entity.Students{StudentID: student.StudentID})
	}
}

func seedPersonals() {
	personals := []entity.Personal{
		{StudentID: 1, Nickname: "", CitizenID: "", Phone: "", Nationality: "", Race: "", Religion: "", BloodGroup: ""},
		{StudentID: 2, Nickname: "", CitizenID: "", Phone: "", Nationality: "", Race: "", Religion: "", BloodGroup: ""},
		{StudentID: 3, Nickname: "", CitizenID: "", Phone: "", Nationality: "", Race: "", Religion: "", BloodGroup: ""},
		{StudentID: 4, Nickname: "", CitizenID: "", Phone: "", Nationality: "", Race: "", Religion: "", BloodGroup: ""},
		{StudentID: 5, Nickname: "", CitizenID: "", Phone: "", Nationality: "", Race: "", Religion: "", BloodGroup: ""},
	}
	// บันทึก personal และเชื่อมโยงกับ Students
	for _, personal := range personals {
		db.FirstOrCreate(&personal, entity.Personal{StudentID: personal.StudentID})
	}
}

func seedAddresses() {
	// สร้างข้อมูล addresses
	addresses := []entity.Address{
		{StudentID: 1, HouseNo: "", VillageNo: "", Village: "", Alley: "", Road: "", SubDistrict: "", District: "", Province: "", ZipCode: ""},
		{StudentID: 2, HouseNo: "", VillageNo: "", Village: "", Alley: "", Road: "", SubDistrict: "", District: "", Province: "", ZipCode: ""},
		{StudentID: 3, HouseNo: "", VillageNo: "", Village: "", Alley: "", Road: "", SubDistrict: "", District: "", Province: "", ZipCode: ""},
		{StudentID: 4, HouseNo: "", VillageNo: "", Village: "", Alley: "", Road: "", SubDistrict: "", District: "", Province: "", ZipCode: ""},
		{StudentID: 5, HouseNo: "", VillageNo: "", Village: "", Alley: "", Road: "", SubDistrict: "", District: "", Province: "", ZipCode: ""},
	}
	// บันทึก Address และเชื่อมโยงกับ Students
	for _, address := range addresses {
		db.FirstOrCreate(&address, entity.Address{StudentID: address.StudentID})
	}
}

func seedFamilies() {
	families := []entity.Family{
		{StudentID: 1, FathersName: "", MathersName: "", OccupationFather: "", OccupationMather: "", PhoneFather: "", PhoneMather: ""},
		{StudentID: 2, FathersName: "", MathersName: "", OccupationFather: "", OccupationMather: "", PhoneFather: "", PhoneMather: ""},
		{StudentID: 3, FathersName: "", MathersName: "", OccupationFather: "", OccupationMather: "", PhoneFather: "", PhoneMather: ""},
		{StudentID: 4, FathersName: "", MathersName: "", OccupationFather: "", OccupationMather: "", PhoneFather: "", PhoneMather: ""},
		{StudentID: 5, FathersName: "", MathersName: "", OccupationFather: "", OccupationMather: "", PhoneFather: "", PhoneMather: ""},
	}
	// บันทึก family และเชื่อมโยงกับ Students
	for _, family := range families {
		db.FirstOrCreate(&family, entity.Family{StudentID: family.StudentID})
	}
}

func seedOthers() {
	others := []entity.Other{
		{StudentID: 1, LatestGraduationFrom: ""},
		{StudentID: 2, LatestGraduationFrom: ""},
		{StudentID: 3, LatestGraduationFrom: ""},
		{StudentID: 4, LatestGraduationFrom: ""},
		{StudentID: 5, LatestGraduationFrom: ""},
	}
	// บันทึก other และเชื่อมโยงกับ Students
	for _, other := range others {
		db.FirstOrCreate(&other, entity.Other{StudentID: other.StudentID})
	}
}

func HashPasswordOrPanic(password string) string {
	hashedPassword, err := HashPassword(password)
	if err != nil {
		panic("Failed to hash password")
	}
	return hashedPassword
}

func seedAdmins() {
	adminHashedPassword, _ := HashPassword("Ad01")
	Birthday, _ := time.Parse("2006-01-02", "2003-11-12")
	admin := &entity.Admins{
		Username:  "jetnipat",
		FirstName: "Jetnipat",
		LastName:  "Kunjai",
		Phone:     "061xxxxxxx",
		Birthday:  Birthday,
		Password:  adminHashedPassword,
	}
	db.FirstOrCreate(admin, entity.Admins{Username: "jetnipat"})
}

// ------------Dorm-----------//

func seedDormBooking() {
	dorms := []entity.Dorm{
		{NameDorm: "หอพักชาย 1"},
		{NameDorm: "หอพักชาย 2"},
		{NameDorm: "หอพักหญิง 3"},
		{NameDorm: "หอพักหญิง 4"},
	}

	// บันทึกหอพัก
	for _, dorm := range dorms {
		db.FirstOrCreate(&dorm, entity.Dorm{NameDorm: dorm.NameDorm})
	}

	// ดึงข้อมูลหอพักทั้งหมด
	var allDorms []entity.Dorm
	db.Find(&allDorms)

	// สร้างชั้นและห้องพักสำหรับแต่ละหอพัก
	for _, dorm := range allDorms {
		for floorNum := 1; floorNum <= 3; floorNum++ {
			// สร้างชั้น (ถ้าต้องการเก็บข้อมูลชั้นแยก)
			floor := entity.Floor{FloorNumber: floorNum, DormID: dorm.ID}
			result := db.FirstOrCreate(&floor, entity.Floor{FloorNumber: floorNum, DormID: dorm.ID})
			if result.Error != nil {
				fmt.Printf("Error creating floor: %v\n", result.Error)
				continue
			}

			// สร้างห้องสำหรับแต่ละชั้น
			for room := 0; room <= 9; room++ {
				roomNumber := fmt.Sprintf("%d%d0%d", floorNum, floorNum, room)
				newRoom := entity.Room{
					RoomNumber: roomNumber,
					FloorID:    uint(floorNum), // ใช้หมายเลขชั้นโดยตรงเป็น FloorID
					DormID:     dorm.ID,
				}
				result := db.FirstOrCreate(&newRoom, entity.Room{RoomNumber: roomNumber, FloorID: uint(floorNum), DormID: dorm.ID})
				if result.Error != nil {
					fmt.Printf("Error creating room: %v\n", result.Error)
				}
			}
		}
	}
}
