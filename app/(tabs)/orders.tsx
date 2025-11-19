import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCard from '../../components/OrderCard';
import { Colors } from '../../constants/Colors';

type Order = {
    id: string;
    status: string;
    pickup: string;
    delivery: string;
    price: string;
    date: string;
};

export default function OrdersScreen() {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const mockOrders: Order[] = [
        {
            id: '88291',
            status: 'Active',
            pickup: '123 Main St, Kathmandu',
            delivery: '456 Park Ave, Lalitpur',
            price: 'Rs. 1,500',
            date: '2025-11-19',
        },
        {
            id: '88280',
            status: 'Delivered',
            pickup: '789 Broadway, Kathmandu',
            delivery: '321 5th Ave, Bhaktapur',
            price: 'Rs. 1,250',
            date: '2025-11-18',
        },
        {
            id: '88270',
            status: 'Delivered',
            pickup: '555 Market St, Lalitpur',
            delivery: '888 Ring Rd, Kathmandu',
            price: 'Rs. 1,800',
            date: '2025-11-17',
        },
        {
            id: '88260',
            status: 'Cancelled',
            pickup: '222 Temple Rd, Patan',
            delivery: '999 Lake Side, Pokhara',
            price: 'Rs. 2,500',
            date: '2025-11-16',
        },
    ];

    const filteredOrders = mockOrders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'active') return order.status === 'Active';
        if (filter === 'completed') return order.status === 'Delivered';
        return true;
    });

    const handleOrderPress = (orderId: string) => {
        router.push(`/tracking/${orderId}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Orders</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterTab, filter === f && styles.filterTabActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Orders List */}
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <OrderCard
                        id={item.id}
                        status={item.status}
                        pickup={item.pickup}
                        delivery={item.delivery}
                        price={item.price}
                        onPress={() => handleOrderPress(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📦</Text>
                        <Text style={styles.emptyText}>No orders found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    filterTab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: Colors.light.surface,
    },
    filterTabActive: {
        backgroundColor: Colors.light.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    filterTextActive: {
        color: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});
