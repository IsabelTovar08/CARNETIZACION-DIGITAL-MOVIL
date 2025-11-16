import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.88;
export const CARD_HEIGHT = CARD_WIDTH / 1.586;
export const GAP = 16;

export const styles = StyleSheet.create({
  // ===== LAYOUT PRINCIPAL =====
  bg: {
    flex: 1,
    backgroundColor: '#eef3f8',
  },
  safe: {
    flex: 1,
    paddingTop: 60,
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
  cardBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // ===== FRONT SIDE - QR =====
  qrContainer: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 8,
  },

  // ===== FRONT SIDE - FOTO =====
  photo: {
    position: 'absolute',
    top: 110,
    left: 30,
    width: 100,
    height: 100,
    borderRadius: 8,
  },

  // ===== FRONT SIDE - NOMBRE Y PERFIL =====
  nameContainer: {
    position: 'absolute',
    top: 115,
    left: 145,
    right: 25,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 23,
  },
  profile: {
    fontSize: 14,
    color: '#374151',
    marginTop: 3,
    lineHeight: 17,
  },
  area: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 3,
  },

  // ===== FRONT SIDE - TELÉFONO =====
  phoneContainer: {
    position: 'absolute',
    top: 235,
    left: 35,
  },

  // ===== FRONT SIDE - RH =====
  rhContainer: {
    position: 'absolute',
    top: 235,
    right: 55,
    alignItems: 'center',
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
    top: 290,
    left: 35,
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

  // ===== FRONT SIDE - BOTÓN PDF =====
  pdfButton: {
    position: 'absolute',
    bottom: 28,
    right: 35,
    backgroundColor: '#0b3b57',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
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
  },
  backBullet1: {
    position: 'absolute',
    top: 200,
    left: 35,
    right: 35,
    fontSize: 12,
    color: '#000',
    lineHeight: 17,
  },
  backBullet2: {
    position: 'absolute',
    top: 255,
    left: 35,
    right: 35,
    fontSize: 12,
    color: '#000',
    lineHeight: 17,
  },

  // ===== BACK SIDE - DIRECCIÓN =====
  backAddressContainer: {
    position: 'absolute',
    bottom: 55,
    left: 35,
  },

  // ===== BACK SIDE - CONTACTO =====
  backContactContainer: {
    position: 'absolute',
    bottom: 55,
    right: 35,
    alignItems: 'flex-end',
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
});