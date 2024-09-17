package entity

import "gorm.io/gorm"

type Dorm struct {
	gorm.Model
	NameDorm  string
	Floors    []Floor `gorm:"foreignKey:DormID"`
	Rooms     []Room  `gorm:"foreignKey:DormID"` // เพิ่มความสัมพันธ์กับ Room
}
