import { router } from 'expo-router';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

type OrderStatus = 'placed' | 'confirmed' | 'picked' | 'in_transit' | 'delivered';

export default function TrackingScreen() {
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>('in_transit');
    const [riderLocation, setRiderLocation] = useState({ lat: 27.7172, lng: 85.3240 }); // Kathmandu

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
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Track Order</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView>
                {/* Map Placeholder */}
                <View style={styles.mapContainer}>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapIcon}>🗺️</Text>
                        <Text style={styles.mapText}>Map View</Text>
                        <Text style={styles.mapSubtext}>Rider is on the way</Text>
                        <View style={styles.etaContainer}>
                            <Text style={styles.etaLabel}>ETA</Text>
                            <Text style={styles.etaValue}>15 mins</Text>
                        </View>
                    </View>
                </View>

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
                            <Text style={styles.actionIcon}>📞</Text>
                            <Text style={styles.actionText}>Call Rider</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors.light.secondary }]}>
                            <Text style={styles.actionIcon}>💬</Text>
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
        height: 250,
        backgroundColor: Colors.light.surface,
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
    etaContainer: {
        marginTop: 16,
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    etaLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },
    etaValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
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
});
