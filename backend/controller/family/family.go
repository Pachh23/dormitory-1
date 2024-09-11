package family

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /list-family
func ListFamily(c *gin.Context) {

	var family []entity.Family

	db := config.DB()
	results := db.Find(&family)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, family)
}

// GET /get-family/:id
func GetFamily(c *gin.Context) {
	ID := c.Param("id")
	var family entity.Family
	//results := db.Preload("Gender").First(&student, ID)
	db := config.DB()
	results := db.Preload("FamilyStatus").Preload("Guardian").First(&family, ID)

	// ถ้าผลการค้นหามีข้อผิดพลาด หรือไม่พบข้อมูล
	if results.Error != nil {
		// คืนค่าฟิลด์ว่างโดยไม่แสดงข้อผิดพลาดหรือสถานะ 404
		family = entity.Family{
			// กำหนดค่าฟิลด์ว่างตามที่ต้องการ เช่น สตริงว่าง หรือค่าเริ่มต้นของชนิดข้อมูล
			FathersName:        "", // ตัวอย่างการกำหนดค่าเป็นว่าง
			MathersName:        "",
			OccupationFather:   "",
			OccupationMather:   "",
			PhoneFather:        "",
			PhoneMather:        "",
			OrGuardiansName:    nil,
			Relationship:       nil,
			OccupationGuardian: nil,
			PhoneGuardian:      nil,
			GuardiansID:        0,
			FamilyStatusID:     0,

			// กำหนดฟิลด์อื่น ๆ ตามโครงสร้างของ entity.Other
		}
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, family)
}

// PATCH /update-family
func UpdateFamily(c *gin.Context) {
	var family entity.Family
	FamilyID := c.Param("id")
	// Get the database connection
	db := config.DB()

	// Check if the personal information exists
	result := db.First(&family, "id = ?", FamilyID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Family ID not found"})
		return
	}

	// Bind the incoming JSON payload to the personal object
	if err := c.ShouldBindJSON(&family); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&family)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
