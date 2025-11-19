import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
    const { signOut } = useAuth();

    const menuItems = [
        { icon: '👤', label: 'Edit Profile', route: '/profile/edit' },
        { icon: '📍', label: 'Saved Addresses', route: '/profile/addresses' },
        { icon: '🔔', label: 'Notifications', route: '/settings/notifications' },
        { icon: '❓', label: 'FAQ', route: '/faq' },
        { icon: '🆘', label: 'Help & Support', route: '/support' },
        { icon: '📄', label: 'Terms & Privacy', route: '/legal' },
    ];

    const handleMenuPress = (route: string) => {
        if (route === '/profile/edit' || route === '/profile/addresses' || route === '/support' || route === '/settings/notifications' || route === '/legal' || route === '/faq') {
            router.push(route);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to log out of your account?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes, Logout',
                    style: 'destructive',
                    onPress: () => signOut(),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {/* User Info */}
                <View style={[GlobalStyles.card, { backgroundColor: Colors.light.card, alignItems: 'center' }]}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>G</Text>
                    </View>
                    <Text style={styles.userName}>Gaurav</Text>
                    <Text style={styles.userPhone}>+977 9800000000</Text>
                </View>

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.menuItem, { borderBottomWidth: index < menuItems.length - 1 ? 1 : 0 }]}
                            onPress={() => handleMenuPress(item.route)}
                        >
                            <View style={styles.menuLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Logout Button - Fixed at bottom */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
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
    container: {
        padding: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 14,
        color: '#666',
    },
    menuSection: {
        marginTop: 24,
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: Colors.light.border,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    menuLabel: {
        fontSize: 16,
        color: Colors.light.text,
    },
    menuArrow: {
        fontSize: 24,
        color: '#999',
    },
    logoutContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: Colors.light.danger,
        borderRadius: 12,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
