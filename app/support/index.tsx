import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

type FAQ = {
    question: string;
    answer: string;
};

export default function SupportScreen() {
    const faqs: FAQ[] = [
        {
            question: 'How do I track my order?',
            answer: 'Go to Orders tab and tap on any active order to see live tracking.',
        },
        {
            question: 'How can I cancel an order?',
            answer: 'You can cancel an order within 5 minutes of placing it from the tracking screen.',
        },
        {
            question: 'What payment methods are accepted?',
            answer: 'We accept Wallet, Online Payment (Card/UPI), and Cash on Delivery.',
        },
        {
            question: 'How do I add money to my wallet?',
            answer: 'Go to Wallet section and tap "Add Money" to add funds using card or bank transfer.',
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.light.primary }]}>
                        <Text style={styles.actionIcon}>💬</Text>
                        <Text style={styles.actionText}>Live Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.light.secondary }]}>
                        <Text style={styles.actionIcon}>📞</Text>
                        <Text style={styles.actionText}>Call Us</Text>
                    </TouchableOpacity>
                </View>

                {/* FAQs */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                    {faqs.map((faq, index) => (
                        <View key={index} style={[GlobalStyles.card, { backgroundColor: Colors.light.card, marginBottom: 12 }]}>
                            <Text style={styles.question}>{faq.question}</Text>
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </View>
                    ))}
                </View>

                {/* Contact Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={[GlobalStyles.card, { backgroundColor: Colors.light.card }]}>
                        <Text style={styles.contactItem}>📧 support@singon.com</Text>
                        <Text style={styles.contactItem}>📞 +977 980-0000-000</Text>
                        <Text style={styles.contactItem}>🕐 Mon-Sat, 9 AM - 6 PM</Text>
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
    container: {
        padding: 16,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    actionCard: {
        flex: 1,
        marginHorizontal: 6,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 12,
    },
    question: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
    },
    answer: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    contactItem: {
        fontSize: 14,
        color: Colors.light.text,
        marginVertical: 6,
    },
});
