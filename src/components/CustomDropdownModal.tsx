import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { ChevronDown, X, Check } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';

export interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownModalProps {
  visible: boolean;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  options: DropdownOption[];
  title: string;
}

export default function CustomDropdownModal({
  visible,
  value,
  onChange,
  onClose,
  options,
  title
}: CustomDropdownModalProps) {
  const { colors } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: colors.cardBorder }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View style={{ paddingVertical: 8 }}>
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    onChange(opt.value);
                    onClose();
                  }}
                  style={[
                    styles.optionRow,
                    isSelected && { backgroundColor: colors.primary + '15' }
                  ]}
                >
                  <Text
                    style={[
                      styles.optionLabel,
                      { color: isSelected ? colors.primary : colors.textPrimary },
                      isSelected && { fontWeight: '700' }
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {isSelected && <Check size={18} color={colors.primary} />}
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
    justifyContent: 'flex-end'
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 20,
    paddingBottom: 36
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 17,
    fontWeight: '700'
  },
  closeBtn: {
    padding: 4
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginVertical: 2
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '500'
  }
});
