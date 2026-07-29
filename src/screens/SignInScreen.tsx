import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import FeatherIcon from '../components/FeatherIcon';
import { useTheme } from '../contexts/ThemeContext';

export default function SignInScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');

  // Sign In fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sign Up fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [message, setMessage] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }
    setMessage('Successfully signed in!');
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  };

  const handleSignUp = () => {
    if (!name || !signupEmail || !signupPassword) {
      setMessage('Please fill in all required fields.');
      return;
    }
    setMessage('Account created successfully!');
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />

      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Account</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24 }}>
        {/* Brand Banner */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={[styles.logoBadge, { backgroundColor: colors.primary }]}>
            <Text style={{ color: '#FFFFFF', fontWeight: '900', fontSize: 22 }}>H</Text>
          </View>
          <Text style={[styles.welcomeTitle, { color: colors.textPrimary }]}>Welcome to Helper</Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.textSecondary }]}>
            Sign in to manage your service bookings and location settings.
          </Text>
        </View>

        {/* Tab Switcher */}
        <View style={[styles.tabBar, { backgroundColor: isDark ? '#18181B' : '#F4F4F5', borderColor: colors.cardBorder }]}>
          <TouchableOpacity
            onPress={() => {
              setActiveTab('signin');
              setMessage('');
            }}
            style={[styles.tab, activeTab === 'signin' && { backgroundColor: colors.card }]}
          >
            <Text style={[styles.tabText, { color: activeTab === 'signin' ? colors.primary : colors.textMuted }]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setActiveTab('signup');
              setMessage('');
            }}
            style={[styles.tab, activeTab === 'signup' && { backgroundColor: colors.card }]}
          >
            <Text style={[styles.tabText, { color: activeTab === 'signup' ? colors.primary : colors.textMuted }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alert Message */}
        {message ? (
          <View style={[styles.messageBanner, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
            <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600', textAlign: 'center' }}>
              {message}
            </Text>
          </View>
        ) : null}

        {/* Sign In Tab */}
        {activeTab === 'signin' && (
          <View style={{ gap: 16 }}>
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>EMAIL ADDRESS</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="mail" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="name@example.com"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>PASSWORD</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="lock" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FeatherIcon name="eye-off" size={18} color={colors.textMuted} /> : <FeatherIcon name="eye" size={18} color={colors.textMuted} />}
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me */}
            <TouchableOpacity
              onPress={() => setRememberMe(!rememberMe)}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 4 }}
            >
              <View
                style={[
                  styles.checkbox,
                  { borderColor: rememberMe ? colors.primary : colors.cardBorder },
                  rememberMe && { backgroundColor: colors.primary }
                ]}
              >
                {rememberMe && <FeatherIcon name="check" size={12} color="#FFFFFF" />}
              </View>
              <Text style={{ fontSize: 13, color: colors.textSecondary }}>Remember me on this device</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn} style={[styles.submitBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.submitBtnText}>Sign In</Text>
              <FeatherIcon name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Sign Up Tab */}
        {activeTab === 'signup' && (
          <View style={{ gap: 16 }}>
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>FULL NAME</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="user" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="John Doe"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>PHONE NUMBER</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="phone" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="+91 98765 43210"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>EMAIL ADDRESS</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="mail" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="name@example.com"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={signupEmail}
                  onChangeText={setSignupEmail}
                />
              </View>
            </View>

            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>PASSWORD</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="lock" size={18} color={colors.textMuted} />
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Create password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showSignupPassword}
                  value={signupPassword}
                  onChangeText={setSignupPassword}
                />
                <TouchableOpacity onPress={() => setShowSignupPassword(!showSignupPassword)}>
                  {showSignupPassword ? <FeatherIcon name="eye-off" size={18} color={colors.textMuted} /> : <FeatherIcon name="eye" size={18} color={colors.textMuted} />}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleSignUp} style={[styles.submitBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.submitBtnText}>Create Account</Text>
              <FeatherIcon name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  logoBadge: {
    width: 54,
    height: 54,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '800'
  },
  welcomeSubtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
    paddingHorizontal: 20
  },
  tabBar: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700'
  },
  messageBanner: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  input: {
    flex: 1,
    fontSize: 14
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 8
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  }
});
