import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
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

/* -------------------- CARD COMPONENT -------------------- */

function RepairCard({ title, room, problem, type, status, time }: any) {
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
        {/* icon */}
        <View style={styles.iconBox}>
          <Ionicons
            name={iconType[type] || "construct-outline"}
            size={26}
            color="#6B7280"
          />
        </View>

        {/* content */}
        <View style={{ flex: 1 }}>
          {/* header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardSub}>เลขห้อง: {room}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: statusColor[status] }]}>
              <Text style={styles.badgeText}>{statusText[status]}</Text>
            </View>
          </View>

          {/* problem & type tag (บนเส้น) */}
          <View style={styles.problemRow}>
            <Text style={styles.cardProblem}>{problem}</Text>
            <View style={styles.typeTag}>
              <Ionicons name="construct" size={12} color="#4B5563" style={{ marginRight: 4 }} />
              <Text style={styles.typeText}>{type}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* bottom (ล่างเส้น) */}
          <View style={styles.bottomRow}>
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

/* -------------------- MAIN SCREEN -------------------- */

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [imageViewer, setImageViewer] = useState(false);

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
      images: [
        "https://i.imgur.com/8Km9tLL.jpg",
        "https://i.imgur.com/jNNT4LE.jpg"
      ]
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
      images: [
        "https://i.imgur.com/8Km9tLL.jpg",
        "https://i.imgur.com/jNNT4LE.jpg"
      ]
    }
  ];

  const [dateFilter, setDateFilter] = useState("ทั้งหมด");
  const [dormFilter, setDormFilter] = useState("ทั้งหมด");
  const [typeFilter, setTypeFilter] = useState("ทั้งหมด");

  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredRepairs = repairs.filter(item => {
    const matchTab = activeTab === "all" || item.status === activeTab;
    const matchDorm = dormFilter === "ทั้งหมด" || item.dorm === dormFilter;
    const matchType = typeFilter === "ทั้งหมด" || item.type === typeFilter;
    const matchDate = dateFilter === "ทั้งหมด" || item.time === dateFilter;
    return matchTab && matchDorm && matchType && matchDate;
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
            <Text style={styles.appSubtitle}>ผู้ดูแลระบบ (Admin)</Text>
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

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("all")}>
          <Text style={activeTab === "all" ? styles.activeTab : styles.tab}>รายการทั้งหมด</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("urgent")}>
          <Text style={activeTab === "urgent" ? styles.activeTab : styles.tab}>เร่งด่วน</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("repair")}>
          <Text style={activeTab === "repair" ? styles.activeTab : styles.tab}>กำลังซ่อม</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("done")}>
          <Text style={activeTab === "done" ? styles.activeTab : styles.tab}>เสร็จแล้ว</Text>
        </TouchableOpacity>
      </View>

      {/* FILTER */}
      <View style={styles.filterRow}>
        <View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setOpenFilter(openFilter === "date" ? null : "date")}>
            <Text style={styles.filterText}>{dateFilter} ▼</Text>
          </TouchableOpacity>
          {openFilter === "date" && (
            <View style={styles.dropdown}>
              {["ทั้งหมด", "วันนี้", "เมื่อวาน", "7 วันที่ผ่านมา"].map(i => (
                <TouchableOpacity key={i} onPress={() => { setDateFilter(i); setOpenFilter(null); }}>
                  <Text style={styles.dropdownItem}>{i}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setOpenFilter(openFilter === "dorm" ? null : "dorm")}>
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

        <View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setOpenFilter(openFilter === "type" ? null : "type")}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitle}>
          <Text style={styles.sectionText}>📋 จัดการคำร้องแจ้งซ่อม</Text>
        </View>

        {filteredRepairs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedRepair(item);
              setOpenDetail(true);
            }}
          >
            <RepairCard
              title={`หอพัก:${item.dorm}`}
              room={item.room}
              problem={item.problem}
              type={item.type}
              status={item.status}
              time={item.time}
            />
          </TouchableOpacity>
        ))}

        {/* MODAL DETAIL (อิงตามเลย์เอาต์หน้า History) */}
        <Modal visible={openDetail} animationType="slide" transparent={true}>
          <View style={styles.modalBg}>
            <View style={styles.detailBox}>
              <View style={styles.detailHeader}>
                <TouchableOpacity onPress={() => setOpenDetail(false)}>
                  <Ionicons name="chevron-back" size={26} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.detailTitle}>รายละเอียดคำร้องแจ้งซ่อม</Text>
              </View>

              {selectedRepair && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.roomRow}>
                    <View style={styles.bigIcon}>
                      <Ionicons name="water-outline" size={30} color="#6B7280" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.roomText}>เลขห้อง: {selectedRepair.room}</Text>
                      <Text style={styles.dormText}>หอพัก: {selectedRepair.dorm}</Text>
                      <Text style={styles.problemText}>{selectedRepair.problem}</Text>
                    </View>
                    <Text style={styles.urgentTag}>
                      {selectedRepair.status === "urgent" && "เร่งด่วน"}
                      {selectedRepair.status === "repair" && "กำลังซ่อม"}
                      {selectedRepair.status === "done" && "ซ่อมแล้ว"}
                      {selectedRepair.status === "normal" && "ปกติ"}
                    </Text>
                  </View>

                  <View style={styles.line} />

                  <View style={styles.userRow}>
                    <View style={styles.avatar}>
                      <Ionicons name="person" size={22} color="#fff" />
                    </View>
                    <View>
                      <Text style={styles.userName}>รหัสนักศึกษา: {selectedRepair.studentId}</Text>
                      <Text style={styles.userPhone}>เบอร์โทร {selectedRepair.phone}</Text>
                    </View>
                  </View>

                  <View style={styles.locationRow}>
                    <Ionicons name="home-outline" size={18} color="#6B7280" />
                    <Text style={{ marginLeft: 8 }}>หอพัก A / 202 / ระบบประปา</Text>
                  </View>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {selectedRepair.images.map((img: string, index: number) => (
                      <TouchableOpacity key={index} onPress={() => { setSelectedImage(img); setImageViewer(true); }}>
                        <Image source={{ uri: img }} style={styles.galleryImage} />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={18} color="#6B7280" />
                    <Text style={{ marginLeft: 8 }}>แจ้งงาน - {selectedRepair.time}</Text>
                  </View>

                  <View style={styles.timeline}>
                    <View style={styles.timelineRow}>
                      <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                      <Text style={{ marginLeft: 8 }}>รับงาน</Text>
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        {/* IMAGE VIEWER */}
        <Modal visible={imageViewer} transparent={true} animationType="fade">
          <TouchableOpacity style={styles.imageModalBg} onPress={() => setImageViewer(false)}>
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} />}
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? 40 : 10,
    paddingBottom: 15, backgroundColor: "#FFF", borderBottomWidth: 1, borderBottomColor: "#E5E7EB"
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoImage: { width: 44, height: 44, marginRight: 12 },
  appName: { fontSize: 18, fontWeight: "800", color: "#111827" },
  appSubtitle: { fontSize: 12, fontWeight: "600", color: "#F28C28" },
  notificationBtn: { padding: 4 },
  notificationBadge: {
    position: "absolute", top: 4, right: 6, width: 10, height: 10,
    backgroundColor: "#EF4444", borderRadius: 5, borderWidth: 1.5, borderColor: "#FFF"
  },
  tabs: {
    flexDirection: "row", justifyContent: "space-around", borderBottomWidth: 1,
    borderBottomColor: "#eee", paddingBottom: 10, marginTop: 20
  },
  tab: { color: "#777", fontWeight: "600", fontSize: 16 },
  activeTab: {
    color: "#F28C28", fontWeight: "bold", borderBottomWidth: 2,
    borderBottomColor: "#F28C28", paddingBottom: 4, fontSize: 16
  },
  filterRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20, zIndex: 100 },
  filterBtn: { backgroundColor: "#F2D7C4", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 25 },
  filterText: { fontWeight: "600", color: "#C65A00" },
  sectionTitle: { paddingHorizontal: 20, marginBottom: 10 },
  sectionText: { fontSize: 20, fontWeight: "bold", color: "#111827" },
  
  /* --- STYLES สำหรับ CARD (ปรับตามรูป) --- */
  card: {
    backgroundColor: "#FFF", marginHorizontal: 20, marginBottom: 12, padding: 16,
    borderRadius: 14, borderLeftWidth: 6, shadowColor: "#000",
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2
  },
  cardRow: { flexDirection: "row" },
  iconBox: {
    width: 60, height: 60, borderRadius: 10, backgroundColor: "#F3F4F6",
    justifyContent: "center", alignItems: "center", marginRight: 14
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: "#111827" },
  cardSub: { color: "#6B7280", marginTop: 4, fontSize: 13 },
  
  problemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  cardProblem: { color: "#374151", flex: 1, paddingRight: 10 },
  
  typeTag: {
    flexDirection: "row", alignItems: "center", borderWidth: 1,
    borderColor: "#E5E7EB", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4
  },
  typeText: { color: "#4B5563", fontWeight: "600", fontSize: 12 },
  
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
  
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  timeText: { color: "#9CA3AF", fontSize: 12 },
  statusBtn: { backgroundColor: "#FDE047", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  statusText: { fontWeight: "bold", fontSize: 12, color: "#1F2937" },
  
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, marginTop: -5 },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  
  dropdown: {
    position: "absolute", top: 45, left: 0, backgroundColor: "#FFF",
    borderRadius: 10, paddingVertical: 8, width: 140, elevation: 10, zIndex: 200
  },
  dropdownItem: { paddingVertical: 8, paddingHorizontal: 12, fontSize: 14, color: "#374151" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  detailBox: { width: "92%", backgroundColor: "#FFF", borderRadius: 20, padding: 16, maxHeight: '90%' },
  detailHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  detailTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 10, color: "#111827" },
  roomRow: { flexDirection: "row", alignItems: "center" },
  bigIcon: {
    width: 55, height: 55, borderRadius: 10, backgroundColor: "#F3F4F6",
    justifyContent: "center", alignItems: "center", marginRight: 10
  },
  roomText: { fontWeight: "bold", fontSize: 15, color: "#111827" },
  dormText: { color: "#6B7280" },
  problemText: { marginTop: 3, color: "#374151" },
  urgentTag: { color: "#EF4444", fontWeight: "bold" },
  line: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },
  userRow: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 38, height: 38, borderRadius: 20, backgroundColor: "#F28C28",
    justifyContent: "center", alignItems: "center", marginRight: 10
  },
  userName: { fontWeight: "bold", color: "#111827" },
  userPhone: { color: "#6B7280", fontSize: 12 },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  timeRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  timeline: { marginTop: 10 },
  timelineRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  imageModalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center" },
  fullImage: { width: "95%", height: 400, resizeMode: "contain" },
  galleryImage: { width: 140, height: 110, borderRadius: 10, marginRight: 10 }
});