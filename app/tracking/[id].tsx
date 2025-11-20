import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

type OrderStatus = 'placed' | 'confirmed' | 'picked' | 'in_transit' | 'delivered';

export default function TrackingScreen() {
    const { type } = useLocalSearchParams<{ type?: string }>();
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>('in_transit');
    const [riderLocation, setRiderLocation] = useState({ lat: 27.7172, lng: 85.3240 }); // Kathmandu
    const orderType = type || 'Standard Delivery'; // Default to Standard Delivery if not provided

    // Get OSRM server URL from environment config
    const osrmServerUrl = Constants.expoConfig?.extra?.osrmServerUrl || 'https://osmr.smarten.com.np/route/v1';

    const statuses: { key: OrderStatus; label: string; time?: string }[] = [
        { key: 'placed', label: 'Order Placed', time: '10:30 AM' },
        { key: 'confirmed', label: 'Confirmed', time: '10:35 AM' },
        { key: 'picked', label: 'Picked Up', time: '11:00 AM' },
        { key: 'in_transit', label: 'In Transit', time: '11:30 AM' },
        { key: 'delivered', label: 'Delivered' },
    ];

    const getStatusIndex = (status: OrderStatus) => statuses.findIndex(s => s.key === status);

    const handleCallRider = () => {
        Linking.openURL('tel:+9779800000000');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Track Order</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView>
                {/* OpenStreetMap - Only for Express Delivery */}
                {orderType === 'Express Delivery' && (
                    <View style={styles.mapContainer}>
                        <WebView
                            style={styles.map}
                            source={{
                                html: `
                                    <!DOCTYPE html>
                                    <html>
                                    <head>
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                                        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                                        <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
                                        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
                                        <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
                                        <style>
                                            body { margin: 0; padding: 0; }
                                            #map { width: 100%; height: 100vh; }
                                            .leaflet-routing-container { display: none; }
                                        </style>
                                    </head>
                                    <body>
                                        <div id="map"></div>
                                        <script>
                                            // Initialize map centered between pickup and delivery
                                            var map = L.map('map').setView([27.6941, 85.3240], 12);
                                            
                                            // Add OpenStreetMap tiles
                                            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                                attribution: '© OpenStreetMap contributors',
                                                maxZoom: 19
                                            }).addTo(map);
                                            
                                            // Custom icon for pickup (blue)
                                            var pickupIcon = L.divIcon({
                                                className: 'custom-icon',
                                                html: '<div style="background-color: ${Colors.light.primary}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); margin-top: 5px; margin-left: 7px; font-size: 16px;">📍</div></div>',
                                                iconSize: [30, 30],
                                                iconAnchor: [15, 30]
                                            });
                                            
                                            // Custom icon for delivery (green)
                                            var deliveryIcon = L.divIcon({
                                                className: 'custom-icon',
                                                html: '<div style="background-color: ${Colors.light.secondary}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><div style="transform: rotate(45deg); margin-top: 5px; margin-left: 7px; font-size: 16px;">📍</div></div>',
                                                iconSize: [30, 30],
                                                iconAnchor: [15, 30]
                                            });
                                            
                                            // Custom icon for rider
                                            var riderIcon = L.divIcon({
                                                className: 'custom-icon',
                                                html: '<div style="background-color: ${Colors.light.primary}; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 20px;">🚴</div>',
                                                iconSize: [40, 40],
                                                iconAnchor: [20, 20]
                                            });
                                            
                                            // Add markers
                                            L.marker([27.7172, 85.3240], {icon: pickupIcon})
                                                .addTo(map)
                                                .bindPopup('<b>Pickup Location</b><br>123 Main St, Kathmandu');
                                            
                                            L.marker([27.6710, 85.3240], {icon: deliveryIcon})
                                                .addTo(map)
                                                .bindPopup('<b>Delivery Location</b><br>456 Park Ave, Lalitpur');
                                            
                                            L.marker([${riderLocation.lat}, ${riderLocation.lng}], {icon: riderIcon})
                                                .addTo(map)
                                                .bindPopup('<b>Rider</b><br>On the way');
                                            
                                            // Add routing from pickup to delivery via rider location
                                            L.Routing.control({
                                                waypoints: [
                                                    L.latLng(27.7172, 85.3240),
                                                    L.latLng(${riderLocation.lat}, ${riderLocation.lng}),
                                                    L.latLng(27.6710, 85.3240)
                                                ],
                                                router: L.Routing.osrmv1({
                                                    serviceUrl: '${osrmServerUrl}',
                                                }),
                                                routeWhileDragging: false,
                                                addWaypoints: false,
                                                draggableWaypoints: false,
                                                fitSelectedRoutes: true,
                                                showAlternatives: false,
                                                lineOptions: {
                                                    styles: [{
                                                        color: '${Colors.light.primary}',
                                                        opacity: 0.8,
                                                        weight: 5
                                                    }]
                                                },
                                                createMarker: function() { return null; }
                                            }).addTo(map);
                                        </script>
                                    </body>
                                    </html>
                                `
                            }}
                            scrollEnabled={false}
                            bounces={false}
                        />

                        {/* ETA Overlay */}
                        <View style={styles.etaOverlay}>
                            <View style={styles.etaContainer}>
                                <Text style={styles.etaLabel}>ETA</Text>
                                <Text style={styles.etaValue}>15 mins</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Order Info */}
                <View style={styles.section}>
                    <View style={[GlobalStyles.card, { backgroundColor: Colors.light.card }]}>
                        <Text style={styles.orderId}>Order #88291</Text>
                        <View style={styles.divider} />
                        <View style={styles.locationRow}>
                            <View style={[styles.dot, { backgroundColor: Colors.light.primary }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationText}>123 Main St, Kathmandu</Text>
                            </View>
                        </View>
                        <View style={styles.locationRow}>
                            <View style={[styles.dot, { backgroundColor: Colors.light.secondary }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.locationLabel}>Delivery</Text>
                                <Text style={styles.locationText}>456 Park Ave, Lalitpur</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Rider Info - Only for Express Delivery */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Rider Information</Text>
                    <View style={[GlobalStyles.card, { backgroundColor: Colors.light.card }]}>
                        <View style={styles.riderInfoContainer}>
                            <View style={styles.riderAvatar}>
                                <Ionicons name="person" size={32} color={Colors.light.primary} />
                            </View>
                            <View style={styles.riderDetails}>
                                <Text style={styles.riderName}>Bishnu Dhakal</Text>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={14} color="#FFB800" />
                                    <Text style={styles.ratingText}>4.8</Text>
                                    <Text style={styles.ratingCount}>(245 trips)</Text>
                                </View>
                                <View style={styles.vehicleInfo}>
                                    <Ionicons name="bicycle" size={14} color="#666" />
                                    <Text style={styles.vehicleText}>Bike • BA 01 AB 1234</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Status Timeline */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Status Timeline</Text>
                    <View style={[GlobalStyles.card, { backgroundColor: Colors.light.card }]}>
                        {statuses.map((status, index) => {
                            const isCompleted = getStatusIndex(currentStatus) >= index;
                            const isCurrent = currentStatus === status.key;

                            return (
                                <View key={status.key} style={styles.timelineItem}>
                                    <View style={styles.timelineLeft}>
                                        <View style={[
                                            styles.timelineDot,
                                            isCompleted && { backgroundColor: Colors.light.primary },
                                            isCurrent && styles.timelineDotActive,
                                        ]} />
                                        {index < statuses.length - 1 && (
                                            <View style={[
                                                styles.timelineLine,
                                                isCompleted && { backgroundColor: Colors.light.primary },
                                            ]} />
                                        )}
                                    </View>
                                    <View style={styles.timelineContent}>
                                        <Text style={[
                                            styles.timelineLabel,
                                            isCompleted && { color: Colors.light.text, fontWeight: '600' },
                                        ]}>
                                            {status.label}
                                        </Text>
                                        {status.time && (
                                            <Text style={styles.timelineTime}>{status.time}</Text>
                                        )}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.section}>
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: Colors.light.primary }]}
                            onPress={handleCallRider}
                        >
                            <Ionicons name="call" size={24} color="#fff" style={{ marginBottom: 6 }} />
                            <Text style={styles.actionText}>Call Rider</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.light.secondary }]}>
                            <Ionicons name="chatbubble" size={24} color="#fff" style={{ marginBottom: 6 }} />
                            <Text style={styles.actionText}>Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
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
    mapContainer: {
        height: 300,
        backgroundColor: Colors.light.surface,
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8F4F8',
    },
    mapIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    mapText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    mapSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    etaOverlay: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    etaContainer: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    etaLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: '600',
    },
    etaValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    riderMarker: {
        backgroundColor: Colors.light.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    section: {
        padding: 16,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.light.border,
        marginBottom: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 12,
        marginTop: 4,
    },
    locationLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    locationText: {
        fontSize: 14,
        color: Colors.light.text,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: 16,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ddd',
        borderWidth: 2,
        borderColor: '#fff',
    },
    timelineDotActive: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 3,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: '#ddd',
        marginVertical: 4,
    },
    timelineContent: {
        flex: 1,
        paddingTop: 2,
    },
    timelineLabel: {
        fontSize: 14,
        color: '#666',
    },
    timelineTime: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 6,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
    },
    actionIcon: {
        fontSize: 28,
        marginBottom: 6,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    riderInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    riderAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.light.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    riderDetails: {
        flex: 1,
    },
    riderName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginLeft: 4,
    },
    ratingCount: {
        fontSize: 12,
        color: '#999',
        marginLeft: 4,
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vehicleText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 4,
    },
});
