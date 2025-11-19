import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
