import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Check your email',
                'We have sent a password reset link to your email address.',
                [
                    {
                        text: 'Back to Login',
                        onPress: () => router.back(),
                    },
                ]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                        </TouchableOpacity>
                        <Text style={[GlobalStyles.title, { color: Colors.light.primary, marginTop: 20 }]}>Forgot Password?</Text>
                        <Text style={{ color: '#666', marginTop: 8 }}>Enter your email address to reset your password</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputIcon}>✉️</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[GlobalStyles.button, { backgroundColor: Colors.light.primary, marginTop: 20 }]}
                            onPress={handleResetPassword}
                            disabled={isLoading}
                        >
                            <Text style={GlobalStyles.buttonText}>{isLoading ? 'Sending Link...' : 'Send Reset Link'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        marginBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: 10,
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 60,
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
});
