import { router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminReviewScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("รายการทั้งหมด");

  // State สำหรับควบคุม Modal รายละเอียดงาน
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const tabs = ["รายการทั้งหมด", "เร่งด่วน", "กำลังซ่อม", "เสร็จแล้ว"];

  const reviewJobs = [
    {
      id: "SUT-8829",
      dorm: "หอพัก:สุรนิเวศ1",
      room: "B-402",
      problem: "ซ่อมกลอนประตู",
      type: "ทั่วไป",
      time: "4 ชม. ที่แล้ว",
      status: "เสร็จแล้ว",
      mechanic: "นัททวัฒน์ เอื้อสี",
      phone: "091-xxx-xxxx",
      location: "หอพัก A / 202",
      system: "ระบบประปา",
      action: "เปลี่ยนท่อปั๊บ",
      note: "โคมไฟในห้องหลักกระพริบและดับลง ช่างได้ดำเนินการเปลี่ยนบัลลาสต์และหลอดไฟใหม่ให้เรียบร้อยแล้ว",
    },
  ];

  const handleOpenDetail = (job: any) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.appName}>SUT FixIt</Text>
            <Text style={styles.appSubtitle}>ผู้ดูแลระบบ</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => router.push("/(admin)/notifications")}
          >
            <Ionicons name="notifications-outline" size={24} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* STATUS TABS */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 80,
        }}
      >
        <Text style={styles.sectionTitle}>ตรวจงาน</Text>

        {reviewJobs.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={styles.jobCard}
            activeOpacity={0.8}
            onPress={() => handleOpenDetail(job)}
          >
            <View style={styles.greenBar} />
            <View style={styles.cardContent}>
              <View style={styles.iconBox}>
                <Ionicons name="water-outline" size={32} color="#6B7280" />
              </View>
              <View style={styles.infoBox}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.dormText}>{job.dorm}</Text>
                    <Text style={styles.idText}>หมายเลขซ่อม: #{job.id}</Text>
                    <Text style={styles.roomText}>เลขห้อง: {job.room}</Text>
                  </View>
                  <View style={styles.badgeYellow}>
                    <Text style={styles.badgeYellowText}>ตรวจสอบงาน</Text>
                  </View>
                </View>
                <Text style={styles.problemText}>{job.problem}</Text>
                
                {/* --- เอาเวลาและสถานะมาไว้บนเส้น --- */}
                <View style={[styles.rowBetween, { marginTop: 12 }]}>
                  <Text style={styles.timeText}>เสร็จแล้วเมื่อ {job.time}</Text>
                  <Text style={styles.statusText}>{job.status}</Text>
                </View>

                <View style={styles.divider} />
                
                {/* --- เอาแท็ก "ทั่วไป" มาไว้ใต้เส้น --- */}
                <View style={styles.footerRow}>
                  <View style={styles.tagType}>
                    <Ionicons name="construct" size={14} color="#6B7280" />
                    <Text style={styles.tagTypeText}>{job.type}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* MODAL รายละเอียดตรวจสอบงาน */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="chevron-back" size={24} color="#F28C28" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>ตรวจสอบงาน</Text>
              <View style={{ width: 24 }} />
            </View>
            <View style={styles.modalDivider} />

            {selectedJob && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ padding: 16 }}
              >
                {/* 1. หมายเลขซ่อม */}
                <View style={styles.detailRow}>
                  <View style={styles.largeIconBox}>
                    <Ionicons name="water-outline" size={30} color="#6B7280" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.boldText}>
                      หมายเลขซ่อม: #{selectedJob.id}
                    </Text>
                    <Text style={styles.subText}>
                      เลขห้อง: {selectedJob.room}
                    </Text>
                    <Text style={styles.subText}>ท่อน้ำรั่วในห้องน้ำ</Text>
                    <View style={styles.checkRow}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={14}
                        color="#F28C28"
                      />
                      <Text style={styles.orangeTimeText}>
                        {" "}
                        แจ้งเมื่อ: 10 นาทีแล้ว
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalDivider} />

                {/* 2. ข้อมูลช่าง */}
                <View style={styles.mechanicRow}>
                  <View style={styles.avatarBox}>
                    <Ionicons name="person" size={24} color="#FFF" />
                  </View>
                  <View>
                    <Text style={styles.boldText}>
                      ช่าง: {selectedJob.mechanic}
                    </Text>
                    <Text style={styles.subText}>
                      เบอร์ติดต่อ {selectedJob.phone}
                    </Text>
                  </View>
                </View>

                {/* 3. สถานที่และระบบ */}
                <View style={styles.iconInfoRow}>
                  <Ionicons name="home" size={16} color="#9CA3AF" />
                  <Text style={styles.iconInfoText}>
                    {selectedJob.location} |{" "}
                  </Text>
                  <Ionicons name="build" size={16} color="#9CA3AF" />
                  <Text style={styles.iconInfoText}>ระบบประปา</Text>
                </View>
                <View style={[styles.iconInfoRow, { marginTop: 8 }]}>
                  <Ionicons
                    name="document-text-outline"
                    size={16}
                    color="#9CA3AF"
                  />
                  <Text style={styles.iconInfoText}>{selectedJob.action}</Text>
                </View>

                {/* 4. รูปภาพประกอบ */}
                <View style={styles.imageGrid}>
                  <View style={styles.imageItem}>
                    <View style={styles.imagePlaceholder}>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#FFF"
                        style={styles.closeIcon}
                      />
                    </View>
                    <Text style={styles.imageLabel}>ก่อนทำ</Text>
                  </View>
                  <View style={styles.imageItem}>
                    <View style={styles.imagePlaceholder}>
                      <Ionicons
                        name="close-circle"
                        size={18}
                        color="#FFF"
                        style={styles.closeIcon}
                      />
                    </View>
                    <Text style={styles.imageLabel}>หลังทำ</Text>
                  </View>
                </View>

                {/* 5. หมายเหตุ */}
                <Text style={styles.boldLabel}>หมายเหตุ</Text>
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>{selectedJob.note}</Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.boldLabel}>ค่าวัสดุอุปกรณ์</Text>
                  <View style={styles.priceBox}>
                    <Text style={styles.priceText}>100</Text>
                  </View>
                </View>

                {/* 6. ปุ่มตกลง */}
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.submitBtnText}>ตกลง</Text>
                </TouchableOpacity>
                <View style={{ height: 20 }} />
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 50 : 10,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoImage: { width: 44, height: 44, borderRadius: 10, marginRight: 12 },
  appName: { fontSize: 18, fontWeight: "800", color: "#111827" },
  appSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#F28C28",
    marginTop: 2,
  },
  headerRight: { flexDirection: "row", gap: 12, alignItems: "center" },
  notificationBtn: { padding: 8, position: "relative" },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    backgroundColor: "#EF4444",
    borderRadius: 4,
  },
  profileBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FDE8D7",
    justifyContent: "center",
    alignItems: "center",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  tabItem: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: "#F28C28",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  activeTabText: {
    color: "#F28C28",
  },

  container: { paddingHorizontal: 20, paddingTop: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 20,
  },

  jobCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  greenBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: "#10B981",
  },
  cardContent: { flexDirection: "row", padding: 16, paddingLeft: 20 },
  iconBox: {
    width: 55,
    height: 55,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoBox: { flex: 1 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dormText: { fontSize: 16, fontWeight: "bold", color: "#111" },
  idText: { fontSize: 11, fontWeight: "bold", color: "#111", marginTop: 2 },
  roomText: { fontSize: 12, color: "#6B7280" },
  badgeYellow: {
    backgroundColor: "#FDE047",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeYellowText: { fontSize: 10, fontWeight: "bold", color: "#854D0E" },
  problemText: { fontSize: 14, color: "#374151", marginTop: 10 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 12 },
  timeText: { fontSize: 12, color: "#9CA3AF" },
  statusText: { fontSize: 14, fontWeight: "bold", color: "#10B981" },
  footerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4, // ลด marginTop ลงหน่อยเพราะย้ายมาด้านล่างแล้ว
  },
  tagType: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagTypeText: {
    fontSize: 12,
    color: "#374151",
    marginLeft: 4,
    fontWeight: "600",
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "90%",
    maxHeight: "95%",
    borderRadius: 24,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  modalTitle: { fontSize: 16, fontWeight: "bold", color: "#111" },
  modalDivider: { height: 1, backgroundColor: "#F3F4F6" },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
  },
  largeIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  boldText: { fontSize: 14, fontWeight: "bold", color: "#111" },
  subText: { fontSize: 12, color: "#6B7280", marginTop: 2 },
  checkRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  orangeTimeText: { fontSize: 12, color: "#F28C28", fontWeight: "500" },
  mechanicRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F28C28",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconInfoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  iconInfoText: { fontSize: 13, color: "#9CA3AF", marginLeft: 6 },
  imageGrid: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 20,
  },
  imageItem: { alignItems: "center" },
  imagePlaceholder: {
    width: 110,
    height: 110,
    backgroundColor: "#6B7280",
    borderRadius: 16,
    position: "relative",
  },
  closeIcon: { position: "absolute", top: 5, right: 5 },
  imageLabel: { fontSize: 12, color: "#6B7280", marginTop: 8 },
  boldLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 8,
  },
  noteBox: {
    backgroundColor: "#FFF4ED",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#FDE8D7",
  },
  noteText: { fontSize: 12, color: "#9A5015", lineHeight: 18 },
  submitBtn: {
    backgroundColor: "#DCFCE7",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#10B981",
  },
  submitBtnText: { color: "#10B981", fontWeight: "bold", fontSize: 16 },

  /* เพิ่ม STYLES สำหรับค่าวัสดุอุปกรณ์ */
  priceContainer: {
    marginTop: 15,
  },
  priceBox: {
    backgroundColor: "#FFF4ED",  // ใช้สีพื้นหลังส้มอ่อนแบบเดียวกับ noteBox
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  priceText: {
    fontSize: 14,
    color: "#374151",
  },

});