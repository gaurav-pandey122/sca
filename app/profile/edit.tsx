import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { GlobalStyles } from '../../constants/Styles';

export default function EditProfileScreen() {
    const [name, setName] = useState('Gaurav');
    const [email, setEmail] = useState('gaurav@example.com');
    const [phone, setPhone] = useState('+977 9800000000');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = () => {
        // Validate inputs
        if (!name.trim()) {
            Alert.alert('Error', 'Name is required');
            return;
        }

        if (!email.trim()) {
            Alert.alert('Error', 'Email is required');
            return;
        }

        // Save profile (mocked for now)
        Alert.alert('Success', 'Profile updated successfully', [
            {
                text: 'OK',
                onPress: () => router.back(),
            },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24, color: Colors.light.text }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.avatar}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.avatarImage} />
                            ) : (
                                <Text style={styles.avatarText}>G</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
                        <Text style={styles.changePhotoText}>Change Photo</Text>
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, styles.disabledInput]}
                        placeholder="Phone number"
                        value={phone}
                        editable={false}
                    />
                    <Text style={styles.helperText}>Phone number cannot be changed</Text>
                </View>
            </ScrollView>

            {/* Save Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[GlobalStyles.button, { backgroundColor: Colors.light.primary }]}
                    onPress={handleSave}
                >
                    <Text style={GlobalStyles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
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
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changePhotoButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    changePhotoText: {
        fontSize: 14,
        color: Colors.light.primary,
        fontWeight: '600',
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 16,
        backgroundColor: Colors.light.surface,
        color: Colors.light.text,
    },
    disabledInput: {
        backgroundColor: '#F3F4F6',
        color: '#999',
    },
    helperText: {
        fontSize: 12,
        color: '#999',
        marginTop: -12,
        marginBottom: 16,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
    },
});
