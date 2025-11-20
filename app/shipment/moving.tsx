import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

type SavedAddress = {
    id: string;
    label: string;
    address: string;
    latitude: number;
    longitude: number;
};

export default function HomeMovingScreen() {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState({ name: '', phone: '', address: '', lat: 0, lng: 0, floor: '0', lift: false });
    const [delivery, setDelivery] = useState({ name: '', phone: '', address: '', lat: 0, lng: 0, floor: '0', lift: false });
    const [movingDetails, setMovingDetails] = useState({ houseSize: '1BHK', helpers: 1 });
    const [vehicleType, setVehicleType] = useState('Pickup Truck');
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [locationPickerType, setLocationPickerType] = useState<'pickup' | 'delivery'>('pickup');
    const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
    const [showSavedAddresses, setShowSavedAddresses] = useState(false);

    const totalSteps = 4;

    // Load saved addresses
    useEffect(() => {
        initializeMockAddresses();
        loadSavedAddresses();
    }, []);

    const initializeMockAddresses = async () => {
        try {
            const existing = await AsyncStorage.getItem('@saved_addresses');
            if (!existing) {
                const mockAddresses: SavedAddress[] = [
                    { id: '1', label: 'Home', address: 'Thamel, Kathmandu 44600, Nepal', latitude: 27.7172, longitude: 85.3240 },
                    { id: '2', label: 'Office', address: 'Durbar Marg, Kathmandu 44600, Nepal', latitude: 27.7025, longitude: 85.3206 },
                    { id: '3', label: 'Warehouse', address: 'Balaju, Kathmandu 44600, Nepal', latitude: 27.7350, longitude: 85.3000 },
                    { id: '4', label: 'Shop', address: 'New Road, Kathmandu 44600, Nepal', latitude: 27.7040, longitude: 85.3100 },
                    { id: '5', label: 'Parents House', address: 'Patan Dhoka, Lalitpur 44700, Nepal', latitude: 27.6710, longitude: 85.3240 },
                ];
                await AsyncStorage.setItem('@saved_addresses', JSON.stringify(mockAddresses));
            }
        } catch (error) {
            console.error('Error initializing mock addresses:', error);
        }
    };

    const loadSavedAddresses = async () => {
        try {
            const stored = await AsyncStorage.getItem('@saved_addresses');
            if (stored) {
                setSavedAddresses(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading saved addresses:', error);
        }
    };

    const handleSelectSavedAddress = (address: SavedAddress) => {
        if (locationPickerType === 'pickup') {
            setPickup({
                ...pickup,
                name: address.label,
                phone: '+977 9800000000',
                address: address.address,
                lat: address.latitude,
                lng: address.longitude,
            });
        } else {
            setDelivery({
                ...delivery,
                name: address.label,
                phone: '+977 9800000000',
                address: address.address,
                lat: address.latitude,
                lng: address.longitude,
            });
        }
        setShowSavedAddresses(false);
    };

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            // Submit
            router.replace('/(tabs)');
        }
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
                    <Text style={styles.headerTitle}>Home Moving</Text>
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
                        {step === 1 ? 'Pickup Details' :
                            step === 2 ? 'Delivery Details' :
                                step === 3 ? 'Moving Details' : 'Summary'}
                    </Text>

                    {step === 1 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Sender Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                placeholderTextColor="#999"
                                value={pickup.name}
                                onChangeText={(t) => setPickup({ ...pickup, name: t })}
                            />

                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={pickup.phone}
                                onChangeText={(t) => setPickup({ ...pickup, phone: t })}
                            />

                            {/* Select from Saved Addresses Button for Pickup */}
                            {savedAddresses.length > 0 && (
                                <TouchableOpacity
                                    style={styles.savedAddressButton}
                                    onPress={() => {
                                        setLocationPickerType('pickup');
                                        setShowSavedAddresses(true);
                                    }}
                                >
                                    <Ionicons name="bookmark-outline" size={20} color={Colors.light.primary} />
                                    <Text style={styles.savedAddressButtonText}>Select from Saved Addresses</Text>
                                </TouchableOpacity>
                            )}

                            <Text style={styles.label}>Pickup Location</Text>
                            <TouchableOpacity
                                style={styles.mapPickerButton}
                                onPress={() => {
                                    setLocationPickerType('pickup');
                                    setShowLocationPicker(true);
                                }}
                            >
                                <View style={styles.mapPickerContent}>
                                    <Ionicons name="location" size={24} color={Colors.light.primary} style={{ marginRight: 12 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.mapPickerLabel}>
                                            {pickup.address || 'Tap to select location on map'}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={24} color="#999" />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.row}>
                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <Text style={styles.label}>Floor No.</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="0"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                        value={pickup.floor}
                                        onChangeText={(t) => setPickup({ ...pickup, floor: t })}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 8 }}>
                                    <Text style={styles.label}>Lift Available?</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity
                                            style={[styles.chip, pickup.lift && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }]}
                                            onPress={() => setPickup({ ...pickup, lift: true })}
                                        >
                                            <Text style={[styles.chipText, pickup.lift && { color: '#fff' }]}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.chip, !pickup.lift && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }]}
                                            onPress={() => setPickup({ ...pickup, lift: false })}
                                        >
                                            <Text style={[styles.chipText, !pickup.lift && { color: '#fff' }]}>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 2 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Receiver Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                placeholderTextColor="#999"
                                value={delivery.name}
                                onChangeText={(t) => setDelivery({ ...delivery, name: t })}
                            />
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter phone"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={delivery.phone}
                                onChangeText={(t) => setDelivery({ ...delivery, phone: t })}
                            />

                            {/* Select from Saved Addresses Button for Delivery */}
                            {savedAddresses.length > 0 && (
                                <TouchableOpacity
                                    style={styles.savedAddressButton}
                                    onPress={() => {
                                        setLocationPickerType('delivery');
                                        setShowSavedAddresses(true);
                                    }}
                                >
                                    <Ionicons name="bookmark-outline" size={20} color={Colors.light.primary} />
                                    <Text style={styles.savedAddressButtonText}>Select from Saved Addresses</Text>
                                </TouchableOpacity>
                            )}

                            <Text style={styles.label}>Delivery Location</Text>
                            <TouchableOpacity
                                style={styles.mapPickerButton}
                                onPress={() => {
                                    setLocationPickerType('delivery');
                                    setShowLocationPicker(true);
                                }}
                            >
                                <View style={styles.mapPickerContent}>
                                    <Ionicons name="location" size={24} color={Colors.light.primary} style={{ marginRight: 12 }} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.mapPickerLabel}>
                                            {delivery.address || 'Tap to select location on map'}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={24} color="#999" />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.row}>
                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <Text style={styles.label}>Floor No.</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="0"
                                        placeholderTextColor="#999"
                                        keyboardType="numeric"
                                        value={delivery.floor}
                                        onChangeText={(t) => setDelivery({ ...delivery, floor: t })}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 8 }}>
                                    <Text style={styles.label}>Lift Available?</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity
                                            style={[styles.chip, delivery.lift && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }]}
                                            onPress={() => setDelivery({ ...delivery, lift: true })}
                                        >
                                            <Text style={[styles.chipText, delivery.lift && { color: '#fff' }]}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.chip, !delivery.lift && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }]}
                                            onPress={() => setDelivery({ ...delivery, lift: false })}
                                        >
                                            <Text style={[styles.chipText, !delivery.lift && { color: '#fff' }]}>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 3 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>House Size</Text>
                            <View style={styles.row}>
                                {['1RK', '1BHK', '2BHK', '3BHK', 'Villa', 'Office'].map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        style={[
                                            styles.chip,
                                            movingDetails.houseSize === size && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }
                                        ]}
                                        onPress={() => setMovingDetails({ ...movingDetails, houseSize: size })}
                                    >
                                        <Text style={[styles.chipText, movingDetails.houseSize === size && { color: '#fff' }]}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Helpers Required</Text>
                            <View style={styles.counterContainer}>
                                <TouchableOpacity
                                    style={styles.counterButton}
                                    onPress={() => setMovingDetails({ ...movingDetails, helpers: Math.max(0, movingDetails.helpers - 1) })}
                                >
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.counterValue}>{movingDetails.helpers}</Text>
                                <TouchableOpacity
                                    style={styles.counterButton}
                                    onPress={() => setMovingDetails({ ...movingDetails, helpers: movingDetails.helpers + 1 })}
                                >
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>

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
                        </View>
                    )}

                    {step === 4 && (
                        <View style={styles.form}>
                            <View style={styles.summaryCard}>
                                <Text style={styles.summaryTitle}>Moving Details</Text>
                                <Text>Size: {movingDetails.houseSize}</Text>
                                <Text>Helpers: {movingDetails.helpers}</Text>
                                <Text>Vehicle: {vehicleType}</Text>
                                <View style={styles.divider} />

                                <Text style={styles.summaryTitle}>Pickup</Text>
                                <Text>{pickup.name}</Text>
                                <Text>{pickup.address}</Text>
                                <Text>Floor: {pickup.floor} ({pickup.lift ? 'Lift' : 'No Lift'})</Text>
                                <View style={styles.divider} />

                                <Text style={styles.summaryTitle}>Delivery</Text>
                                <Text>{delivery.name}</Text>
                                <Text>{delivery.address}</Text>
                                <Text>Floor: {delivery.floor} ({delivery.lift ? 'Lift' : 'No Lift'})</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Estimated Price</Text>
                                <Text style={styles.priceValue}>Rs. 3,500</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[GlobalStyles.button, { backgroundColor: Colors.light.primary }]}
                        onPress={handleNext}
                    >
                        <Text style={GlobalStyles.buttonText}>{step === totalSteps ? 'Book Move' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal
                visible={showLocationPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowLocationPicker(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Location</Text>
                            <TouchableOpacity onPress={() => setShowLocationPicker(false)}>
                                <Ionicons name="close" size={24} color={Colors.light.text} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.mapContainer}>
                            <WebView
                                source={{
                                    html: `
                                        <!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                                            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                                            <style>
                                                body { margin: 0; padding: 0; }
                                                #map { height: 100vh; width: 100vw; }
                                            </style>
                                        </head>
                                        <body>
                                            <div id="map"></div>
                                            <script>
                                                const map = L.map('map').setView([${locationPickerType === 'pickup' && pickup.address ? '27.7172, 85.3240' : locationPickerType === 'delivery' && delivery.address ? '27.7172, 85.3240' : '27.7172, 85.3240'}], 13);
                                                
                                                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                                    attribution: '© OpenStreetMap contributors',
                                                    maxZoom: 19
                                                }).addTo(map);
                                                
                                                let marker = L.marker([27.7172, 85.3240]).addTo(map);
                                                
                                                map.on('click', function(e) {
                                                    marker.setLatLng(e.latlng);
                                                    window.ReactNativeWebView.postMessage(JSON.stringify({
                                                        lat: e.latlng.lat,
                                                        lng: e.latlng.lng
                                                    }));
                                                });
                                            </script>
                                        </body>
                                        </html>
                                    `
                                }}
                                onMessage={(event: any) => {
                                    const data = JSON.parse(event.nativeEvent.data);
                                    Location.reverseGeocodeAsync({
                                        latitude: data.lat,
                                        longitude: data.lng,
                                    }).then((addressData) => {
                                        if (addressData[0]) {
                                            const addr = addressData[0];
                                            const fullAddress = (addr.street || '') + ', ' + (addr.city || '') + ', ' + (addr.region || '');

                                            if (locationPickerType === 'pickup') {
                                                setPickup({ ...pickup, address: fullAddress, lat: data.lat, lng: data.lng });
                                            } else {
                                                setDelivery({ ...delivery, address: fullAddress, lat: data.lat, lng: data.lng });
                                            }
                                        }
                                    });
                                }}
                            />
                        </View>

                        <View style={styles.locationInfo}>
                            <Ionicons name="location" size={32} color={Colors.light.primary} style={{ marginRight: 12 }} />
                            <Text style={styles.locationText}>
                                {locationPickerType === 'pickup' ? pickup.address : delivery.address || 'No location selected'}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.locationButton, { backgroundColor: Colors.light.secondary }]}
                            onPress={async () => {
                                try {
                                    const { status } = await Location.requestForegroundPermissionsAsync();
                                    if (status !== 'granted') {
                                        alert('Location permission is required');
                                        return;
                                    }

                                    const currentLocation = await Location.getCurrentPositionAsync({});
                                    const addressData = await Location.reverseGeocodeAsync({
                                        latitude: currentLocation.coords.latitude,
                                        longitude: currentLocation.coords.longitude,
                                    });

                                    if (addressData[0]) {
                                        const addr = addressData[0];
                                        const fullAddress = `${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`;

                                        if (locationPickerType === 'pickup') {
                                            setPickup({
                                                ...pickup,
                                                address: fullAddress,
                                                lat: currentLocation.coords.latitude,
                                                lng: currentLocation.coords.longitude
                                            });
                                        } else {
                                            setDelivery({
                                                ...delivery,
                                                address: fullAddress,
                                                lat: currentLocation.coords.latitude,
                                                lng: currentLocation.coords.longitude
                                            });
                                        }
                                    }
                                } catch (error) {
                                    alert('Error getting location');
                                }
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="location" size={20} color="#fff" style={{ marginRight: 8 }} />
                                <Text style={styles.locationButtonText}>Use Current Location</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.confirmLocationButton, { backgroundColor: Colors.light.primary }]}
                            onPress={() => setShowLocationPicker(false)}
                        >
                            <Text style={styles.confirmLocationButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Saved Addresses Modal */}
            <Modal
                visible={showSavedAddresses}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowSavedAddresses(false)}
            >
                <View style={styles.savedAddressModalOverlay}>
                    <View style={styles.savedAddressModalContent}>
                        <View style={styles.savedAddressModalHeader}>
                            <Text style={styles.savedAddressModalTitle}>Select Saved Address</Text>
                            <TouchableOpacity onPress={() => setShowSavedAddresses(false)}>
                                <Ionicons name="close" size={28} color={Colors.light.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {savedAddresses.length === 0 ? (
                                <View style={styles.emptyState}>
                                    <Ionicons name="bookmark-outline" size={48} color="#ccc" />
                                    <Text style={styles.emptyStateText}>No saved addresses</Text>
                                </View>
                            ) : (
                                savedAddresses.map((address) => (
                                    <TouchableOpacity
                                        key={address.id}
                                        style={styles.savedAddressItem}
                                        onPress={() => handleSelectSavedAddress(address)}
                                    >
                                        <View style={styles.savedAddressIconContainer}>
                                            <Ionicons name="location" size={24} color={Colors.light.primary} />
                                        </View>
                                        <View style={styles.savedAddressInfo}>
                                            <Text style={styles.savedAddressLabel}>{address.label}</Text>
                                            <Text style={styles.savedAddressText}>{address.address}</Text>
                                        </View>
                                        <Ionicons name="chevron-forward" size={20} color="#999" />
                                    </TouchableOpacity>
                                ))
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
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
    mapButton: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    mapPickerButton: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        backgroundColor: Colors.light.surface,
    },
    mapPickerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    mapPickerLabel: {
        fontSize: 14,
        color: Colors.light.text,
    },
    mapArrow: {
        fontSize: 24,
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
    mapContainer: {
        height: 250,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
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
        minHeight: 300,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    locationInfo: {
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    locationText: {
        flex: 1,
        fontSize: 14,
        color: Colors.light.text,
    },
    locationButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    confirmLocationButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmLocationButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    counterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    counterValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
        color: Colors.light.text,
    },
    savedAddressButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.light.primary,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: Colors.light.surface,
    },
    savedAddressButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.primary,
        marginLeft: 8,
    },
    savedAddressModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    savedAddressModalContent: {
        backgroundColor: Colors.light.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        maxHeight: '80%',
    },
    savedAddressModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    savedAddressModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#999',
        marginTop: 12,
    },
    savedAddressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        marginBottom: 12,
    },
    savedAddressIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.light.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    savedAddressInfo: {
        flex: 1,
    },
    savedAddressLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    savedAddressText: {
        fontSize: 14,
        color: '#666',
    },
});
