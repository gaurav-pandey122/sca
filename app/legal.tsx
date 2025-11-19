import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

export default function LegalScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Privacy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {/* Terms of Service */}
                <Text style={styles.mainTitle}>Terms of Service</Text>
                <Text style={styles.lastUpdated}>Last updated: November 19, 2025</Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By accessing and using Singon Customer App, you accept and agree to be bound by the terms and provision of this agreement.
                </Text>

                <Text style={styles.sectionTitle}>2. Use of Service</Text>
                <Text style={styles.paragraph}>
                    You agree to use our delivery service only for lawful purposes. You must not use our service to send prohibited or illegal items.
                </Text>

                <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
                <Text style={styles.paragraph}>
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </Text>

                <Text style={styles.sectionTitle}>4. Delivery Terms</Text>
                <Text style={styles.paragraph}>
                    We will make every effort to deliver packages on time. However, delivery times are estimates and we are not liable for delays caused by circumstances beyond our control.
                </Text>

                <Text style={styles.sectionTitle}>5. Payment</Text>
                <Text style={styles.paragraph}>
                    Payment must be made through the app using approved payment methods. All prices are in Nepali Rupees (NPR).
                </Text>

                <View style={styles.divider} />

                {/* Privacy Policy */}
                <Text style={styles.mainTitle}>Privacy Policy</Text>
                <Text style={styles.lastUpdated}>Last updated: November 19, 2025</Text>

                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.paragraph}>
                    We collect information you provide directly to us, including your name, email address, phone number, and delivery addresses.
                </Text>

                <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    We use the information we collect to provide, maintain, and improve our services, to process your deliveries, and to communicate with you.
                </Text>

                <Text style={styles.sectionTitle}>3. Location Data</Text>
                <Text style={styles.paragraph}>
                    We collect precise location data to facilitate pickups and deliveries. You can disable location services, but this may limit functionality.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Security</Text>
                <Text style={styles.paragraph}>
                    We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
                </Text>

                <Text style={styles.sectionTitle}>5. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions about these Terms or Privacy Policy, please contact us at support@singon.com.np
                </Text>
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
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    lastUpdated: {
        fontSize: 12,
        color: '#666',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 12,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.light.border,
        marginVertical: 32,
    },
});
