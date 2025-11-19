import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading } = useAuth();

    const handleLogin = () => {
        if (email && password) {
            signIn(email, password);
        } else {
            alert('Please enter email and password');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/images/singon-logo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to continue your delivery journey</Text>
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

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputIcon}>🔒</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholderTextColor="#999"
                                />
                            </View>
                            <Link href="/(auth)/forgot-password" asChild>
                                <TouchableOpacity style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                        <TouchableOpacity
                            style={[GlobalStyles.button, styles.loginButton]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text style={GlobalStyles.buttonText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
                        </TouchableOpacity>


                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <Link href="/(auth)/signup" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.signupText}>Sign Up</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 80,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: Colors.light.primary,
        height: 60,
        borderRadius: 16,
        marginTop: 12,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.light.border,
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#999',
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    socialButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.light.surface,
        borderWidth: 1,
        borderColor: Colors.light.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#666',
        fontSize: 16,
    },
    signupText: {
        color: Colors.light.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
