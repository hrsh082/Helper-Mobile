import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

interface CustomDatePickerModalProps {
  visible: boolean;
  value: string; // YYYY-MM-DD
  onChange: (date: string) => void;
  onClose: () => void;
  minDate?: string;
}

export default function CustomDatePickerModal({
  visible,
  value,
  onChange,
  onClose,
  minDate = new Date().toISOString().split('T')[0]
}: CustomDatePickerModalProps) {
  const { colors, isDark } = useTheme();

  const initialDate = value ? new Date(value) : new Date();
  const [viewDate, setViewDate] = useState<Date>(
    isNaN(initialDate.getTime()) ? new Date() : initialDate
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  const handleSelectDate = (dateStr: string) => {
    onChange(dateStr);
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const calendarCells = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    calendarCells.push({
      day: d,
      isCurrentMonth: false,
      dateString: formatDateString(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, d)
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      dateString: formatDateString(year, month, d)
    });
  }

  const remainingCells = 42 - calendarCells.length;
  for (let d = 1; d <= remainingCells; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: false,
      dateString: formatDateString(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, d)
    });
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color={colors.primary} />
              <Text style={[styles.title, { color: colors.textPrimary }]}>Select Date</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Month Nav */}
          <View style={styles.monthNav}>
            <Text style={[styles.monthTitle, { color: colors.textPrimary }]}>
              {monthNames[month]} {year}
            </Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TouchableOpacity
                onPress={() => setViewDate(new Date(year, month - 1, 1))}
                style={[styles.navBtn, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}
              >
                <ChevronLeft size={18} color={colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setViewDate(new Date(year, month + 1, 1))}
                style={[styles.navBtn, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}
              >
                <ChevronRight size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Buttons */}
          <View style={styles.quickBar}>
            <TouchableOpacity
              onPress={() => handleSelectDate(todayStr)}
              style={[styles.quickChip, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}
            >
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 12 }}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const tmr = new Date();
                tmr.setDate(tmr.getDate() + 1);
                handleSelectDate(tmr.toISOString().split('T')[0]);
              }}
              style={[styles.quickChip, { backgroundColor: isDark ? '#27272A' : '#F4F4F5' }]}
            >
              <Text style={{ color: colors.primary, fontWeight: '600', fontSize: 12 }}>Tomorrow</Text>
            </TouchableOpacity>
          </View>

          {/* Days Header */}
          <View style={styles.daysHeader}>
            {daysOfWeek.map((d) => (
              <Text key={d} style={[styles.dayLabel, { color: colors.textMuted }]}>
                {d}
              </Text>
            ))}
          </View>

          {/* Grid */}
          <View style={styles.grid}>
            {calendarCells.map((cell, index) => {
              const isSelected = value === cell.dateString;
              const isToday = todayStr === cell.dateString;
              const isDisabled = minDate ? cell.dateString < minDate : false;

              return (
                <TouchableOpacity
                  key={index}
                  disabled={isDisabled}
                  onPress={() => handleSelectDate(cell.dateString)}
                  style={[
                    styles.cell,
                    isSelected && { backgroundColor: colors.primary },
                    !isSelected && isToday && { borderWidth: 1, borderColor: colors.primary },
                    !isSelected && !cell.isCurrentMonth && { opacity: 0.3 }
                  ]}
                >
                  <Text
                    style={[
                      styles.cellText,
                      { color: isSelected ? '#FFFFFF' : colors.textPrimary },
                      isDisabled && { color: colors.textMuted }
                    ]}
                  >
                    {cell.day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  closeBtn: {
    padding: 4
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '600'
  },
  navBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quickBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12
  },
  quickChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    width: 36,
    textAlign: 'center'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  cell: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3
  },
  cellText: {
    fontSize: 13,
    fontWeight: '600'
  }
});
