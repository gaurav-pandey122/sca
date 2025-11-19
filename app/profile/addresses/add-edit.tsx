import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Colors } from '../../../constants/Colors';
import { GlobalStyles } from '../../../constants/Styles';

export default function AddEditAddressScreen() {
    const params = useLocalSearchParams();
    const isEdit = params.id !== undefined;

    const [label, setLabel] = useState(params.label as string || '');
    const [address, setAddress] = useState(params.address as string || '');
    const [lat, setLat] = useState(parseFloat(params.lat as string) || 0);
    const [lng, setLng] = useState(parseFloat(params.lng as string) || 0);
    const [showLocationPicker, setShowLocationPicker] = useState(false);

    const handleSave = () => {
        if (!label.trim()) {
            Alert.alert('Error', 'Address label is required');
            return;
        }

        if (!address.trim()) {
            Alert.alert('Error', 'Address is required');
            return;
        }

        // Save address (mocked for now)
        Alert.alert('Success', `Address ${isEdit ? 'updated' : 'added'} successfully`, [
            {
                text: 'OK',
                onPress: () => router.back(),
            },
        ]);
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Address',
            'Are you sure you want to delete this address?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        // Delete address (mocked)
                        router.back();
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{isEdit ? 'Edit Address' : 'Add Address'}</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Label</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., Home, Work, Office"
                        value={label}
                        onChangeText={setLabel}
                    />

                    <Text style={styles.label}>Address</Text>
                    <TouchableOpacity
                        style={styles.mapPickerButton}
                        onPress={() => setShowLocationPicker(true)}
                    >
                        <View style={styles.mapPickerContent}>
                            <Text style={styles.mapIcon}>📍</Text>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.mapPickerLabel}>
                                    {address || 'Tap to select location on map'}
                                </Text>
                            </View>
                            <Text style={styles.mapArrow}>›</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {isEdit && (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={handleDelete}
                    >
                        <Text style={styles.deleteButtonText}>Delete Address</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {/* Save Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[GlobalStyles.button, { backgroundColor: Colors.light.primary }]}
                    onPress={handleSave}
                >
                    <Text style={GlobalStyles.buttonText}>{isEdit ? 'Update Address' : 'Save Address'}</Text>
                </TouchableOpacity>
            </View>

            {/* Location Picker Modal */}
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

                        {/* OpenStreetMap */}
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
                                                const map = L.map('map').setView([${lat || 27.7172}, ${lng || 85.3240}], 13);
                                                
                                                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                                    attribution: '© OpenStreetMap contributors',
                                                    maxZoom: 19
                                                }).addTo(map);
                                                
                                                let marker = L.marker([${lat || 27.7172}, ${lng || 85.3240}]).addTo(map);
                                                
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
                                    setLat(data.lat);
                                    setLng(data.lng);

                                    // Get address from coordinates
                                    Location.reverseGeocodeAsync({
                                        latitude: data.lat,
                                        longitude: data.lng,
                                    }).then((addressData) => {
                                        if (addressData[0]) {
                                            const addr = addressData[0];
                                            const fullAddress = `${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`;
                                            setAddress(fullAddress);
                                        }
                                    });
                                }}
                            />
                        </View>

                        <View style={styles.locationInfo}>
                            <Text style={styles.locationIcon}>📍</Text>
                            <Text style={styles.locationText}>
                                {address || 'No location selected'}
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
                                        setAddress(fullAddress);
                                        setLat(currentLocation.coords.latitude);
                                        setLng(currentLocation.coords.longitude);
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
    container: {
        padding: 16,
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: Colors.light.surface,
        color: Colors.light.text,
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
    deleteButton: {
        marginTop: 24,
        padding: 16,
        backgroundColor: Colors.light.danger + '10',
        borderRadius: 12,
        alignItems: 'center',
    },
    deleteButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.danger,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
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
        minHeight: 500,
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
    mapContainer: {
        height: 250,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    locationInfo: {
        backgroundColor: Colors.light.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
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
});
