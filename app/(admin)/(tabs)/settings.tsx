import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
  Switch,
  Alert
} from 'react-native';

export default function AdminSettingsScreen() {
  const router = useRouter();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // 1. แก้ไขฟังก์ชันสำหรับปุ่ม Logout ให้เหมือนของเพื่อนและกลับไปหน้า /login
  const handleLogout = () => {
    Alert.alert('ออกจากระบบ', 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบผู้ดูแลระบบ?', [
      { text: 'ยกเลิก', style: 'cancel' },
      { 
        text: 'ออกจากระบบ', 
        style: 'destructive',
        onPress: () => router.replace('/login') 
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image 
            source={require('../../../assets/images/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain" 
          />
          <View>
            <Text style={styles.appName}>SUT FixIt</Text>
            <Text style={styles.appSubtitle}>ระบบซ่อมบำรุงหอพัก</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => router.push("/(admin)/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* เพิ่ม ScrollView ครอบส่วนเนื้อหาทั้งหมด */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          
          {/* 1. PROFILE SECTION */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person" size={45} color="#8B5CF6" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.adminName}>ADMIN01</Text>
              <Text style={styles.adminRole}>ผู้ดูแลระบบ</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* 2. NOTIFICATION SETTING */}
          <Text style={styles.sectionLabel}>การแจ้งเตือน</Text>
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <View style={styles.iconBgGreen}>
                <Ionicons name="notifications" size={20} color="#10B981" />
              </View>
              <Text style={styles.settingText}>แจ้งเตือน</Text>
            </View>
            <Switch
              trackColor={{ false: "#D1D5DB", true: "#F28C28" }}
              thumbColor={isEnabled ? "#FFF" : "#F4F3F4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          {/* 3. ABOUT SYSTEM */}
          <Text style={styles.sectionLabel}>เกี่ยวกับระบบ</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>เวอร์ชันแอปพลิเคชัน</Text>
            <Text style={styles.versionText}>v1.0.2 (Beta)</Text>
          </View>

          {/* 4. LOGOUT BUTTON */}
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 15,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 44, height: 44, borderRadius: 10, marginRight: 12 },
  appName: { fontSize: 18, fontWeight: '800', color: '#111827' },
  appSubtitle: { fontSize: 12, fontWeight: '600', color: '#F28C28', marginTop: 2 },
  notificationBtn: { 
    width: 40, height: 40, borderRadius: 20, 
    backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' 
  },
  // ใส่ style สีแดงให้กระดิ่งแจ้งเตือน
  notificationBadge: { 
    position: 'absolute', top: 8, right: 10, width: 8, height: 8, 
    backgroundColor: '#EF4444', borderRadius: 4 
  },
  
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 25 },
  
  profileCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    padding: 16, borderRadius: 24, marginBottom: 30, elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }
  },
  avatarContainer: {
    width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: '#F28C28',
    padding: 2, justifyContent: 'center', alignItems: 'center'
  },
  avatarCircle: {
    width: '100%', height: '100%', borderRadius: 35, backgroundColor: '#FDE8D7',
    justifyContent: 'center', alignItems: 'center'
  },
  profileInfo: { flex: 1, marginLeft: 15 },
  adminName: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  adminRole: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  editBtn: { 
    width: 36, height: 36, borderRadius: 18, 
    backgroundColor: '#F9FAFB', justifyContent: 'center', alignItems: 'center' 
  },

  sectionLabel: { 
    fontSize: 14, fontWeight: 'bold', color: '#9CA3AF', 
    marginBottom: 12, marginLeft: 10 
  },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', paddingVertical: 14, paddingHorizontal: 20,
    borderRadius: 20, marginBottom: 25,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBgGreen: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: '#DCFCE7', 
    justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  settingText: { fontSize: 16, fontWeight: '600', color: '#374151' },
  versionText: { fontSize: 14, color: '#9CA3AF' },

  // 2. เปลี่ยนชื่อ Class ให้ตรงกับโค้ดด้านบน
  logoutButton: {
    backgroundColor: '#FFF1F2', paddingVertical: 16, borderRadius: 20,
    alignItems: 'center', marginTop: 20, marginBottom: 10,
  },
  logoutButtonText: { fontSize: 16, fontWeight: 'bold', color: '#EF4444' }
});