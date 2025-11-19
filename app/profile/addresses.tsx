import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

type Address = {
    id: string;
    label: string;
    address: string;
    isDefault: boolean;
};

export default function AddressesScreen() {
    const [addresses, setAddresses] = useState<Address[]>([
        { id: '1', label: 'Home', address: '123 Main St, Kathmandu', isDefault: true },
        { id: '2', label: 'Work', address: '456 Park Ave, Lalitpur', isDefault: false },
    ]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Saved Addresses</Text>
                <TouchableOpacity onPress={() => router.push('/profile/addresses/add-edit')}>
                    <Text style={{ fontSize: 24, color: Colors.light.primary }}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={[GlobalStyles.card, { backgroundColor: Colors.light.card }]}>
                        <View style={styles.addressHeader}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>{item.label}</Text>
                                {item.isDefault && (
                                    <View style={styles.defaultBadge}>
                                        <Text style={styles.defaultText}>Default</Text>
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={() => router.push({
                                    pathname: '/profile/addresses/add-edit',
                                    params: {
                                        id: item.id,
                                        label: item.label,
                                        address: item.address,
                                        lat: '27.7172',
                                        lng: '85.3240'
                                    }
                                })}
                            >
                                <Text style={{ color: Colors.light.primary }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.address}>{item.address}</Text>
                    </View>
                )}
            />
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
    listContainer: {
        padding: 16,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginRight: 8,
    },
    defaultBadge: {
        backgroundColor: Colors.light.primary + '20',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    defaultText: {
        fontSize: 10,
        color: Colors.light.primary,
        fontWeight: '600',
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
});
