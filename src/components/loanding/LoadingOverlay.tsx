import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import { loadingService } from '../../services/loanding/LoadingService';

export const LoadingOverlay: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = loadingService.subscribe(setVisible);
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.backdrop}>
                <View style={styles.box}>
                    <ActivityIndicator size="large" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', alignItems: 'center', justifyContent: 'center' },
    box: { backgroundColor: '#fff', padding: 18, borderRadius: 12, minWidth: 100, alignItems: 'center' },
});
