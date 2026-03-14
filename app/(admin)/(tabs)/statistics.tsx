import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AdminStatisticsScreen() {
  const router = useRouter();

  const [mechanicModalVisible, setMechanicModalVisible] = useState(false);
  const [jobDetailModalVisible, setJobDetailModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedMechanic, setSelectedMechanic] = useState<any>(null);
  const [understandChecked, setUnderstandChecked] = useState(false);

  const topMechanics = [
    { id: 1, name: 'นัททวัฒน์ เอื้อสี', jobs: 45, phone: '097-999-9999' },
    { id: 2, name: 'ช่างปั๊ป', jobs: 39, phone: '091-xxx-xxxx' },
    { id: 3, name: 'ช่างมันส์', jobs: 12, phone: '088-xxx-xxxx' },
  ];

  const topRooms = [
    { rank: 1, room: '1-402', count: 5, color: '#F59E0B' },
    { rank: 2, room: '2-101', count: 3, color: '#9CA3AF' },
    { rank: 3, room: '3-120', count: 2, color: '#F87171' },
  ];

  const materials = [
    { name: 'เครื่องปรับอากาศ', percent: 20 },
    { name: 'หลอดไฟ', percent: 60 },
    { name: 'ท่อน้ำ', percent: 40 },
    { name: 'วัสดุไม้', percent: 15 },
    { name: 'ค่าแรง', percent: 50 },
    { name: 'กระจก', percent: 45 },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} resizeMode="contain" />
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      >
        <View style={styles.container}>
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>สถิติ</Text>
            <View style={styles.monthFilter}>
              <Text style={styles.monthText}>เดือนนี้</Text>
              <Ionicons name="chevron-down" size={14} color="#111" />
            </View>
          </View>

          <View style={styles.summaryGrid}>
            <View style={[styles.summaryCard, { backgroundColor: '#F5E6D8' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="calendar-outline" size={18} color="#F28C28" />
                <Text style={[styles.summaryLabel, { marginLeft: 8 }]}>งานทั้งหมด</Text>
              </View>
              <Text style={styles.summaryValue}>128</Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#DDEBDE' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#22C55E" />
                <Text style={[styles.summaryLabel, { marginLeft: 8 }]}>งานที่เสร็จสิ้น</Text>
              </View>
              <Text style={styles.summaryValue}>110</Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#FCE8E8' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="build-outline" size={18} color="#EF4444" />
                <Text style={[styles.summaryLabel, { marginLeft: 8 }]}>กำลังซ่อม</Text>
              </View>
              <Text style={styles.summaryValue}>20</Text>
            </View>

            <View style={[styles.summaryCard, { backgroundColor: '#FCE8E8' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="time-outline" size={18} color="#EF4444" />
                <Text style={[styles.summaryLabel, { marginLeft: 8 }]}>รอดำเนินการ</Text>
              </View>
              <Text style={styles.summaryValue}>10</Text>
            </View>
          </View>

          <View style={styles.twoColumnGrid}>
            <View style={styles.column}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>สัดส่วนสถานะงาน</Text>
                <View style={styles.piePlaceholder} />
                <Text style={styles.legendText}>• เสร็จแล้ว 96  • กำลังซ่อม 12</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Top ห้องที่แจ้งซ่อมบ่อย</Text>
                {topRooms.map((item, idx) => (
                  <View key={idx} style={styles.rowBetween}>
                    <Text style={{ fontSize: 10 }}><Ionicons name="star" color={item.color} size={12} /> {item.room}</Text>
                    <View style={styles.countBadge}><Text style={styles.countText}>{item.count} ครั้ง</Text></View>
                  </View>
                ))}
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>ช่างที่ทำงานมากที่สุด</Text>
                {topMechanics.map((mech, idx) => (
                  <TouchableOpacity key={idx} style={styles.mechRowMain} onPress={() => { setSelectedMechanic(mech); setMechanicModalVisible(true); }}>
                    <View style={styles.avatarSmall}><Ionicons name="person" size={10} color="#8B5CF6" /></View>
                    <Text style={styles.mechNameMain} numberOfLines={1}>{mech.name}</Text>
                    <Text style={styles.mechJobsMain}>{mech.jobs} งาน</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.card}><Text style={styles.cardTitle}>จำนวนงานแยกตามประเภท</Text><View style={styles.graphPlaceholder} /></View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>แนวโน้มงานรายเดือน</Text>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { height: 40 }]} />
                  <View style={[styles.bar, { height: 25 }]} />
                  <View style={[styles.bar, { height: 30 }]} />
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>ค่าวัสดุอุปกรณ์</Text>
                {materials.map((m, i) => (
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={styles.materialText}>{m.name}</Text>
                    <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${m.percent}%` }]} /></View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ส่วน Modal ต่างๆ */}
      <Modal visible={mechanicModalVisible} transparent={false} animationType="slide">
        <SafeAreaView style={styles.modalFullContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setMechanicModalVisible(false)}><Ionicons name="chevron-back" size={30} color="#F28C28" /></TouchableOpacity>
          <ScrollView style={{ paddingHorizontal: 20 }}>
            <View style={styles.profileSection}><View style={styles.avatarLarge}><Ionicons name="person" size={55} color="#8B5CF6" /></View></View>
            <View style={styles.formSection}>
              <Text style={styles.label}>ชื่อ-นามสกุล</Text>
              <View style={styles.inputBox}><Text style={styles.inputText}>ช่าง: {selectedMechanic?.name}</Text></View>
              <Text style={styles.label}>เบอร์โทร</Text>
              <View style={styles.inputBox}><Text style={styles.inputText}>{selectedMechanic?.phone}</Text></View>
            </View>
            <View style={styles.jobList}>
              {[1, 2].map((item) => (
                <TouchableOpacity key={item} style={styles.jobCard} onPress={() => setJobDetailModalVisible(true)}>
                  <View style={styles.jobGreenBar} />
                  <View style={styles.jobContent}>
                    <View style={styles.jobIconBox}><Ionicons name="water-outline" size={30} color="#6B7280" /></View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.rowBetween}><Text style={styles.jobRoom}>เลขห้อง: B-402</Text><Text style={styles.statusDone}>ซ่อมแล้ว</Text></View>
                      <Text style={styles.jobProblem}>ซ่อมกลอนประตู</Text>
                      <View style={styles.jobFooter}><Text style={styles.timeText}>เสร็จแล้วเมื่อ 4 ชม. ที่แล้ว</Text><View style={styles.tagBox}><Text style={styles.tagText}>ทั่วไป</Text></View></View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Modal visible={jobDetailModalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.detailBox}>
                <View style={styles.detailHeader}><TouchableOpacity onPress={() => setJobDetailModalVisible(false)}><Ionicons name="chevron-back" size={24} color="#F28C28" /></TouchableOpacity><Text style={styles.detailTitleText}>รายละเอียดงาน</Text><View style={{ width: 24 }} /></View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 15 }}>
                  <View style={styles.infoRow}>
                    <View style={styles.jobIconSmall}><Ionicons name="water-outline" size={30} color="#6B7280" /></View>
                    <View style={{ flex: 1 }}><Text style={styles.boldText}>หมายเลขซ่อม: #SUT-8829</Text><Text style={styles.subText}>เลขห้อง: B-402</Text><Text style={styles.orangeTimeText}><Ionicons name="checkmark-circle-outline" /> เสร็จเมื่อ: 10 นาทีแล้ว</Text></View>
                  </View>
                  <View style={styles.modalDivider} />

                  <View style={styles.mechanicDetailRow}>
                    <View style={styles.avatarCircle}><Ionicons name="person" size={20} color="#8B5CF6" /></View>
                    <View style={{ marginLeft: 12 }}><Text style={styles.boldText}>ช่าง: ปิ๊ป นะเว้ย</Text><Text style={styles.subText}>เบอร์ติดต่อ 091-xxx-xxxx</Text></View>
                  </View>
                  <View style={styles.locationInfoRow}><Ionicons name="home" size={14} color="#6B7280" /><Text style={styles.locationText}> หอพัก A / 202  |  </Text><Ionicons name="build" size={14} color="#6B7280" /><Text style={styles.locationText}> ระบบประปา</Text></View>

                  <View style={styles.imageGrid}>
                    <View style={styles.imageBox}><Image source={{ uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200' }} style={styles.imageAsset} /><Text style={styles.imageLabelUnder}>ก่อนทำ</Text><Ionicons name="close-circle" size={18} color="#FFF" style={styles.closeImgIcon} /></View>
                    <View style={styles.imageBox}><Image source={{ uri: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200' }} style={styles.imageAsset} /><Text style={styles.imageLabelUnder}>หลังทำ</Text><Ionicons name="close-circle" size={18} color="#FFF" style={styles.closeImgIcon} /></View>
                  </View>

                  <Text style={styles.sectionLabelBold}>หมายเหตุ</Text>
                  <View style={styles.noteBox}><Text style={styles.noteText}>"โคมไฟในห้องหลักกระพริบและดับลง ช่างได้ดำเนินการเปลี่ยนบัลลาสต์และหลอดไฟใหม่ให้เรียบร้อยแล้ว"</Text></View>

                  <Text style={styles.sectionLabelBold}>รีวิวการทำงาน</Text>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar} />
                    <View style={{ flex: 1, marginLeft: 10 }}><View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={styles.boldText}>ปิ๊ป </Text><View style={styles.starRow}>{[1, 2, 3, 4, 5].map(s => <Ionicons key={s} name="star" size={10} color="#F59E0B" />)}</View></View><Text style={styles.subText}>หอสุรนิเวศ1-A123</Text></View>
                    <View style={styles.actionRow}><TouchableOpacity style={styles.redDelBtn} onPress={() => setDeleteModalVisible(true)}><Text style={styles.btnTxt}>ลบ</Text></TouchableOpacity><TouchableOpacity style={styles.greyHideBtn}><Text style={styles.btnTxt}>ซ่อน</Text></TouchableOpacity></View>
                  </View>
                  <View style={styles.reviewOrangeBox}><Text style={{ fontSize: 12, color: '#000', fontWeight: '500' }}>ดีมากครับคราวหลังไม่ต้องหยอกเล่นครับทำดีจริงๆ</Text></View>
                  <TouchableOpacity style={styles.confirmBtn} onPress={() => setJobDetailModalVisible(false)}><Text style={styles.confirmBtnText}>ตกลง</Text></TouchableOpacity>
                </ScrollView>
              </View>

              <Modal visible={deleteModalVisible} transparent animationType="slide">
                <View style={styles.deleteOverlay}>
                  <View style={styles.deleteSheet}>
                    <View style={styles.deleteHeaderRow}><Ionicons name="trash" size={24} color="#EF4444" /><Text style={styles.deleteTitle}>Delete Comment</Text></View>
                    <Text style={styles.deleteSub}>คุณแน่ใจที่ต้องการลบความคิดเห็นนี้จริงใช่ไหม?</Text>
                    <TouchableOpacity style={styles.checkboxRow} onPress={() => setUnderstandChecked(!understandChecked)}>
                      <View style={[styles.checkbox, understandChecked && { backgroundColor: '#EF4444', borderColor: '#EF4444' }]}>{understandChecked && <Ionicons name="checkmark" size={14} color="#FFF" />}</View>
                      <Text style={styles.checkboxText}>ฉันเข้าใจและจะไม่สามารถกู้คืนความคิดเห็นนี้ได้</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <TouchableOpacity style={[styles.confirmDelBtn, !understandChecked && { opacity: 0.5 }]} disabled={!understandChecked} onPress={() => { setDeleteModalVisible(false); setJobDetailModalVisible(false); }}><Text style={styles.confirmDelText}>ลบ</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.cancelDelBtn} onPress={() => setDeleteModalVisible(false)}><Text style={styles.cancelDelText}>ยกเลิก</Text></TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </Modal>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 44, height: 44, marginRight: 12 },
  appName: { fontSize: 18, fontWeight: '800', color: '#111827' },
  appSubtitle: { fontSize: 12, fontWeight: '600', color: '#F28C28', marginTop: 2 },
  notificationBtn: { padding: 4, position: 'relative' },
  notificationBadge: { position: 'absolute', top: 4, right: 6, width: 10, height: 10, backgroundColor: '#EF4444', borderRadius: 5, borderWidth: 1.5, borderColor: '#FFF' },
  container: { paddingHorizontal: 16, paddingTop: 10 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
  pageTitle: { fontSize: 20, fontWeight: 'bold' },
  monthFilter: { backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, flexDirection: 'row', alignItems: 'center' },
  monthText: { fontSize: 12, fontWeight: 'bold' },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  summaryCard: { width: '48%', borderRadius: 18, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 14, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  summaryLabel: { fontSize: 16, color: '#374151', fontWeight: 'bold' },
  summaryValue: { fontSize: 24, fontWeight: 'bold', textAlign: 'right', marginTop: 6 },
  twoColumnGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, marginBottom: 50 },
  column: { width: '48%' },
  card: { backgroundColor: "#FFF", borderRadius: 20, padding: 20, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  piePlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#EEE', alignSelf: 'center', marginVertical: 10 },
  legendText: { fontSize: 12, color: '#666', textAlign: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  countBadge: { backgroundColor: '#F3F4F6', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 5 },
  countText: { fontSize: 9, color: '#666' },
  mechRowMain: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 2 },
  avatarSmall: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FDE8D7', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  mechNameMain: { fontSize: 12, flex: 1 },
  mechJobsMain: { fontSize: 12, color: '#999' },
  graphPlaceholder: { height: 50, backgroundColor: '#F9FAFB', borderRadius: 5, borderWidth: 1, borderColor: '#EEE' },
  barContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 50, gap: 5, justifyContent: 'center' },
  bar: { width: 12, backgroundColor: '#4F46E5', borderRadius: 3 },
  progressBar: { height: 4, backgroundColor: '#EEE', borderRadius: 2, marginTop: 4 },
  progressFill: { height: 4, backgroundColor: '#F28C28', borderRadius: 2 },
  modalFullContainer: { flex: 1, backgroundColor: '#FFF' },
  backButton: { padding: 15 },
  profileSection: { alignItems: 'center', marginBottom: 15 },
  avatarLarge: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#FDE8D7', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#F28C28' },
  formSection: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  inputBox: { borderWidth: 1, borderColor: '#FDE8D7', borderRadius: 10, padding: 12, marginBottom: 10 },
  inputText: { fontSize: 14 },
  jobList: { paddingBottom: 20 },
  jobCard: { backgroundColor: '#FFF', borderRadius: 15, marginBottom: 12, elevation: 3, overflow: 'hidden' },
  jobGreenBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: '#10B981' },
  jobContent: { flexDirection: 'row', padding: 12 },
  jobIconBox: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  jobRoom: { fontSize: 15, fontWeight: 'bold' },
  statusDone: { color: '#10B981', fontWeight: 'bold', fontSize: 11 },
  jobProblem: { color: '#666', fontSize: 13, marginTop: 3 },
  jobFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  timeText: { color: '#9CA3AF', fontSize: 11 },
  tagBox: { borderWidth: 1, borderColor: '#F28C28', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tagText: { color: '#F28C28', fontSize: 11, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  detailBox: { backgroundColor: '#FFF', width: '94%', borderRadius: 25, maxHeight: '88%', overflow: 'hidden' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  detailTitleText: { fontSize: 16, fontWeight: 'bold' },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  jobIconSmall: { width: 45, height: 45, backgroundColor: '#F3F4F6', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  boldText: { fontSize: 14, fontWeight: 'bold' },
  subText: { fontSize: 11, color: '#6B7280' },
  orangeTimeText: { fontSize: 11, color: '#F28C28', marginTop: 4, fontWeight: '600' },
  modalDivider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },
  mechanicDetailRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  avatarCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FDE8D7', justifyContent: 'center', alignItems: 'center' },
  locationInfoRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 48, marginTop: 4 },
  locationText: { fontSize: 11, color: '#6B7280' },
  imageGrid: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginVertical: 15 },
  imageBox: { width: width * 0.35, height: width * 0.35, backgroundColor: '#9CA3AF', borderRadius: 15, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  imageAsset: { width: '100%', height: '100%', position: 'absolute' },
  imageLabelUnder: { color: '#999', fontSize: 10, marginTop: 135 },
  closeImgIcon: { position: 'absolute', top: 5, right: 5 },
  sectionLabelBold: { fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 8 },
  noteBox: { backgroundColor: '#FFF4ED', borderRadius: 15, padding: 15, borderWidth: 1, borderColor: '#FDE8D7' },
  noteText: { fontSize: 11, color: '#9A5015', lineHeight: 18 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 },
  reviewAvatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#A88B8B' },
  starRow: { flexDirection: 'row', marginLeft: 5 },
  actionRow: { flexDirection: 'row', gap: 6 },
  redDelBtn: { backgroundColor: '#EF4444', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  greyHideBtn: { backgroundColor: '#9CA3AF', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  btnTxt: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  reviewOrangeBox: { backgroundColor: '#FDCB9E', padding: 15, borderRadius: 12, marginBottom: 20 },
  confirmBtn: { backgroundColor: '#DCFCE7', padding: 15, borderRadius: 15, alignItems: 'center' },
  confirmBtnText: { color: '#10B981', fontWeight: 'bold', fontSize: 16 },
  deleteOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  deleteSheet: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  deleteHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 12 },
  deleteTitle: { fontSize: 20, fontWeight: 'bold' },
  deleteSub: { fontSize: 14, color: '#666', marginBottom: 20 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: '#D1D5DB', borderRadius: 5, marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxText: { fontSize: 13, color: '#6B7280' },
  confirmDelBtn: { flex: 1, backgroundColor: '#FFF1F2', padding: 16, borderRadius: 15, alignItems: 'center' },
  confirmDelText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
  cancelDelBtn: { flex: 1, backgroundColor: '#F3F4F6', padding: 16, borderRadius: 15, alignItems: 'center' },
  cancelDelText: { color: '#6B7280', fontWeight: 'bold', fontSize: 16 },
  materialText: { fontSize: 14, fontWeight: '500', marginBottom: 4, color: "#374151" }
});