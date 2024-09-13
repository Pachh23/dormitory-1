import { Col, Row, Divider, Button } from "antd";
import React, { useState } from 'react';
import "../Bmain.css";

const Room: React.FC<{ roomNumber: string; occupancy: string; isSelected: boolean; onSelect: (roomNumber: string) => void }> = ({ roomNumber, occupancy, isSelected, onSelect }) => {
  const isFull = occupancy === "3/3";
  const style: React.CSSProperties = { 
    padding: '30px 0', 
    borderRadius: '8px',
    height: '90px',
    border: '2px solid #d6d6d6',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: isFull ? "#f8d7da" : (isSelected ? "#d1ecf1" : "#fff"), // สีแดงสำหรับห้องเต็ม, สีฟ้าอ่อนสำหรับห้องที่เลือก
    cursor: isFull ? 'not-allowed' : 'pointer'
  };

  return (
    <div 
      style={style} 
      onClick={() => !isFull && onSelect(roomNumber)}
    >
      <div>{roomNumber}</div>
      <div style={{ marginTop: '10px' }}>{occupancy}</div>
    </div>
  );
};

const RoomGrid: React.FC<{ rooms: Array<{ roomNumber: string; occupancy: string }>; selectedRoom: string; onSelectRoom: (roomNumber: string) => void }> = ({ rooms, selectedRoom, onSelectRoom }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '10px' }}>
    {rooms.map(room => (
      <Room 
        key={room.roomNumber} 
        roomNumber={room.roomNumber} 
        occupancy={room.occupancy} 
        isSelected={room.roomNumber === selectedRoom}
        onSelect={onSelectRoom}
      />
    ))}
  </div>
);

function MainDorm1() {
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  const floors = [
    {
      floor: 1,
      rooms: [
        { roomNumber: "1100", occupancy: "0/3" },
        { roomNumber: "1101", occupancy: "0/3" },
        { roomNumber: "1102", occupancy: "0/3" },
        { roomNumber: "1103", occupancy: "0/3" },
        { roomNumber: "1104", occupancy: "0/3" },
        { roomNumber: "1105", occupancy: "0/3" },
        { roomNumber: "1106", occupancy: "0/3" },
        { roomNumber: "1107", occupancy: "0/3" },
        { roomNumber: "1108", occupancy: "0/3" },
        { roomNumber: "1109", occupancy: "0/3" },
        // ห้องอื่นๆ...
      ],
    },
    {
      floor: 2,
      rooms: [
        { roomNumber: "1200", occupancy: "0/3" },
        { roomNumber: "1201", occupancy: "0/3" },
        { roomNumber: "1202", occupancy: "0/3" },
        { roomNumber: "1203", occupancy: "0/3" },
        { roomNumber: "1204", occupancy: "0/3" },
        { roomNumber: "1205", occupancy: "0/3" },
        { roomNumber: "1206", occupancy: "0/3" },
        { roomNumber: "1207", occupancy: "0/3" },
        { roomNumber: "1208", occupancy: "0/3" },
        { roomNumber: "1209", occupancy: "0/3" },
        // ห้องอื่นๆ...
      ],
    },
    {
      floor: 3,
      rooms: [
        { roomNumber: "1300", occupancy: "0/3" },
        { roomNumber: "1301", occupancy: "0/3" },
        { roomNumber: "1302", occupancy: "0/3" },
        { roomNumber: "1303", occupancy: "0/3" },
        { roomNumber: "1304", occupancy: "0/3" },
        { roomNumber: "1305", occupancy: "0/3" },
        { roomNumber: "1306", occupancy: "0/3" },
        { roomNumber: "1307", occupancy: "0/3" },
        { roomNumber: "1308", occupancy: "0/3" },
        { roomNumber: "1309", occupancy: "0/3" },
        // ห้องอื่นๆ...
      ],
    },
  ];

  const handleRoomSelect = (roomNumber: string) => {
    setSelectedRoom(roomNumber);
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <h2 style={{color: '#1f1f1f'}}>จองหอพักชาย 1</h2>
        </Col>
      </Row>
      <Divider />
      {floors.map(floor => (
        <div key={floor.floor}>
          <Divider orientation="left">ชั้นที่ {floor.floor}</Divider>
          <RoomGrid 
            rooms={floor.rooms} 
            selectedRoom={selectedRoom}
            onSelectRoom={handleRoomSelect}
          />
        </div>
      ))}
      <Row style={{ marginTop: '20px' }}>
        <Col span={50}>
        <Button 
          type="primary" 
          size="large" // ใช้ขนาดปุ่มที่ใหญ่
          disabled={!selectedRoom} 
          style={{
            backgroundColor: selectedRoom ? '#52c41a' : '#52c41a', // เปลี่ยนสีพื้นหลังของปุ่ม
            borderColor: selectedRoom ? '#52c41a' : '#52c41a', // เปลี่ยนสีกรอบของปุ่ม
            color: '#fff', // เปลี่ยนสีข้อความ
          }}
        >
          จองห้อง {selectedRoom}
        </Button>
        </Col>
      </Row>
    </div>
  );
}

export default MainDorm1;
