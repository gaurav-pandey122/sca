import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCard from '../../components/OrderCard';
import { Colors } from '../../constants/Colors';

export default function DashboardScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [orderId, setOrderId] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleTrackOrder = () => {
    if (orderId.trim()) {
      router.push(`/tracking/${orderId}`);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {/* Header with User Avatar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileSection}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>G</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>Gaurav</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setShowNotifications(true)}
        >
          <Ionicons name="notifications-outline" size={26} color={Colors.light.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Quick Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#EEF2FF' }]}
              onPress={() => router.push('/shipment/create')}
            >
              <Text style={styles.actionIcon}>📦</Text>
              <Text style={[styles.actionText, { color: Colors.light.text }]}>Express Delivery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#F0FDF4' }]}
              onPress={() => router.push('/shipment/standard')}
            >
              <Text style={styles.actionIcon}>🚛</Text>
              <Text style={[styles.actionText, { color: Colors.light.text }]}>Standard Delivery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#F0FDF4' }]}
              onPress={() => router.push('/shipment/intercity')}
            >
              <Text style={styles.actionIcon}>🏙️</Text>
              <Text style={[styles.actionText, { color: Colors.light.text }]}>Inter City</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#FFFBEB' }]}
              onPress={() => router.push('/shipment/moving')}
            >
              <Text style={styles.actionIcon}>🏠</Text>
              <Text style={[styles.actionText, { color: Colors.light.text }]}>Home Moving</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#EFF6FF' }]}
              onPress={() => router.push('/shipment/rent')}
            >
              <Text style={styles.actionIcon}>🚚</Text>
              <Text style={[styles.actionText, { color: Colors.light.text }]}>Rent Vehicle</Text>
            </TouchableOpacity>

          </View>

          {/* Promotional Banner */}
          <TouchableOpacity style={styles.promoBanner}>
            <View style={styles.promoLeft}>
              <Text style={styles.promoEmoji}>🚀</Text>
              <View style={styles.promoTextContainer}>
                <Text style={styles.promoTitle}>Fast & Reliable Delivery</Text>
                <Text style={styles.promoSubtitle}>Same-day delivery available</Text>
              </View>
            </View>
            <View style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Learn More</Text>
            </View>
          </TouchableOpacity>

          {/* Track Order Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Track Your Order</Text>
            <View style={styles.trackContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>📦</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Order ID"
                  value={orderId}
                  onChangeText={setOrderId}
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                style={styles.trackButton}
                onPress={handleTrackOrder}
              >
                <Text style={styles.trackButtonText}>Track</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ads Banner */}
          <TouchableOpacity style={styles.adsBanner}>
            <View style={styles.adsContent}>
              <Text style={styles.adsTitle}>🎉 Special Offer!</Text>
              <Text style={styles.adsSubtitle}>Get 20% off on your next delivery</Text>
            </View>
            <Text style={styles.adsAction}>Claim Now →</Text>
          </TouchableOpacity>

          {/* Active Orders */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Orders</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>

            <OrderCard
              id="88291"
              type="Express Delivery"
              status="Active"
              pickup="123 Main St, New York"
              delivery="456 Park Ave, New York"
              price="Rs. 1,500"
              onPress={() => router.push(`/tracking/88291?type=${encodeURIComponent('Express Delivery')}`)}
            />
          </View>


        </ScrollView>
      </Animated.View>

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNotifications(false)}
        >
          <TouchableOpacity
            style={styles.notificationsPanel}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.notificationsHeader}>
              <Text style={styles.notificationsTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Ionicons name="close" size={24} color={Colors.light.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.notificationsList}>
              <TouchableOpacity style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons name="cube" size={20} color={Colors.light.primary} />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationText}>Your order #88291 is out for delivery</Text>
                  <Text style={styles.notificationTime}>2 hours ago</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationText}>Order #88280 has been delivered</Text>
                  <Text style={styles.notificationTime}>1 day ago</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.notificationItem}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons name="pricetag" size={20} color="#F59E0B" />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationText}>Special offer: 20% off on your next delivery!</Text>
                  <Text style={styles.notificationTime}>2 days ago</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  avatarContainer: {
    padding: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 12,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  seeAll: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  trackContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  inputWrapper: {
    flex: 1,
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
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  trackButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  adsBanner: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDBA74',
  },
  adsContent: {
    flex: 1,
  },
  adsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 4,
  },
  adsSubtitle: {
    fontSize: 14,
    color: '#9A3412',
  },
  adsAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EA580C',
  },
  promoBanner: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  promoEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  promoSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
  promoButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  promoButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  notificationsPanel: {
    backgroundColor: Colors.light.background,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  notificationsList: {
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
