import React, { useState, useEffect } from 'react';
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
import { useBooking } from '../contexts/BookingContext';
import CustomDatePickerModal from '../components/CustomDatePickerModal';
import CustomDropdownModal, { DropdownOption } from '../components/CustomDropdownModal';
import { formatDisplayDate, formatDisplayTime } from '../utils/location';

const timeOptions: DropdownOption[] = [
  { label: 'Morning (8 AM - 12 PM)', value: 'morning' },
  { label: 'Afternoon (12 PM - 4 PM)', value: 'afternoon' },
  { label: 'Evening (4 PM - 8 PM)', value: 'evening' }
];

const urgencyOptions: DropdownOption[] = [
  { label: 'Normal (Within 24 hours)', value: 'normal' },
  { label: 'Urgent (Same day)', value: 'urgent' },
  { label: 'Emergency (Within 2 hours)', value: 'emergency' }
];

export default function BookingScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { selectedService, bookingDetails, updateBookingDetails, completeBooking } = useBooking();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [timeModalOpen, setTimeModalOpen] = useState<boolean>(false);
  const [urgencyModalOpen, setUrgencyModalOpen] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (selectedService?.location && bookingDetails.address !== selectedService.location) {
      updateBookingDetails({ address: selectedService.location });
    }
  }, [selectedService, bookingDetails.address, updateBookingDetails]);

  if (isSubmitted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg, justifyContent: 'center', padding: 24 }]}>
        <View style={{ alignItems: 'center' }}>
          <FeatherIcon name="check-circle" size={64} color="#10B981" />
          <Text style={[styles.successTitle, { color: colors.textPrimary }]}>Booking Confirmed!</Text>
          <Text style={[styles.successDesc, { color: colors.textSecondary }]}>
            Thank you! Your service request has been submitted successfully. Our team will contact you shortly to confirm timing.
          </Text>
          <TouchableOpacity
            onPress={() => {
              completeBooking();
              navigation.navigate('Home');
            }}
            style={[styles.primaryBtn, { backgroundColor: colors.primary, width: '100%', marginTop: 24 }]}
          >
            <Text style={styles.primaryBtnText}>Return to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!selectedService) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg, justifyContent: 'center', padding: 24 }]}>
        <Text style={[styles.successTitle, { color: colors.textPrimary }]}>No service selected</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={[styles.primaryBtn, { backgroundColor: colors.primary, marginTop: 16 }]}
        >
          <Text style={styles.primaryBtnText}>Browse Services</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const selectedTimeLabel = timeOptions.find((t) => t.value === bookingDetails.time)?.label || 'Select preferred time';
  const selectedUrgencyLabel = urgencyOptions.find((u) => u.value === bookingDetails.urgency)?.label || 'Select urgency level';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.bg} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <FeatherIcon name="arrow-left" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Service Booking</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLabels}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: currentStep >= 1 ? colors.primary : colors.textMuted }}>
            1. Details
          </Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: currentStep >= 2 ? colors.primary : colors.textMuted }}>
            2. Schedule
          </Text>
          <Text style={{ fontSize: 11, fontWeight: '700', color: currentStep >= 3 ? colors.primary : colors.textMuted }}>
            3. Review
          </Text>
        </View>
        <View style={[styles.progressBarBg, { backgroundColor: colors.cardBorder }]}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${(currentStep / 3) * 100}%` }]} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {/* Step 1: Details */}
        {currentStep === 1 && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
            <Text style={[styles.stepTitle, { color: colors.textPrimary }]}>Service Details</Text>

            <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{selectedService.title}</Text>
            <Text style={[styles.itemDesc, { color: colors.textSecondary }]}>{selectedService.description}</Text>

            <View style={styles.priceRow}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: colors.primary }}>
                {selectedService.provider?.price}
              </Text>
              <Text style={{ fontSize: 13, color: colors.textMuted }}>
                with {selectedService.provider?.name}
              </Text>
            </View>
          </View>
        )}

        {/* Step 2: Schedule */}
        {currentStep === 2 && (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder, gap: 16 }]}>
            <Text style={[styles.stepTitle, { color: colors.textPrimary }]}>Schedule & Details</Text>

            {/* Date Selector */}
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>PREFERRED DATE</Text>
              <TouchableOpacity
                onPress={() => setDateModalOpen(true)}
                style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}
              >
                <FeatherIcon name="calendar" size={18} color={colors.primary} />
                <Text style={{ color: bookingDetails.date ? colors.textPrimary : colors.textMuted, flex: 1, fontSize: 14 }}>
                  {formatDisplayDate(bookingDetails.date)}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Time Selector */}
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>PREFERRED TIME</Text>
              <TouchableOpacity
                onPress={() => setTimeModalOpen(true)}
                style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}
              >
                <FeatherIcon name="clock" size={18} color={colors.primary} />
                <Text style={{ color: bookingDetails.time ? colors.textPrimary : colors.textMuted, flex: 1, fontSize: 14 }}>
                  {selectedTimeLabel}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Location Display */}
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>SERVICE LOCATION</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}>
                <FeatherIcon name="map-pin" size={18} color={colors.primary} />
                <Text style={{ color: colors.textPrimary, flex: 1, fontSize: 14 }} numberOfLines={1}>
                  {bookingDetails.address || 'Ahmedabad, Gujarat'}
                </Text>
              </View>
            </View>

            {/* Description Textarea */}
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>SERVICE DESCRIPTION</Text>
              <TextInput
                style={[
                  styles.textarea,
                  { backgroundColor: colors.inputBg, borderColor: colors.cardBorder, color: colors.textPrimary }
                ]}
                multiline
                numberOfLines={3}
                placeholder="Describe your issue or requirements..."
                placeholderTextColor={colors.textMuted}
                value={bookingDetails.description}
                onChangeText={(text) => updateBookingDetails({ description: text })}
              />
            </View>

            {/* Urgency Selector */}
            <View>
              <Text style={[styles.fieldLabel, { color: colors.textMuted }]}>URGENCY LEVEL</Text>
              <TouchableOpacity
                onPress={() => setUrgencyModalOpen(true)}
                style={[styles.inputBox, { backgroundColor: colors.inputBg, borderColor: colors.cardBorder }]}
              >
                <FeatherIcon name="alert-circle" size={18} color={colors.primary} />
                <Text style={{ color: bookingDetails.urgency ? colors.textPrimary : colors.textMuted, flex: 1, fontSize: 14 }}>
                  {selectedUrgencyLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <View style={{ gap: 16 }}>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={[styles.summaryHeader, { borderBottomColor: colors.cardBorder }]}>
                <Text style={[styles.stepTitle, { color: colors.textPrimary }]}>Booking Summary</Text>
                <View style={[styles.stepBadge, { backgroundColor: colors.primary + '18' }]}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: colors.primary }}>Step 3 of 3</Text>
                </View>
              </View>

              <View style={{ gap: 14 }}>
                <View style={styles.summaryRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FeatherIcon name="tool" size={16} color={colors.primary} />
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>Service</Text>
                  </View>
                  <Text style={{ color: colors.textPrimary, fontWeight: '700', fontSize: 14 }}>
                    {selectedService.title}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FeatherIcon name="user-check" size={16} color={colors.primary} />
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>Professional</Text>
                  </View>
                  <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 14 }}>
                    {selectedService.provider?.name}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FeatherIcon name="tag" size={16} color={colors.primary} />
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>Price</Text>
                  </View>
                  <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 16 }}>
                    {selectedService.provider?.price}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FeatherIcon name="calendar" size={16} color={colors.primary} />
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>Date</Text>
                  </View>
                  <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 13 }}>
                    {formatDisplayDate(bookingDetails.date)}
                  </Text>
                </View>

                <View style={styles.summaryRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <FeatherIcon name="clock" size={16} color={colors.primary} />
                    <Text style={{ color: colors.textMuted, fontSize: 13 }}>Time</Text>
                  </View>
                  <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 13 }}>
                    {formatDisplayTime(bookingDetails.time)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Next Steps Box */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <FeatherIcon name="zap" size={18} color={colors.primary} />
                <Text style={[styles.stepTitle, { color: colors.textPrimary }]}>What happens next?</Text>
              </View>

              <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>1. We'll confirm your booking within 30 minutes</Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>2. The professional will contact you to confirm timing</Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>3. Service will be completed as scheduled</Text>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>4. Pay securely after service completion</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Nav Controls */}
      <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.cardBorder }]}>
        <TouchableOpacity
          disabled={currentStep === 1}
          onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
          style={[
            styles.prevBtn,
            { backgroundColor: isDark ? '#27272A' : '#F4F4F5', borderColor: colors.cardBorder },
            currentStep === 1 && { opacity: 0.4 }
          ]}
        >
          <Text style={{ color: colors.textPrimary, fontWeight: '600', fontSize: 14 }}>Previous</Text>
        </TouchableOpacity>

        {currentStep < 3 ? (
          <TouchableOpacity
            onPress={() => setCurrentStep(currentStep + 1)}
            style={[styles.nextBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.primaryBtnText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsSubmitted(true)}
            style={[styles.nextBtn, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.primaryBtnText}>Confirm Booking</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Date Picker Modal */}
      <CustomDatePickerModal
        visible={dateModalOpen}
        value={bookingDetails.date}
        onChange={(date) => updateBookingDetails({ date })}
        onClose={() => setDateModalOpen(false)}
      />

      {/* Time Dropdown Modal */}
      <CustomDropdownModal
        visible={timeModalOpen}
        value={bookingDetails.time}
        options={timeOptions}
        title="Select Preferred Time"
        onChange={(time) => updateBookingDetails({ time })}
        onClose={() => setTimeModalOpen(false)}
      />

      {/* Urgency Dropdown Modal */}
      <CustomDropdownModal
        visible={urgencyModalOpen}
        value={bookingDetails.urgency}
        options={urgencyOptions}
        title="Select Urgency Level"
        onChange={(urgency) => updateBookingDetails({ urgency })}
        onClose={() => setUrgencyModalOpen(false)}
      />
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
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  progressBarBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2
  },
  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700'
  },
  itemDesc: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 14
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
  textarea: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    textAlignVertical: 'top',
    fontSize: 14
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    marginBottom: 14
  },
  stepBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1
  },
  prevBtn: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1
  },
  nextBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700'
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 16
  },
  successDesc: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20
  }
});
