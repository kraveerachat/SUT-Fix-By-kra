import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // ฟังก์ชันจำลองการเข้าสู่ระบบ (Mock Login)
  const handleLogin = () => {
    const user = username.toLowerCase().trim();

    if (user === 'admin') {
      router.replace('/(admin)/(tabs)');
    } else if (user === 'tech') {
      router.replace('/(technician)/(tabs)');
    } else {
      router.replace('/(user)/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.logoImage} 
              resizeMode="contain"
            />
            <Text style={styles.title}>ยินดีต้อนรับสู่</Text>
            <Text style={styles.appName}>SUT FixIt</Text>
            <Text style={styles.subtitle}>ระบบแจ้งซ่อมแซมและบำรุงรักษาหอพัก</Text>
            <Text style={styles.subtitle}>มหาวิทยาลัยเทคโนโลยีสุรนารี</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            
            {/* กล่องคำใบ้ (ตัวช่วยทดสอบระบบ) */}
            <View style={styles.hintBox}>
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
              <Text style={styles.hintText}>
                <Text style={{fontWeight: 'bold'}}>โหมดทดสอบ:</Text> พิมพ์ <Text style={{color: '#EF4444', fontWeight: 'bold'}}>admin</Text> เพื่อเข้าหน้าผู้ดูแล, หรือพิมพ์อะไรก็ได้เพื่อเข้าหน้านักศึกษา
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>รหัสนักศึกษา / Username</Text>
              <View style={styles.inputBox}>
                <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="กรอกรหัสนักศึกษา เช่น B6xxxxxx"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>รหัสผ่าน / Password</Text>
              <View style={styles.inputBox}>
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="กรอกรหัสผ่าน"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>ลืมรหัสผ่าน?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.8} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            <View style={styles.registerRow}>
              <Text style={styles.noAccountText}>ยังไม่มีบัญชีใช่หรือไม่? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>ลงทะเบียนที่นี่</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#4B5563',
    fontWeight: '600',
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#F28C28',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  hintBox: {
    flexDirection: 'row',
    backgroundColor: '#DBEAFE',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },
  hintText: {
    fontSize: 13,
    color: '#1E3A8A',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#F28C28',
    fontSize: 14,
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#F28C28',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F28C28',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  noAccountText: {
    color: '#6B7280',
    fontSize: 15,
  },
  registerText: {
    color: '#F28C28',
    fontSize: 15,
    fontWeight: '700',
  },
});