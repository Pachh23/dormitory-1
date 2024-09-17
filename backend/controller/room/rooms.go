package room

import (
	"net/http"

	"dormitory.com/dormitory/config"
	"dormitory.com/dormitory/entity"
	"github.com/gin-gonic/gin"
)

// GET /get-room/:id
func GetRoom(c *gin.Context) {
	ID := c.Param("id")
	var room entity.Room

	db := config.DB()
	results := db.First(&room, ID)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if room.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, room)
}

// GET /get-rooms?floor_id=:floor_id&dorm_id=:dorm_id
func GetRoomsByFloorAndDorm(c *gin.Context) {
	floorID := c.Query("floor_id")
	dormID := c.Query("dorm_id")

	var rooms []entity.Room
	db := config.DB()

	query := db.Preload("Dorm").Preload("Floor").
		Where("floor_id = ? AND dorm_id = ?", floorID, dormID)
	results := query.Find(&rooms)

	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	if len(rooms) == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}

	// Create a custom response struct to match the desired output
	type RoomResponse struct {
		RoomNumber string `json:"room_number"`
		Occupancy  string `json:"occupancy"`
		FloorID    uint   `json:"floor_id"`
		DormID     uint   `json:"dorm_id"`
	}

	var responseRooms []RoomResponse
	for _, room := range rooms {
		responseRooms = append(responseRooms, RoomResponse{
			RoomNumber: room.RoomNumber,
			Occupancy:  room.Occupancy,
			FloorID:    room.FloorID,
			DormID:     room.DormID,
		})
	}

	c.JSON(http.StatusOK, responseRooms)
}
