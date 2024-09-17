package entity

import "gorm.io/gorm"

type Room struct {
	gorm.Model
	RoomNumber   string // หมายเลขห้อง
	Occupancy    string
	FloorID      uint          // Foreign key ที่เชื่อมกับ Floor
	DormID       uint          `json:"dorm_id"`            // Foreign key ที่เชื่อมกับ Dorm
	Reservations []Reservation `gorm:"foreignKey:RoomID"`  // การเชื่อมโยงกับ Reservation
	Dorm         Dorm          `gorm:"foreignKey:DormID"`  // ความสัมพันธ์กับ Dorm
	Floor        Floor         `gorm:"foreignKey:FloorID"` // ความสัมพันธ์กับ Floor
}
