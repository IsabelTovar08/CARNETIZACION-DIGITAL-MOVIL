import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AuthCard from '../AuthCard';
import { styles } from './highlightCard.styles';

export default function HighlightCard() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      {/* Tarjeta destacada */}
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Pendientes</Text>
          <Text style={styles.subtitle}>
            Disfruta de esta conferencia de trabajo en equipo
          </Text>

          <TouchableOpacity style={styles.cta} onPress={() => setShowInfo(true)}>
            <Text style={styles.ctaText}>Mas Información</Text>
          </TouchableOpacity>

          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <Image
          source={require('../../img/pendiente.png')}
          style={styles.illustration}
        />
      </View>

      {/* Modal con AuthCard: SOLO se cierra con la X del AuthCard */}
      <AuthCard
        visible={showInfo}
        onClose={() => setShowInfo(false)}
        logoSource={undefined}
      >
        <View style={styles.infoPanel}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.infoContent}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.fakeInput}>
              <Text style={styles.fakeInputText}>Disponible</Text>
            </View>

            <View style={styles.row2}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Hora</Text>
                <View style={styles.fakeInput}>
                  <Text style={styles.fakeInputText}>11:00 AM</Text>
                </View>
              </View>
              <View style={{ width: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Hora Fin</Text>
                <View style={styles.fakeInput}>
                  <Text style={styles.fakeInputText}>14:00 P.M.</Text>
                </View>
              </View>
            </View>

            <View style={styles.row2}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Fecha De Inicio</Text>
                <View style={styles.fakeInput}>
                  <Text style={styles.fakeInputText}>11/07/2025</Text>
                </View>
              </View>
              <View style={{ width: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Fecha Finalización</Text>
                <View style={styles.fakeInput}>
                  <Text style={styles.fakeInputText}>11/07/2025</Text>
                </View>
              </View>
            </View>

            <Text style={styles.label}>Descripción</Text>
            <View style={styles.descBox}>
              <Text style={styles.descText}>
                Evento sobre la importancia de la comunicación en el equipo
                aprovechando las herramientas tecnológicas necesaria
              </Text>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowInfo(false)}>
              <Text style={styles.primaryBtnText}>Participar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </AuthCard>
    </>
  );
}
