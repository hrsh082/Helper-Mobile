import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import FeatherIcon from '../components/FeatherIcon';
import { useTheme } from '../contexts/ThemeContext';
import { useBooking } from '../contexts/BookingContext';
import { useLocationContext } from '../contexts/LocationContext';
import { serviceData } from '../data/serviceData';
import { haversineDistanceKm } from '../utils/location';

export default function ServiceDetailScreen({ route, navigation }: any) {
  const { serviceId } = route.params || { serviceId: 'electrician' };
  const service = serviceData[serviceId] || serviceData['electrician'];

  const { colors, isDark } = useTheme();
  const { selectService } = useBooking();
  const { locationText, coords } = useLocationContext();

  const availableProviders = (service.providers || []).filter((p) => p.available);

  // Auto assign nearest provider
  let bestProvider = availableProviders[0] || null;
  let bestDist = Infinity;

  if (coords) {
    for (const p of availableProviders) {
      const d = haversineDistanceKm(coords, { lat: p.lat, lon: p.lon });
      if (d < bestDist) {
        bestDist = d;
        bestProvider = p;
      }
    }
  }

  const handleBookNow = () => {
    if (service && bestProvider) {
      selectService({
        ...service,
        provider: bestProvider,
        location: locationText
      });
      navigation.navigate('Booking');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />

      {/* Header Bar */}
      <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]} numberOfLines={1}>
          {service.title}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Banner Image */}
        <Image source={{ uri: service.image }} style={styles.bannerImg} resizeMode="cover" />

        <View style={styles.content}>
          {/* Service Title & Starting Price */}
          <View style={styles.titleSection}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.mainTitle, { color: colors.textPrimary }]}>{service.title}</Text>
              <Text style={[styles.description, { color: colors.textSecondary }]}>
                {service.description}
              </Text>
            </View>

            <View style={[styles.priceTag, { backgroundColor: colors.primary + '18' }]}>
              <Text style={{ fontSize: 11, color: colors.primary, fontWeight: '700' }}>STARTING AT</Text>
              <Text style={{ fontSize: 18, color: colors.primary, fontWeight: '800' }}>
                {service.startingPrice}
              </Text>
            </View>
          </View>

          {/* Service Location Card */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <View style={styles.cardHeader}>
              <FeatherIcon name="map-pin" size={18} color={colors.primary} />
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Service Location</Text>
            </View>
            <View style={[styles.locationBox, { backgroundColor: isDark ? '#09090B' : '#F4F4F5' }]}>
              <Text style={[styles.locationText, { color: colors.textPrimary }]} numberOfLines={1}>
                {locationText}
              </Text>
              <FeatherIcon name="crosshair" size={16} color={colors.primary} />
            </View>
          </View>

          {/* Assigned Nearest Professional Card */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 12 }]}>
              Nearest Assigned Professional
            </Text>

            {bestProvider ? (
              <View
                style={[
                  styles.providerRow,
                  { backgroundColor: isDark ? '#09090B' : '#F4F4F5', borderColor: colors.cardBorder }
                ]}
              >
                {/* Profile Avatar */}
                <View style={[styles.avatar, { backgroundColor: colors.primary + '20', borderColor: colors.primary + '40' }]}>
                  <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 16 }}>
                    {bestProvider.name.charAt(0)}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.providerName, { color: colors.textPrimary }]}>
                    {bestProvider.name}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <FeatherIcon name="star" size={14} color="#EAB308" />
                    <Text style={{ fontSize: 12, fontWeight: '700', color: '#EAB308' }}>
                      {bestProvider.rating}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>•</Text>
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                      {bestProvider.experience} exp
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.providerPrice, { color: colors.textPrimary }]}>
                    {bestProvider.price}
                  </Text>
                  <Text style={{ fontSize: 10, color: colors.primary, fontWeight: '700', marginTop: 2 }}>
                    ASSIGNED
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={{ color: colors.textMuted, fontSize: 13 }}>No provider available in your area.</Text>
            )}
          </View>

          {/* What's Included */}
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 12 }]}>
              What's Included
            </Text>

            <View style={{ gap: 10 }}>
              {service.features.map((feature, idx) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <FeatherIcon name="check-circle" size={16} color={colors.primary} />
                  <Text style={{ fontSize: 13, color: colors.textSecondary, flex: 1 }}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Button Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity
          onPress={handleBookNow}
          disabled={!bestProvider}
          style={[
            styles.bookBtn,
            { backgroundColor: colors.primary },
            !bestProvider && { opacity: 0.5 }
          ]}
        >
          <Text style={styles.bookBtnText}>
            Book {bestProvider ? bestProvider.name : 'Service'} for {bestProvider ? bestProvider.price : service.startingPrice}
          </Text>
        </TouchableOpacity>
      </View>
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
  bannerImg: {
    width: '100%',
    height: 200
  },
  content: {
    padding: 20,
    gap: 20
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '800'
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18
  },
  priceTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center'
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700'
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12
  },
  locationText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginRight: 8
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700'
  },
  providerPrice: {
    fontSize: 16,
    fontWeight: '800'
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1
  },
  bookBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }
});
