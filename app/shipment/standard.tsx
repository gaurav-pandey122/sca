import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

export default function StandardDeliveryScreen() {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState({ name: '', phone: '', address: '', lat: 0, lng: 0 });
    const [delivery, setDelivery] = useState({ name: '', phone: '', address: '', lat: 0, lng: 0 });
    const [packageDetails, setPackageDetails] = useState({ type: 'Parcel', weight: '', size: 'Small' });
    const [vehicleType, setVehicleType] = useState('Bike');
    const [dropOffType, setDropOffType] = useState<'pickup' | 'hub'>('pickup');
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [locationPickerType, setLocationPickerType] = useState<'pickup' | 'delivery'>('pickup');

    const totalSteps = 4;

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
                        <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Standard Delivery</Text>
                    <View style={{ width: 24 }} />
                </View>

                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Text style={styles.infoText}>ℹ️ Delivery takes up to 2-3 business days</Text>
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
                            <Text style={styles.label}>Parcel Drop-off Type</Text>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={[
                                        styles.chip,
                                        dropOffType === 'pickup' && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }
                                    ]}
                                    onPress={() => setDropOffType('pickup')}
                                >
                                    <Text style={[styles.chipText, dropOffType === 'pickup' && { color: '#fff' }]}>🛵 Pickup by Rider</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.chip,
                                        dropOffType === 'hub' && { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary }
                                    ]}
                                    onPress={() => setDropOffType('hub')}
                                >
                                    <Text style={[styles.chipText, dropOffType === 'hub' && { color: '#fff' }]}>🏢 Drop to Hubs</Text>
                                </TouchableOpacity>
                            </View>

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

                            {dropOffType === 'pickup' && (
                                <>
                                    <Text style={styles.label}>Pickup Location</Text>
                                    <TouchableOpacity
                                        style={styles.mapPickerButton}
                                        onPress={() => {
                                            setLocationPickerType('pickup');
                                            setShowLocationPicker(true);
                                        }}
                                    >
                                        <View style={styles.mapPickerContent}>
                                            <Text style={styles.mapIcon}>📍</Text>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.mapPickerLabel}>
                                                    {pickup.address || 'Tap to select location on map'}
                                                </Text>
                                            </View>
                                            <Text style={styles.mapArrow}>›</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )}
                            {dropOffType === 'hub' && (
                                <View style={styles.hubInfo}>
                                    <Text style={styles.hubText}>Please drop your parcel at the nearest Singon Hub.</Text>
                                </View>
                            )}
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
                            <Text style={styles.label}>Delivery Location</Text>
                            <TouchableOpacity
                                style={styles.mapPickerButton}
                                onPress={() => {
                                    setLocationPickerType('delivery');
                                    setShowLocationPicker(true);
                                }}
                            >
                                <View style={styles.mapPickerContent}>
                                    <Text style={styles.mapIcon}>📍</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.mapPickerLabel}>
                                            {delivery.address || 'Tap to select location on map'}
                                        </Text>
                                    </View>
                                    <Text style={styles.mapArrow}>›</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}

                    {step === 3 && (
                        <View style={styles.form}>
                            <Text style={styles.label}>Vehicle Type</Text>
                            <View style={styles.row}>
                                {[
                                    { type: 'Bike', icon: '🏍️' },
                                    { type: 'Pickup Truck', icon: '🛻' },
                                    { type: 'Cargo Van', icon: '🚐' },
                                    { type: 'Mini Truck', icon: '🚚' }
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
                                            {v.icon} {v.type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Package Type</Text>
                            <View style={styles.row}>
                                {['Parcel', 'Document', 'Fragile'].map((t) => (
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
                                <Text style={styles.summaryTitle}>Drop-off Type</Text>
                                <Text>{dropOffType === 'pickup' ? 'Pickup by Rider' : 'Drop to Hubs'}</Text>
                                <View style={styles.divider} />

                                {dropOffType === 'pickup' && (
                                    <>
                                        <Text style={styles.summaryTitle}>Pickup</Text>
                                        <Text>{pickup.name}</Text>
                                        <Text>{pickup.address}</Text>
                                        <View style={styles.divider} />
                                    </>
                                )}

                                <Text style={styles.summaryTitle}>Delivery</Text>
                                <Text>{delivery.name}</Text>
                                <Text>{delivery.address}</Text>
                                <View style={styles.divider} />
                                <Text style={styles.summaryTitle}>Package</Text>
                                <Text>{packageDetails.type} - {packageDetails.weight}kg</Text>
                                <View style={styles.divider} />
                                <Text style={styles.summaryTitle}>Vehicle</Text>
                                <Text>{vehicleType}</Text>
                            </View>

                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Estimated Price</Text>
                                <Text style={styles.priceValue}>Rs. 800</Text>
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
                                <Text style={{ fontSize: 24, color: Colors.light.text }}>×</Text>
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
                            <Text style={styles.locationIcon}>📍</Text>
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
                            <Text style={styles.locationButtonText}>📍 Use Current Location</Text>
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
    infoBanner: {
        backgroundColor: '#EFF6FF',
        padding: 12,
        alignItems: 'center',
    },
    infoText: {
        color: '#1E40AF',
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
    hubInfo: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    hubText: {
        color: Colors.light.text,
        fontSize: 14,
    },
});
