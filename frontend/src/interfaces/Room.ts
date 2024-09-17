export interface RoomInterface {
  ID?:                number;
  RoomNumber?:        number;
  Occupancy?:         string;
  Floor?:             number;
  Dorm: {
    NameDorm?:  string;
  };
}