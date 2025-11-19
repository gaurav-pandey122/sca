import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

const CITIES = ['Kathmandu', 'Pokhara', 'Chitwan', 'Biratnagar', 'Butwal', 'Dharan', 'Nepalgunj', 'Hetauda'];

export default function InterCityDeliveryScreen() {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState({ name: '', phone: '', city: '', address: '' });
    const [delivery, setDelivery] = useState({ name: '', phone: '', city: '', address: '' });
    const [packageDetails, setPackageDetails] = useState({ type: 'Parcel', weight: '' });

    const [showCityPicker, setShowCityPicker] = useState(false);
    const [cityPickerType, setCityPickerType] = useState<'pickup' | 'delivery'>('pickup');

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Submit
            router.replace('/(tabs)');
        }
    };

    const openCityPicker = (type: 'pickup' | 'delivery') => {
        setCityPickerType(type);
        setShowCityPicker(true);
    };

    const selectCity = (city: string) => {
        if (cityPickerType === 'pickup') {
            setPickup({ ...pickup, city });
        } else {
            setDelivery({ ...delivery, city });
        }
        setShowCityPicker(false);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()} style={styles.backButton}>
                        <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Inter City Delivery</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Text style={styles.infoText}>ℹ️ Delivery takes 2-4 business days</Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${(step / totalSteps) * 100}%`, backgroundColor: Colors.light.primary }]} />
                </View>

                <ScrollView contentContainerStyle={GlobalStyles.container}>
                    <Text style={styles.stepTitle}>
                        {step === 1 ? 'Pickup Details' :
                            step === 2 ? 'Delivery Details' :
                                step === 3 ? 'Package Info' : 'Summary'}
                    </Text>

                    {step === 1 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Sender Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                value={pickup.name}
                                onChangeText={(t) => setPickup({ ...pickup, name: t })}
                            />

                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone"
                                keyboardType="phone-pad"
                                value={pickup.phone}
                                onChangeText={(t) => setPickup({ ...pickup, phone: t })}
                            />

                            <Text style={styles.label}>Select City</Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={() => openCityPicker('pickup')}
                            >
                                <Text style={[styles.dropdownText, !pickup.city && { color: '#999' }]}>
                                    {pickup.city || 'Select City'}
                                </Text>
                                <Text style={styles.dropdownIcon}>▼</Text>
                            </TouchableOpacity>

                            <Text style={styles.label}>Pickup Address</Text>
                            <TextInput
                                style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
                                placeholder="Enter full address (Street, Area)"
                                multiline
                                value={pickup.address}
                                onChangeText={(t) => setPickup({ ...pickup, address: t })}
                            />
                        </View>
                    )}

                    {step === 2 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Receiver Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                value={delivery.name}
                                onChangeText={(t) => setDelivery({ ...delivery, name: t })}
                            />
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone"
                                keyboardType="phone-pad"
                                value={delivery.phone}
                                onChangeText={(t) => setDelivery({ ...delivery, phone: t })}
                            />
                            <Text style={styles.label}>Select City</Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={() => openCityPicker('delivery')}
                            >
                                <Text style={[styles.dropdownText, !delivery.city && { color: '#999' }]}>
                                    {delivery.city || 'Select City'}
                                </Text>
                                <Text style={styles.dropdownIcon}>▼</Text>
                            </TouchableOpacity>

                            <Text style={styles.label}>Delivery Address</Text>
                            <TextInput
                                style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
                                placeholder="Enter full address (Street, Area)"
                                multiline
                                value={delivery.address}
                                onChangeText={(t) => setDelivery({ ...delivery, address: t })}
                            />
                        </View>
                    )}

                    {step === 3 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Content Type</Text>
                            <View style={styles.row}>
                                {['Document', 'Parcel', 'Electronics', 'Others'].map((t) => (
                                    <TouchableOpacity
                                        key={t}
                                        style={[
                                            styles.chip,
                                            packageDetails.type === t && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }
                                        ]}
                                        onPress={() => setPackageDetails({ ...packageDetails, type: t })}
                                    >
                                        <Text style={[styles.chipText, packageDetails.type === t && { color: '#fff' }]}>{t}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Weight (kg)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 2.5"
                                keyboardType="numeric"
                                value={packageDetails.weight}
                                onChangeText={(t) => setPackageDetails({ ...packageDetails, weight: t })}
                            />
                        </View>
                    )}

                    {step === 4 && (
                        <View style={styles.form}>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryTitle}>Pickup</Text>
                                <Text>{pickup.name}</Text>
                                <Text>{pickup.city}</Text>
                                <Text>{pickup.address}</Text>
                                <View style={styles.divider} />

                                <Text style={styles.summaryTitle}>Delivery</Text>
                                <Text>{delivery.name}</Text>
                                <Text>{delivery.city}</Text>
                                <Text>{delivery.address}</Text>
                                <View style={styles.divider} />
                                <Text style={styles.summaryTitle}>Package</Text>
                                <Text>{packageDetails.type} - {packageDetails.weight}kg</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Estimated Price</Text>
                                <Text style={styles.priceValue}>Rs. 450</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[GlobalStyles.button, { backgroundColor: Colors.light.primary }]}
                        onPress={handleNext}
                    >
                        <Text style={GlobalStyles.buttonText}>{step === totalSteps ? 'Place Order' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal
                visible={showCityPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowCityPicker(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select City</Text>
                            <TouchableOpacity onPress={() => setShowCityPicker(false)}>
                                <Text style={{ fontSize: 24, color: Colors.light.text }}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={CITIES}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cityItem}
                                    onPress={() => selectCity(item)}
                                >
                                    <Text style={styles.cityText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
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
    infoBanner: {
        backgroundColor: '#FFFBEB',
        padding: 12,
        alignItems: 'center',
    },
    infoText: {
        color: '#B45309',
        fontWeight: '600',
        fontSize: 14,
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
    dropdownButton: {
        height: 56,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        backgroundColor: Colors.light.surface,
    },
    dropdownText: {
        fontSize: 16,
        color: Colors.light.text,
    },
    dropdownIcon: {
        fontSize: 12,
        color: '#999',
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
    divider: {
        height: 1,
        backgroundColor: Colors.light.border,
        marginVertical: 12,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.light.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        maxHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    cityItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    cityText: {
        fontSize: 16,
        color: Colors.light.text,
    },
});
