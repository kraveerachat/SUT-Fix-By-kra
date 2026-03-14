import { router, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';

/* ---------------- CARD ---------------- */

// 1. เพิ่ม mechanic เข้ามาเป็น Props ใน RepairCard
function RepairCard({ title, room, problem, type, status, time, mechanic }: any) {
  const statusColor: any = {
    urgent: "#EF4444",
    normal: "#9CA3AF",
    repair: "#F59E0B",
    done: "#22C55E"
  };

  const statusText: any = {
    urgent: "เร่งด่วน",
    normal: "ปกติ",
    repair: "กำลังซ่อม",
    done: "ซ่อมแล้ว"
  };

  const iconType: any = {
    ประปา: "water-outline",
    ไฟฟ้า: "flash-outline",
    ทั่วไป: "construct-outline"
  };

  return (
    <View style={[styles.card, { borderLeftColor: statusColor[status] }]}>
      <View style={styles.cardRow}>
        <View style={styles.iconBox}>
          <Ionicons
            name={iconType[type] || "construct-outline"}
            size={26}
            color="#6B7280"
          />
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardSub}>เลขห้อง: {room}</Text>
              {/* 2. แสดงชื่อช่างในการ์ดด้านนอก */}
              {mechanic && (
                <Text style={{ fontSize: 12, color: "#F28C28", marginTop: 4, fontWeight: "600" }}>
                  ช่าง: {mechanic}
                </Text>
              )}
            </View>

            <View style={[styles.badge, { backgroundColor: statusColor[status] }]}>
              <Text style={styles.badgeText}>{statusText[status]}</Text>
            </View>
          </View>

          <View style={styles.problemRow}>
            <Text style={styles.cardProblem}>{problem}</Text>
            
            {/* --- แก้ไขป้ายตรงนี้ครับ --- */}
            <View style={styles.typeTag}>
              <Ionicons name="construct" size={12} color="#4B5563" style={{ marginRight: 4 }} />
              <Text style={styles.typeText}>{type}</Text>
            </View>
            {/* ----------------------- */}

          </View>

          <View style={styles.divider} />

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.timeText}>{time}</Text>
            <View style={styles.statusBtn}>
              <Text style={styles.statusText}>{statusText[status]}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

/* ---------------- SCREEN ---------------- */

export default function AdminDashboardScreen() {
  const router = useRouter(); 

  // 3. เพิ่มข้อมูล mechanic และ price ลงใน Mock Data
  const repairs = [
    {
      title: "หอพัก:สุรนิเวศ1",
      room: "B-402",
      dorm: "สุรนิเวศ 1",
      problem: "ท่อน้ำรั่ว ฝ้าเปียก",
      type: "ประปา",
      status: "done",
      time: "วันนี้",
      studentId: "B670001",
      phone: "091-123-4567",
      mechanic: "นัททวัฒน์ เอื้อสี",
      images: [
        "https://i.imgur.com/8Km9tLL.jpg",
        "https://i.imgur.com/jNNT4LE.jpg"
      ],
      price: "100" 
    },
    {
      title: "หอพัก:สุรนิเวศ2",
      room: "C-201",
      dorm: "สุรนิเวศ 2",
      problem: "เตารีดเสีย",
      type: "ไฟฟ้า",
      status: "repair",
      time: "วันนี้",
      studentId: "B670002",
      phone: "089-555-7777",
      mechanic: "ช่างปั๊ป",
      images: [
        "https://i.imgur.com/8Km9tLL.jpg",
        "https://i.imgur.com/jNNT4LE.jpg"
      ],
      price: "0"
    }
  ];

  const [dateFilter, setDateFilter] = useState("ทั้งหมด");
  const [dormFilter, setDormFilter] = useState("ทั้งหมด");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");

  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [imageViewer, setImageViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  /* -------- FILTER -------- */
  const filteredRepairs = repairs.filter(item => {
    const matchDorm = dormFilter === "ทั้งหมด" || item.dorm === dormFilter;
    const matchType = typeFilter === "ทั้งหมด" || item.type === typeFilter;
    const matchDate = dateFilter === "ทั้งหมด" || item.time === dateFilter;
    return matchDorm && matchType && matchDate;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <View>
            <Text style={styles.appName}>SUT FixIt</Text>
            <Text style={styles.appSubtitle}>ผู้ดูแลระบบ</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => router.push("/(admin)/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* FILTER */}
      <View style={styles.filterRow}>
        {/* DATE */}
        <View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setOpenFilter(openFilter === "date" ? null : "date")}
          >
            <Text style={styles.filterText}>{dateFilter} ▼</Text>
          </TouchableOpacity>
          {openFilter === "date" && (
            <View style={styles.dropdown}>
              {["ทั้งหมด", "วันนี้", "เมื่อวาน"].map(i => (
                <TouchableOpacity key={i} onPress={() => { setDateFilter(i); setOpenFilter(null); }}>
                  <Text style={styles.dropdownItem}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* DORM */}
        <View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setOpenFilter(openFilter === "dorm" ? null : "dorm")}
          >
            <Text style={styles.filterText}>{dormFilter} ▼</Text>
          </TouchableOpacity>
          {openFilter === "dorm" && (
            <View style={styles.dropdown}>
              {["ทั้งหมด", "สุรนิเวศ 1", "สุรนิเวศ 2", "สุรนิเวศ 3", "สุรนิเวศ 4"].map(i => (
                <TouchableOpacity key={i} onPress={() => { setDormFilter(i); setOpenFilter(null); }}>
                  <Text style={styles.dropdownItem}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* TYPE */}
        <View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setOpenFilter(openFilter === "type" ? null : "type")}
          >
            <Text style={styles.filterText}>{typeFilter} ▼</Text>
          </TouchableOpacity>
          {openFilter === "type" && (
            <View style={styles.dropdown}>
              {["ทั้งหมด", "ประปา", "ไฟฟ้า", "ทั่วไป"].map(i => (
                <TouchableOpacity key={i} onPress={() => { setTypeFilter(i); setOpenFilter(null); }}>
                  <Text style={styles.dropdownItem}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* CONTENT */}
      <ScrollView>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionText}>📋 ประวัติการแจ้งซ่อม</Text>
        </View>

        {filteredRepairs.length > 0 ? (
          filteredRepairs.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => { setSelectedRepair(item); setOpenDetail(true); }}
            >
              {/* 4. ส่งค่า mechanic ไปที่ Component RepairCard */}
              <RepairCard
                title={`หอพัก:${item.dorm}`}
                room={item.room}
                problem={item.problem}
                type={item.type}
                status={item.status}
                time={item.time}
                mechanic={item.mechanic} 
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 40, color: "#6B7280" }}>
            ไม่มีประวัติการซ่อม
          </Text>
        )}
      </ScrollView>

      {/* DETAIL MODAL */}
      <Modal visible={openDetail} animationType="fade" transparent>
        <View style={styles.modalBg}>
          <View style={styles.detailBox}>
            
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setOpenDetail(false)} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={24} color="#F28C28" />
              </TouchableOpacity>
              <Text style={styles.modalTitleText}>รายละเอียดงาน</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.modalDivider} />

            {selectedRepair && (
              <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
                
                {/* 1. Job Info Box */}
                <View style={styles.infoSection}>
                  <View style={styles.infoIconBox}>
                    <Ionicons
                      name={selectedRepair.type === "ประปา" ? "water-outline" : selectedRepair.type === "ไฟฟ้า" ? "flash-outline" : "construct-outline"}
                      size={32}
                      color="#6B7280"
                    />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoIdText}>หมายเลขซ่อม: #SUT-{selectedRepair.studentId.substring(3)}</Text>
                    <Text style={styles.infoRoomText}>เลขห้อง: {selectedRepair.room}</Text>
                    <Text style={styles.infoProblemText}>{selectedRepair.problem}</Text>
                    
                    <View style={styles.statusRow}>
                      <Ionicons name="checkmark-circle-outline" size={16} color={selectedRepair.status === 'done' ? "#22C55E" : "#F59E0B"} />
                      <Text style={[styles.statusTimeText, { color: selectedRepair.status === 'done' ? "#22C55E" : "#F59E0B" }]}>
                        {selectedRepair.status === 'done' ? ' เสร็จสิ้น' : ' กำลังดำเนินการ'} ({selectedRepair.time})
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalDivider} />

                {/* 2. User Info (ผู้แจ้ง) */}
                <View style={styles.userSection}>
                  <View style={styles.userAvatarBox}>
                    <Ionicons name="person" size={24} color="#FFF" />
                  </View>
                  <View>
                    <Text style={styles.userNameText}>ผู้แจ้ง: {selectedRepair.studentId}</Text>
                    <Text style={styles.userPhoneText}>เบอร์ติดต่อ {selectedRepair.phone}</Text>
                  </View>
                </View>

                {/* 2.5 Mechanic Info (ข้อมูลช่างใน Modal) */}
                {selectedRepair.mechanic && (
                  <View style={[styles.userSection, { marginTop: 0 }]}>
                    <View style={[styles.userAvatarBox, { backgroundColor: "#8B5CF6" }]}>
                      <Ionicons name="build" size={20} color="#FFF" />
                    </View>
                    <View>
                      <Text style={styles.userNameText}>ช่าง: {selectedRepair.mechanic}</Text>
                      <Text style={styles.userPhoneText}>ผู้รับผิดชอบงานซ่อม</Text>
                    </View>
                  </View>
                )}

                {/* 3. Location & Type */}
                <View style={styles.locationTypeRow}>
                  <View style={styles.iconTextRow}>
                    <Ionicons name="home" size={16} color="#9CA3AF" />
                    <Text style={styles.iconTextVal}>{selectedRepair.dorm} / {selectedRepair.room}</Text>
                  </View>
                  <Text style={styles.verticalDivider}>|</Text>
                  <View style={styles.iconTextRow}>
                    <Ionicons name="build" size={16} color="#9CA3AF" />
                    <Text style={styles.iconTextVal}>ระบบ{selectedRepair.type}</Text>
                  </View>
                </View>

                {/* 4. Action / Detail list */}
                <View style={[styles.iconTextRow, { marginBottom: 20 }]}>
                  <Ionicons name="document-text-outline" size={16} color="#9CA3AF" />
                  <Text style={styles.iconTextVal}>{selectedRepair.problem}</Text>
                </View>

                {/* 5. Images Section */}
                <View style={styles.imagesContainer}>
                  {selectedRepair.images.slice(0, 2).map((img: string, index: number) => (
                    <TouchableOpacity 
                      key={index} 
                      onPress={() => { setSelectedImage(img); setImageViewer(true); }}
                      style={styles.imageWrapper}
                    >
                      <Image source={{ uri: img }} style={styles.modalGalleryImage} />
                      <Text style={styles.imageLabel}>{index === 0 ? "ก่อนทำ" : "หลังทำ"}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 6. Notes Section */}
                <Text style={styles.noteLabel}>หมายเหตุ</Text>
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>
                    "รอช่างเข้าดำเนินการตรวจสอบเพิ่มเติมตามที่ผู้แจ้งระบุ..."
                  </Text>
                </View>

                {/* 7. Price Section */}
                <View style={styles.priceContainer}>
                  <Text style={styles.noteLabel}>ค่าวัสดุอุปกรณ์</Text>
                  <View style={styles.priceBox}>
                    <Text style={styles.priceText}>{selectedRepair.price || "0"} บาท</Text>
                  </View>
                </View>

                <View style={{ height: 30 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* IMAGE MODAL */}
      <Modal visible={imageViewer} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.imageModalBg}
          onPress={() => setImageViewer(false)}
          activeOpacity={1}
        >
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} />
          )}
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

/* ---------------- STYLE ---------------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? 40 : 10, paddingBottom: 15,
    backgroundColor: "#FFF", borderBottomWidth: 1, borderBottomColor: "#E5E7EB"
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoImage: { width: 44, height: 44, marginRight: 12 },
  appName: { fontSize: 18, fontWeight: "800", color: "#111827" },
  appSubtitle: { fontSize: 12, color: "#F28C28", fontWeight: "600" },
  notificationBtn: { padding: 8, position: "relative" },
  notificationBadge: { position: "absolute", top: 8, right: 8, width: 10, height: 10, backgroundColor: "#EF4444", borderRadius: 5 },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20, zIndex: 10 },
  filterBtn: { backgroundColor: "#F2D7C4", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 25 },
  filterText: { fontWeight: "600", color: "#C65A00" },
  sectionTitle: { paddingHorizontal: 20, marginBottom: 10 },
  sectionText: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  card: { backgroundColor: "#FFF", marginHorizontal: 20, marginBottom: 12, padding: 12, borderRadius: 14, borderLeftWidth: 5 },
  cardRow: { flexDirection: "row" },
  iconBox: { width: 60, height: 60, borderRadius: 10, backgroundColor: "#F3F4F6", justifyContent: "center", alignItems: "center", marginRight: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: "#111827" },
  cardSub: { color: "#6B7280", marginTop: 2 },
  cardProblem: { marginTop: 6, color: "#374151" },
  problemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 8 },
  timeText: { color: "#9CA3AF", fontSize: 12 },
  typeTag: { 
    flexDirection: "row", // จัดให้อยู่แนวนอน
    alignItems: "center", // ให้อยู่กึ่งกลาง
    borderWidth: 1, 
    borderColor: "#E5E7EB", // ขอบสีเทาอ่อน
    borderRadius: 20,       // ขอบมนแบบแคปซูล
    paddingHorizontal: 10, 
    paddingVertical: 4 
  },
  typeText: { 
    color: "#4B5563", // ตัวหนังสือสีเทาเข้ม
    fontWeight: "600", 
    fontSize: 12 
  },
  statusBtn: { backgroundColor: "#F3D27A", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  statusText: { color: "#8B5A00", fontWeight: "600", fontSize: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  dropdown: { position: "absolute", top: 45, backgroundColor: "#FFF", borderRadius: 10, paddingVertical: 8, width: 140, elevation: 10 },
  dropdownItem: { paddingVertical: 8, paddingHorizontal: 12, color: "#374151" },

  /* --- MODAL STYLES --- */
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  detailBox: { width: "90%", maxHeight: "90%", backgroundColor: "#FFF", borderRadius: 24, overflow: "hidden" },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  backBtn: { padding: 4 },
  modalTitleText: { fontSize: 18, fontWeight: "bold", color: "#111" },
  modalDivider: { height: 1, backgroundColor: "#F3F4F6", width: "100%" },
  
  infoSection: { flexDirection: "row", marginTop: 20, marginBottom: 15 },
  infoIconBox: { width: 65, height: 65, borderRadius: 12, backgroundColor: "#F3F4F6", justifyContent: "center", alignItems: "center", marginRight: 15 },
  infoTextContainer: { flex: 1, justifyContent: "center" },
  infoIdText: { fontSize: 14, fontWeight: "bold", color: "#111" },
  infoRoomText: { fontSize: 13, color: "#4B5563", marginTop: 2 },
  infoProblemText: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  statusTimeText: { fontSize: 12, marginLeft: 4, fontWeight: "500" },

  userSection: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  userAvatarBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F28C28", justifyContent: "center", alignItems: "center", marginRight: 12 },
  userNameText: { fontSize: 15, fontWeight: "bold", color: "#111" },
  userPhoneText: { fontSize: 13, color: "#6B7280", marginTop: 2 },

  locationTypeRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  iconTextRow: { flexDirection: "row", alignItems: "center" },
  iconTextVal: { fontSize: 13, color: "#6B7280", marginLeft: 6 },
  verticalDivider: { marginHorizontal: 12, color: "#D1D5DB" },

  imagesContainer: { flexDirection: "row", justifyContent: "center", gap: 15, marginBottom: 20 },
  imageWrapper: { alignItems: "center" },
  modalGalleryImage: { width: 130, height: 130, borderRadius: 16, backgroundColor: "#F3F4F6" },
  imageLabel: { fontSize: 12, color: "#6B7280", marginTop: 8 },

  noteLabel: { fontSize: 14, fontWeight: "bold", color: "#111", marginBottom: 8 },
  noteBox: { backgroundColor: "#FFF4ED", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#FDE8D7" },
  noteText: { fontSize: 13, color: "#9A5015", lineHeight: 20 },

  /* --- PRICE STYLES --- */
  priceContainer: { marginTop: 15 },
  priceBox: { backgroundColor: "#FFF4ED", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#FDE8D7" },
  priceText: { fontSize: 14, color: "#374151" },

  imageModalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
  fullImage: { width: "95%", height: "70%", resizeMode: "contain" }
});