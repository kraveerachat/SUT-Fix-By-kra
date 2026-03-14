import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* ✅ แก้ไข: เปลี่ยนจาก '/login' เป็น '/' เพื่อให้กลับไปที่ไฟล์ index.tsx (หน้า Login หลัก) */}
        <TouchableOpacity
          onPress={() => router.push('/')} 
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={26} color="#F28C28" />
        </TouchableOpacity>

        <View style={styles.logoWrap}>
          <Ionicons name="build" size={54} color="#F28C28" />
        </View>

        <Text style={styles.title}>Register</Text>

        <View style={styles.formBlock}>
          <Text style={styles.label}>รหัสนักศึกษา</Text>
          <TextInput 
            style={styles.input} 
            value={studentId} 
            onChangeText={setStudentId} 
            placeholder="กรอกรหัสนักศึกษา"
            placeholderTextColor="#A1A1AA"
          />

          <Text style={[styles.label, styles.labelSpacing]}>อีเมล</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="example@sut.ac.th"
            placeholderTextColor="#A1A1AA"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, styles.labelSpacing]}>เบอร์โทรศัพท์</Text>
          <TextInput 
            style={styles.input} 
            value={phone} 
            onChangeText={setPhone} 
            placeholder="08X-XXX-XXXX"
            placeholderTextColor="#A1A1AA"
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, styles.labelSpacing]}>รหัสผ่าน</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="ตั้งรหัสผ่าน"
            placeholderTextColor="#A1A1AA"
          />

          <Text style={[styles.label, styles.labelSpacing]}>ยืนยันรหัสผ่าน</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="ยืนยันรหัสผ่านอีกครั้ง"
            placeholderTextColor="#A1A1AA"
          />
        </View>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>สมัครสมาชิก</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// Styles
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', 
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 22,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 8,
  },
  logoWrap: {
    width: 100, 
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF3E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#F28C28',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 28,
  },
  formBlock: {
    width: '100%',
    maxWidth: 320,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  labelSpacing: {
    marginTop: 16, 
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB', 
    fontSize: 15,
    color: '#111827',
  },
  primaryButton: {
    marginTop: 34,
    backgroundColor: '#F28C28',
    width: '100%',
    maxWidth: 320,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F28C28',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});