package entity

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	gorm.Model
	StudentID   uint `json:"student_id" gorm:"uniqueIndex:idx_student_room"`
	RoomID      uint // การเชื่อมโยงกับห้องพัก
	ReserveDate time.Time
	Room        Room `gorm:"foreignKey:RoomID"`
}
