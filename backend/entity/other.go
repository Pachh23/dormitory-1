package entity

import (
	"time"

	"gorm.io/gorm"
)

type Other struct {
	gorm.Model
	LatestGraduationFrom string     `json:"latest_graduation_from"`
	GraduatedYear        uint       `json:"graduated_year"`
	Gpax                 float64    `json:"gpax"`
	PersonalVehicles     *string    `json:"personal_vehicles"`
	Color                *string    `json:"color"`
	PlateNo              *string    `json:"plate_no"`
	TaxDate              *time.Time `json:"tax_date"`
	ProvinceVehicle      *string    `json:"province_vehicle"`
	Type                 *string    `json:"type"`
	ExpiredCard          *time.Time `json:"expired_card"`

	LicensesID *uint     `json:"licenses_id"`
	License    *Licenses `gorm:"foreignKey: licenses_id" json:"license"`

	// One-to-one relationship with Student

	StudentID uint      `json:"student_id"`
	Student   *Students `gorm:"foreignKey: student_id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"student"`
}
