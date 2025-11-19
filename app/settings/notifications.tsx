import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';

export default function NotificationsScreen() {
    const [pushNotifications, setPushNotifications] = useState(true);
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [promotions, setPromotions] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTitle}>Push Notifications</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Text style={styles.settingLabel}>Enable Push Notifications</Text>
                        <Text style={styles.settingDescription}>Receive notifications on your device</Text>
                    </View>
                    <Switch
                        value={pushNotifications}
                        onValueChange={setPushNotifications}
                        trackColor={{ false: '#E5E7EB', true: Colors.light.primary + '40' }}
                        thumbColor={pushNotifications ? Colors.light.primary : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Text style={styles.settingLabel}>Order Updates</Text>
                        <Text style={styles.settingDescription}>Get notified about your order status</Text>
                    </View>
                    <Switch
                        value={orderUpdates}
                        onValueChange={setOrderUpdates}
                        trackColor={{ false: '#E5E7EB', true: Colors.light.primary + '40' }}
                        thumbColor={orderUpdates ? Colors.light.primary : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Text style={styles.settingLabel}>Promotions & Offers</Text>
                        <Text style={styles.settingDescription}>Receive special offers and discounts</Text>
                    </View>
                    <Switch
                        value={promotions}
                        onValueChange={setPromotions}
                        trackColor={{ false: '#E5E7EB', true: Colors.light.primary + '40' }}
                        thumbColor={promotions ? Colors.light.primary : '#f4f3f4'}
                    />
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Other Channels</Text>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Text style={styles.settingLabel}>Email Notifications</Text>
                        <Text style={styles.settingDescription}>Receive updates via email</Text>
                    </View>
                    <Switch
                        value={emailNotifications}
                        onValueChange={setEmailNotifications}
                        trackColor={{ false: '#E5E7EB', true: Colors.light.primary + '40' }}
                        thumbColor={emailNotifications ? Colors.light.primary : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                        <Text style={styles.settingLabel}>SMS Notifications</Text>
                        <Text style={styles.settingDescription}>Receive updates via SMS</Text>
                    </View>
                    <Switch
                        value={smsNotifications}
                        onValueChange={setSmsNotifications}
                        trackColor={{ false: '#E5E7EB', true: Colors.light.primary + '40' }}
                        thumbColor={smsNotifications ? Colors.light.primary : '#f4f3f4'}
                    />
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
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
    },
    settingLeft: {
        flex: 1,
        marginRight: 16,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 13,
        color: '#666',
    },
});
