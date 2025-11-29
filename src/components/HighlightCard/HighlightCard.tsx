import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AuthCard from "../AuthCard";
import { styles } from "./highlightCard.styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const IMG_FALLBACK = require("../../img/ia.png");

interface Props {
  events: any[];
}

export default function HighlightCard({ events }: Props) {
  const [showInfo, setShowInfo] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const openEvent = (ev: any) => {
    setSelected(ev);
    setShowInfo(true);
  };

  // Si no hay eventos próximos → card vacía
  if (!events || events.length === 0) {
    return (
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Sin eventos próximos</Text>
          <Text style={styles.subtitle}>
            Cuando haya un evento futuro se mostrará aquí.
          </Text>
        </View>

        <Image source={IMG_FALLBACK} style={styles.illustration} />
      </View>
    );
  }

  const nextEvent = events[0];

  return (
    <>
      {/* CARD PRINCIPAL */}
      <View style={styles.card}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Próximos eventos</Text>
          <Text style={styles.subtitle}>{nextEvent.name}</Text>

          <TouchableOpacity
            style={styles.cta}
            onPress={() => openEvent(nextEvent)}
          >
            <Text style={styles.ctaText}>Ver detalles</Text>
          </TouchableOpacity>

          <View style={styles.dots}>
            {events.slice(0, 3).map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === 0 && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: "#F3E8FF",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Ionicons name="calendar" size={40} color="#23466EFF" />
        </View>


      </View>

      {/* MODAL DETALLE */}
      <AuthCard visible={showInfo} onClose={() => setShowInfo(false)}>
        {!!selected && (
          <View style={styles.infoPanel}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.infoContent}
            >
              <Text style={styles.label}>Evento</Text>
              <View style={styles.fakeInput}>
                <Text style={styles.fakeInputText}>{selected.name}</Text>
              </View>

              <Text style={styles.label}>Fecha</Text>
              <View style={styles.fakeInput}>
                <Text style={styles.fakeInputText}>
                  {new Date(selected.eventStart).toLocaleDateString()}
                </Text>
              </View>

              <View style={styles.row2}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Hora inicio</Text>
                  <View style={styles.fakeInput}>
                    <Text style={styles.fakeInputText}>
                      {new Date(selected.eventStart).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>

                <View style={{ width: 12 }} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Hora fin</Text>
                  <View style={styles.fakeInput}>
                    <Text style={styles.fakeInputText}>
                      {new Date(selected.eventEnd).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.label}>Descripción</Text>
              <View style={styles.descBox}>
                <Text style={styles.descText}>
                  {selected.description || "Sin descripción disponible."}
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </AuthCard>
    </>
  );
}
