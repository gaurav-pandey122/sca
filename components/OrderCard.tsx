import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { GlobalStyles } from '../constants/Styles';

type OrderCardProps = {
    id: string;
    status: string;
    pickup: string;
    delivery: string;
    price: string;
    onPress: () => void;
};

export default function OrderCard({ id, status, pickup, delivery, price, onPress }: OrderCardProps) {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return Colors.light.primary;
            case 'delivered': return Colors.light.secondary;
            case 'cancelled': return Colors.light.danger;
            default: return '#666';
        }
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[GlobalStyles.card, styles.cardContainer]}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
            >
                <View style={[styles.header, { borderBottomColor: Colors.light.border }]}>
                    <Text style={styles.orderId}>Order #{id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) + '15' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(status) }]}>{status}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.locationRow}>
                        <View style={[styles.dot, { backgroundColor: Colors.light.primary }]} />
                        <Text style={styles.locationText} numberOfLines={1}>{pickup}</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.locationRow}>
                        <View style={[styles.dot, { backgroundColor: Colors.light.secondary }]} />
                        <Text style={styles.locationText} numberOfLines={1}>{delivery}</Text>
                    </View>
                </View>

                <View style={[styles.footer, { borderTopColor: Colors.light.border }]}>
                    <Text style={styles.price}>{price}</Text>
                    <Text style={styles.detailsLink}>View Details →</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
        marginBottom: 16,
    },
    orderId: {
        fontWeight: '700',
        fontSize: 17,
        color: Colors.light.text,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    content: {
        marginBottom: 16,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    line: {
        width: 2,
        height: 12,
        backgroundColor: '#ddd',
        marginLeft: 3,
        marginVertical: 2,
    },
    locationText: {
        flex: 1,
        fontSize: 14,
        color: '#444',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
    },
    price: {
        fontWeight: '800',
        fontSize: 18,
        color: Colors.light.text,
    },
    detailsLink: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
    },
});
