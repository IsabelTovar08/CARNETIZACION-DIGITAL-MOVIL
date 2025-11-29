import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.80;   // Tamaño del carnet
export const CARD_HEIGHT = CARD_WIDTH * 1.6; // Proporción real 451 x 697
export const GAP = 16;

export const styles = StyleSheet.create({
  // ===== LAYOUT PRINCIPAL =====
  bg: {
    flex: 1,
    backgroundColor: '#eef3f8',
  },
  safe: {
    flex: 1,
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#eef3f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#333',
    fontSize: 16,
  },

  // ===== HEADER =====
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0b3b57',
  },
  subtitle: {
    textAlign: 'center',
    color: '#4b5563',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },

  // ===== CARRUSEL =====
  carouselWrap: {
    flex: 1,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // 📌 NUEVO — Contenedor que permite background SVG
  cardBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',  // Necesario para overlay
  },

  // 📌 NUEVO — SVG de fondo como background
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },

  // ===== FRONT SIDE - QR =====
  qrContainer: {
    position: 'absolute',
    top: 40,
    right: 25,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 8,
    zIndex: 2,
  },

  // ===== FRONT SIDE - FOTO =====
  photo: {
    position: 'absolute',
    top: 190,
    left: 30,
    width: 110,
    height: 130,
    borderRadius: 8,
    zIndex: 2,
  },

  // ===== FRONT SIDE - NOMBRE Y PERFIL =====
  nameContainer: {
    position: 'absolute',
    top: 180,
    left: 150,
    right: 25,
    zIndex: 2,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 23,
  },
  profile: {
    position: 'absolute',
    top: 130,      // ⬅ AJUSTA AQUÍ LA ALTURA DEBAJO DEL QR
    right: 30,
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    zIndex: 3,
  },

  area: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3,
  },

  // ===== FRONT SIDE - TELÉFONO =====
  phoneContainer: {
    position: 'absolute',
    top: 330,
    left: 35,
    zIndex: 2,
  },

  // ===== FRONT SIDE - RH =====
  rhContainer: {
    position: 'absolute',
    top: 320,
    right: 55,
    alignItems: 'center',
    zIndex: 2,
  },
  rhValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 3,
  },

  // ===== FRONT SIDE - CORREO =====
  emailContainer: {
    position: 'absolute',
    top: 390,
    left: 35,
    zIndex: 2,
  },

  // ===== FRONT SIDE - LABELS Y VALUES =====
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0b3b57',
  },
  value: {
    fontSize: 13,
    color: '#000',
    marginTop: 3,
  },

  // ===== FRONT SIDE - ID =====
  idContainer: {
    position: 'absolute',
    bottom: 35,
    left: 35,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  idLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  idValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1b66c9',
  },


  pdfText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  // ===== BACK SIDE - TÍTULO =====
  backTitleContainer: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  backTitleBox: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  backTitleText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 23,
  },

  // ===== BACK SIDE - GUÍA DE USO =====
  backGuide: {
    position: 'absolute',
    top: 175,
    left: 35,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0b3b57',
    zIndex: 2,
  },
  backBullet1: {
    position: 'absolute',
    top: 200,
    left: 35,
    right: 35,
    fontSize: 12,
    color: '#000',
    lineHeight: 17,
    zIndex: 2,
  },
  backBullet2: {
    position: 'absolute',
    top: 255,
    left: 35,
    right: 35,
    fontSize: 12,
    color: '#000',
    lineHeight: 17,
    zIndex: 2,
  },

  // ===== BACK SIDE - DIRECCIÓN =====
  backAddressContainer: {
    position: 'absolute',
    bottom: 55,
    left: 35,
    zIndex: 2,
  },

  // ===== BACK SIDE - CONTACTO =====
  backContactContainer: {
    position: 'absolute',
    bottom: 55,
    right: 35,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  backContactValue: {
    fontSize: 12,
    color: '#000',
    marginTop: 3,
    lineHeight: 16,
    textAlign: 'right',
  },

  // ===== BACK SIDE - LABELS Y VALUES =====
  backLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0b3b57',
  },
  backValue: {
    fontSize: 12,
    color: '#000',
    marginTop: 3,
    lineHeight: 16,
  },
  webviewBackground: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    zIndex: 0,
    backgroundColor: 'transparent',
    // Asegura que el SVG siempre se escale para llenar el fondo
    transform: [
      { scale: 1 },      // Ajusta el tamaño sin cortar
    ],

    // Evita recortes visuales
    overflow: 'visible',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },

  flipButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0b3b57',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  flipText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },

  externalButtonContainer: {
    width: CARD_WIDTH,
    alignSelf: 'center',
    marginTop: 10, // súbelo o bájalo aquí
    alignItems: 'center',
  },

  externalPdfButton: {
    backgroundColor: '#0b3b57',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  externalPdfText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  companyContainer: {
    position: 'absolute',
    top: 75,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
  },

  companyLogo: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'contain',
  },

  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',  // blanco para que se vea encima del fondo verde
    maxWidth: CARD_WIDTH * 0.3,
  },

/* ================================ */
/* 🔵 BOTÓN PDF EN HEADER          */
/* ================================ */
pdfButtonContainer: {
  width: "100%",
  alignItems: "flex-end",
  marginTop: 10,
  marginBottom: 5,
  paddingRight: 10,
  zIndex: 9999,
},

pdfButton: {
  backgroundColor: "#0284C7",     // azul elegante
  paddingVertical: 8,
  paddingHorizontal: 14,
  borderRadius: 8,

  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 5,
  shadowOffset: { width: 0, height: 2 },

  elevation: 4, // Android shadow
},

pdfButtonText: {
  color: "#FFF",
  fontSize: 14,
  fontWeight: "700",
},

});
