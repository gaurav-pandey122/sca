import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

export default function MapPickerScreen() {
    const params = useLocalSearchParams();
    const [location, setLocation] = useState({
        latitude: 27.7172,
        longitude: 85.3240,
    });
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Location permission is required to use the map picker.');
                setLoading(false);
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

            // Get address from coordinates
            const addressData = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

            if (addressData[0]) {
                const addr = addressData[0];
                setAddress(`${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`);
            }

            setLoading(false);
        })();
    }, []);

    const handleConfirm = () => {
        // Return the selected location to the previous screen
        router.back();
        // In a real implementation, you'd pass this data back via navigation params or state management
        console.log('Selected location:', { ...location, address });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Location</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapPlaceholder}>
                <Text style={styles.mapIcon}>🗺️</Text>
                <Text style={styles.mapPlaceholderText}>Map View</Text>
                <Text style={styles.coordsText}>
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </Text>
                <Text style={styles.instructionText}>
                    Tap "Use Current Location" to select your current position
                </Text>
            </View>

            <View style={styles.footer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.addressLabel}>Selected Location:</Text>
                    <Text style={styles.addressText}>{address || 'No location selected'}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: Colors.light.secondary, marginBottom: 12 }]}
                    onPress={async () => {
                        const currentLocation = await Location.getCurrentPositionAsync({});
                        setLocation({
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        });

                        const addressData = await Location.reverseGeocodeAsync({
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        });

                        if (addressData[0]) {
                            const addr = addressData[0];
                            setAddress(`${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}`);
                        }
                    }}
                >
                    <Text style={styles.actionButtonText}>📍 Use Current Location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.confirmButton, { backgroundColor: Colors.light.primary }]}
                    onPress={handleConfirm}
                >
                    <Text style={styles.confirmButtonText}>Confirm Location</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
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
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        margin: 16,
        borderRadius: 12,
        padding: 20,
    },
    mapIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    mapPlaceholderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    coordsText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    instructionText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
    footer: {
        padding: 16,
        backgroundColor: Colors.light.background,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
    addressContainer: {
        marginBottom: 16,
    },
    addressLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    actionButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    confirmButton: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
