import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import {
  Search,
  MapPin,
  Moon,
  Sun,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  Clock,
  Wallet
} from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useLocationContext } from '../contexts/LocationContext';
import { serviceData } from '../data/serviceData';
import { Service } from '../types';

export default function HomeScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { locationText } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState('');

  const servicesList = Object.values(serviceData).filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />

      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
        <View style={styles.locationContainer}>
          <MapPin size={18} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.locationLabel, { color: colors.textMuted }]}>LOCATION</Text>
            <Text style={[styles.locationValue, { color: colors.textPrimary }]} numberOfLines={1}>
              {locationText || 'Ahmedabad, Gujarat'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.themeBtn, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}
        >
          {isDark ? <Sun size={18} color="#FACC15" /> : <Moon size={18} color="#18181B" />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.brandTitle, { color: colors.textPrimary }]}>
            Expert Services at Your <Text style={{ color: colors.primary }}>Doorstep</Text>
          </Text>
          <Text style={[styles.brandSubtitle, { color: colors.textSecondary }]}>
            Trusted home repairs, electrical, plumbing & maintenance professionals.
          </Text>

          {/* Search Input */}
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.card, borderColor: colors.cardBorder }
            ]}
          >
            <Search size={18} color={colors.textMuted} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search electrician, plumber, AC repair..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>50k+</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Jobs Done</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>4.9★</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Avg Rating</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>100%</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>Verified</Text>
          </View>
        </View>

        {/* Services List Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Popular Services</Text>
          <Text style={{ color: colors.primary, fontSize: 13, fontWeight: '600' }}>
            {servicesList.length} Available
          </Text>
        </View>

        <View style={styles.servicesGrid}>
          {servicesList.map((item: Service) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: item.id })}
              style={[
                styles.serviceCard,
                { backgroundColor: colors.card, borderColor: colors.cardBorder }
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.serviceImage} resizeMode="cover" />

              <View style={styles.serviceBody}>
                <View style={styles.titleRow}>
                  <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                  <View style={[styles.badge, { backgroundColor: colors.primary + '18' }]}>
                    <Text style={[styles.badgeText, { color: colors.primary }]}>{item.startingPrice}</Text>
                  </View>
                </View>

                <Text style={[styles.cardDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={styles.cardFooter}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={14} color="#10B981" />
                    <Text style={{ fontSize: 12, color: colors.textMuted, fontWeight: '500' }}>Verified</Text>
                  </View>
                  <View style={styles.bookAction}>
                    <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '700' }}>Book Now</Text>
                    <ArrowRight size={14} color={colors.primary} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Why Choose Section */}
        <View style={[styles.whyCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.whyTitle, { color: colors.textPrimary }]}>Why Choose Helper?</Text>

          <View style={styles.whyItem}>
            <View style={[styles.whyIcon, { backgroundColor: colors.primary + '20' }]}>
              <ShieldCheck size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.whyItemTitle, { color: colors.textPrimary }]}>Background Checked</Text>
              <Text style={[styles.whyItemDesc, { color: colors.textSecondary }]}>
                100% verified experts with community reviews.
              </Text>
            </View>
          </View>

          <View style={styles.whyItem}>
            <View style={[styles.whyIcon, { backgroundColor: colors.primary + '20' }]}>
              <Clock size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.whyItemTitle, { color: colors.textPrimary }]}>Same Day Service</Text>
              <Text style={[styles.whyItemDesc, { color: colors.textSecondary }]}>
                Fast response within 30 minutes.
              </Text>
            </View>
          </View>

          <View style={styles.whyItem}>
            <View style={[styles.whyIcon, { backgroundColor: colors.primary + '20' }]}>
              <Wallet size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.whyItemTitle, { color: colors.textPrimary }]}>Upfront Pricing</Text>
              <Text style={[styles.whyItemDesc, { color: colors.textSecondary }]}>
                Transparent quotes, no hidden charges.
              </Text>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 12
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '600'
  },
  themeBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34
  },
  brandSubtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 16
  },
  searchInput: {
    flex: 1,
    fontSize: 14
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 24
  },
  statBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center'
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800'
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  servicesGrid: {
    paddingHorizontal: 20,
    gap: 16
  },
  serviceCard: {
    borderWidth: 1,
    borderRadius: 24,
    overflow: 'hidden'
  },
  serviceImage: {
    width: '100%',
    height: 160
  },
  serviceBody: {
    padding: 16
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700'
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#27272A30'
  },
  bookAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  whyCard: {
    marginHorizontal: 20,
    marginTop: 28,
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    gap: 16
  },
  whyTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  whyIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whyItemTitle: {
    fontSize: 14,
    fontWeight: '700'
  },
  whyItemDesc: {
    fontSize: 12,
    marginTop: 2
  }
});
