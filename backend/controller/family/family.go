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
