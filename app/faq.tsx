import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: 'How do I track my order?',
        answer: 'You can track your order by entering your Order ID in the "Track Your Order" section on the home screen, or by viewing it in the "Orders" tab.',
    },
    {
        question: 'What are the delivery charges?',
        answer: 'Delivery charges vary based on distance, vehicle type, and service selected. You can see the estimated price before confirming your order.',
    },
    {
        question: 'How long does delivery take?',
        answer: 'Express Delivery takes a few hours, Standard Delivery takes 1-2 business days, and Inter City Delivery depends on the distance between cities.',
    },
    {
        question: 'Can I cancel my order?',
        answer: 'Yes, you can cancel your order before it is picked up. Once the driver has picked up your package, cancellation may not be possible.',
    },
    {
        question: 'What payment methods are accepted?',
        answer: 'We accept cash on delivery, credit/debit cards, and digital wallets. Payment options are shown during checkout.',
    },
    {
        question: 'How do I rent a vehicle?',
        answer: 'Go to the home screen, tap "Rent Vehicle", select your vehicle type and rental duration, choose a start date, and confirm your booking.',
    },
    {
        question: 'What if my package is damaged?',
        answer: 'If your package arrives damaged, please contact our support team immediately with photos of the damage. We will investigate and provide compensation if applicable.',
    },
    {
        question: 'Can I schedule a delivery for later?',
        answer: 'Yes, when creating a shipment, you can select a preferred pickup date and time for your convenience.',
    },
];

export default function FAQScreen() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>FAQ</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.pageTitle}>Frequently Asked Questions</Text>
                <Text style={styles.pageSubtitle}>Find answers to common questions about our delivery services</Text>

                {faqData.map((item, index) => (
                    <View key={index} style={styles.faqItem}>
                        <TouchableOpacity
                            style={styles.questionContainer}
                            onPress={() => toggleExpand(index)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.questionContent}>
                                <Ionicons
                                    name="help-circle-outline"
                                    size={20}
                                    color={Colors.light.primary}
                                    style={styles.questionIcon}
                                />
                                <Text style={styles.questionText}>{item.question}</Text>
                            </View>
                            <Ionicons
                                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                                size={20}
                                color={Colors.light.text}
                            />
                        </TouchableOpacity>

                        {expandedIndex === index && (
                            <View style={styles.answerContainer}>
                                <Text style={styles.answerText}>{item.answer}</Text>
                            </View>
                        )}
                    </View>
                ))}

                <View style={styles.contactSection}>
                    <Text style={styles.contactTitle}>Still have questions?</Text>
                    <Text style={styles.contactText}>Contact our support team for assistance</Text>
                    <TouchableOpacity style={styles.contactButton}>
                        <Ionicons name="chatbubble-outline" size={20} color="#fff" />
                        <Text style={styles.contactButtonText}>Contact Support</Text>
                    </TouchableOpacity>
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
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
    },
    faqItem: {
        backgroundColor: Colors.light.card,
        borderRadius: 12,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    questionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    questionIcon: {
        marginRight: 12,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
        flex: 1,
    },
    answerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 0,
    },
    answerText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        paddingLeft: 32,
    },
    contactSection: {
        marginTop: 24,
        padding: 20,
        backgroundColor: Colors.light.surface,
        borderRadius: 12,
        alignItems: 'center',
    },
    contactTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    contactText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
