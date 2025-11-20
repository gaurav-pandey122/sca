import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

export default function RentVehicleScreen() {
    const [step, setStep] = useState(1);
    const [vehicleType, setVehicleType] = useState('Pickup Truck');
    const [duration, setDuration] = useState('1 Day');
    const [startDate, setStartDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setShowDatePicker(Platform.OS === 'ios');
        setStartDate(currentDate);
        if (Platform.OS !== 'ios') {
            setShowDatePicker(false);
        }
    };

    const totalSteps = 2;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Submit
            router.replace('/(tabs)');
        }
    };

    const calculatePrice = () => {
        let basePrice = 0;
        switch (vehicleType) {
            case 'Pickup Truck': basePrice = 2000; break;
            case 'Cargo Van': basePrice = 2500; break;
            case 'Mini Truck': basePrice = 3000; break;
            case 'Large Truck': basePrice = 5000; break;
            default: basePrice = 2000;
        }

        let multiplier = 1;
        switch (duration) {
            case '1 Day': multiplier = 1; break;
            case '2 Days': multiplier = 2; break;
            case '1 Week': multiplier = 6; break; // Discount for week
            case '1 Month': multiplier = 25; break; // Discount for month
            default: multiplier = 1;
        }

        return basePrice * multiplier;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Rent Vehicle</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${(step / totalSteps) * 100}%`, backgroundColor: Colors.light.primary }]} />
                </View>

                <ScrollView
                    contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.stepTitle}>
                        {step === 1 ? 'Select Vehicle & Duration' : 'Summary'}
                    </Text>

                    {step === 1 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Vehicle Type</Text>
                            <View style={styles.row}>
                                {[
                                    { type: 'Pickup Truck', icon: 'car-pickup' },
                                    { type: 'Cargo Van', icon: 'van-utility' },
                                    { type: 'Mini Truck', icon: 'truck' },
                                    { type: 'Large Truck', icon: 'truck-trailer' }
                                ].map((v) => (
                                    <TouchableOpacity
                                        key={v.type}
                                        style={[
                                            styles.chip,
                                            vehicleType === v.type && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }
                                        ]}
                                        onPress={() => setVehicleType(v.type)}
                                    >
                                        <Text style={[styles.chipText, vehicleType === v.type && { color: '#fff' }]}>
                                            <MaterialCommunityIcons name={v.icon as any} size={20} color={vehicleType === v.type ? '#fff' : Colors.light.text} style={{ marginRight: 8 }} /> {v.type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Duration</Text>
                            <View style={styles.row}>
                                {['1 Day', '2 Days', '1 Week', '1 Month'].map((d) => (
                                    <TouchableOpacity
                                        key={d}
                                        style={[
                                            styles.chip,
                                            duration === d && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }
                                        ]}
                                        onPress={() => setDuration(d)}
                                    >
                                        <Text style={[styles.chipText, duration === d && { color: '#fff' }]}>{d}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Start Date</Text>
                            <TouchableOpacity
                                style={styles.dateButton}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={styles.dateButtonText}>
                                    {startDate.toLocaleDateString()}
                                </Text>
                                <Ionicons name="calendar" size={24} color={Colors.light.text} />
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={startDate}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onDateChange}
                                    minimumDate={new Date()}
                                />
                            )}
                        </View>
                    )}

                    {step === 2 && (
                        <View style={styles.form}>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryTitle}>Rental Details</Text>
                                <Text>Vehicle: {vehicleType}</Text>
                                <Text>Duration: {duration}</Text>
                                <Text>Start Date: {startDate.toLocaleDateString()}</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Estimated Price</Text>
                                <Text style={styles.priceValue}>Rs. {calculatePrice()}</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[GlobalStyles.button, { backgroundColor: Colors.light.primary }]}
                        onPress={handleNext}
                    >
                        <Text style={GlobalStyles.buttonText}>{step === totalSteps ? 'Book Rental' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    progressContainer: {
        height: 4,
        backgroundColor: '#eee',
        width: '100%',
    },
    progressBar: {
        height: '100%',
    },
    stepTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        color: Colors.light.text,
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 24,
        backgroundColor: Colors.light.surface,
        color: Colors.light.text,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.border,
        marginRight: 8,
        marginBottom: 8,
    },
    chipText: {
        color: Colors.light.text,
        fontWeight: '600',
    },
    summaryCard: {
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    summaryTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.light.primary,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.light.primary + '10',
        borderRadius: 12,
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.primary,
    },
    dateButton: {
        height: 56,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 24,
        backgroundColor: Colors.light.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dateButtonText: {
        fontSize: 16,
        color: Colors.light.text,
    },
});
