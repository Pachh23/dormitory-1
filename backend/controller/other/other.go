package other

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-other
func ListOther(c *gin.Context) {

	var other []entity.Other

	db := config.DB()
	results := db.Find(&other)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, other)
}

// GET /get-other/:id
func GetOther(c *gin.Context) {
	ID := c.Param("id")
	var other entity.Other
	//results := db.Preload("Gender").First(&student, ID)
	db := config.DB()
	// ค้นหาข้อมูลที่มี id ตรงกับที่ได้รับมา
	results := db.Preload("License").First(&other, ID)

	// ถ้าผลการค้นหามีข้อผิดพลาด หรือไม่พบข้อมูล
	if results.Error != nil {
		// คืนค่าฟิลด์ว่างโดยไม่แสดงข้อผิดพลาดหรือสถานะ 404
		other = entity.Other{
			// กำหนดค่าฟิลด์ว่างตามที่ต้องการ เช่น สตริงว่าง หรือค่าเริ่มต้นของชนิดข้อมูล
			LatestGraduationFrom: "", // ตัวอย่างการกำหนดค่าเป็นว่าง
			GraduatedYear:        0,
			Gpax:                 0,
			PersonalVehicles:     nil,
			Color:                nil,
			PlateNo:              nil,
			TaxDate:              nil,
			ProvinceVehicle:      nil,
			Type:                 nil,
			ExpiredCard:          nil,
			LicensesID:            nil,
			// กำหนดฟิลด์อื่น ๆ ตามโครงสร้างของ entity.Other
		}
		// คืนฟิลด์ว่างกลับไปพร้อมสถานะ 200
		c.JSON(http.StatusOK, other)
		return
	}

	c.JSON(http.StatusOK, other)
}

// PATCH /update-other
func UpdateOther(c *gin.Context) {
	var other entity.Other
	OtherID := c.Param("id")
	// Get the database connection
	db := config.DB()

	// Check if the personal information exists
	result := db.First(&other, "id = ?", OtherID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Other ID not found"})
		return
	}

	// Bind the incoming JSON payload to the personal object
	if err := c.ShouldBindJSON(&other); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&other)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
