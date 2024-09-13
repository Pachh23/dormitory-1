package entity

import "gorm.io/gorm"

type Floor struct {
	gorm.Model
	FloorNumber int
	DormID      uint   // Foreign key ที่เชื่อมกับ Dorm
	Dorm        Dorm   `gorm:"foreignKey:DormID"` // การเชื่อมโยงกับ Dorm
	Rooms       []Room `gorm:"foreignKey:FloorID"`
}
