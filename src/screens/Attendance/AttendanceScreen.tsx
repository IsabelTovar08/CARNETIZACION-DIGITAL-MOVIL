/// <summary>
/// Pantalla que lista la asistencia agrupada por nombre de evento.
/// Por defecto consulta automáticamente al ingresar.
/// Si un registro no tiene eventName, se le asigna "Evento N".
/// Muestra también el punto de acceso de entrada y salida.
/// </summary>

import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Pressable,
    ImageBackground,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { styles } from "./AttendanceScreen.styles";
import { AttendanceDto, AttendanceService } from "../../services/http/attendance/AttendanceService";
import { ApiService } from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

type BasicOption = { id: number; label: string };

export default function AttendanceScreen() {
    const [attendances, setAttendances] = useState<AttendanceDto[]>([]);
    const [loading, setLoading] = useState(true);

    const [persons, setPersons] = useState<BasicOption[]>([]);
    const [events, setEvents] = useState<BasicOption[]>([]);
    const [loadingPersons, setLoadingPersons] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);

    const [personId, setPersonId] = useState<number | undefined>();
    const [eventId, setEventId] = useState<number | undefined>();
    const [fromDate, setFromDate] = useState<Date | undefined>();
    const [toDate, setToDate] = useState<Date | undefined>();

    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);
    const [showPersonModal, setShowPersonModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);

    const attendanceService = new AttendanceService<any, AttendanceDto>();
    const personService = new ApiService("Person");
    const eventService = new ApiService("Event");

    const BG_IMAGE = require('../../img/fondo-azul.png'); 


    /// <summary>
    /// Consulta inicial agrupada por evento.
    /// </summary>
    useEffect(() => {
        fetchAttendances();
    }, []);

    /// <summary>
    /// Obtiene las asistencias según filtros.
    /// </summary>
    const fetchAttendances = async () => {
        setLoading(true);
        try {
            const params: any = {
                sortBy: "TimeOfEntry",
                sortDir: "DESC",
                page: 1,
                pageSize: 100,
            };

            if (personId) params.personId = personId;
            if (eventId) params.eventId = eventId;
            if (fromDate) params.fromUtc = fromDate.toISOString();
            if (toDate) params.toUtc = toDate.toISOString();

            const response = await attendanceService.searchAttendances(params);
            const items = response?.items ?? [];

            // Agrega nombre de evento por defecto si no tiene
            const fixed = items.map((a: AttendanceDto, i: number) => ({
                ...a,
                eventName: a.eventName || `Evento ${i + 1}`,
            }));

            setAttendances(fixed);
        } catch (error) {
            console.error("Error al obtener asistencias:", error);
            setAttendances([]);
        } finally {
            setLoading(false);
        }
    };

    /// <summary>
    /// Agrupa por evento.
    /// </summary>
    const groupedByEvent = useMemo(() => {
        const groups: Record<string, AttendanceDto[]> = {};
        attendances.forEach((a) => {
            const key = a.eventName || "Sin evento";
            (groups[key] ||= []).push(a);
        });
        return Object.entries(groups);
    }, [attendances]);

    /// <summary>
    /// Lazy load modales de personas/eventos.
    /// </summary>
    const openPersonModal = async () => {
        setShowPersonModal(true);
        if (persons.length > 0 || loadingPersons) return;
        setLoadingPersons(true);
        try {
            const res = await personService.getAll();
            if (res?.success && Array.isArray(res.data)) {
                const mapped: BasicOption[] = res.data.map((p: any) => ({
                    id: p.id,
                    label:
                        (p.fullName?.trim?.() ||
                            `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim()) || "Sin nombre",
                }));
                setPersons(mapped);
            }
        } catch (e) {
            console.error("Error cargando personas:", e);
        } finally {
            setLoadingPersons(false);
        }
    };

    const openEventModal = async () => {
        setShowEventModal(true);
        if (events.length > 0 || loadingEvents) return;
        setLoadingEvents(true);
        try {
            const res = await eventService.getAll();
            if (res?.success && Array.isArray(res.data)) {
                const mapped: BasicOption[] = res.data.map((e: any) => ({
                    id: e.id,
                    label: e.name ?? "Sin nombre",
                }));
                setEvents(mapped);
            }
        } catch (e) {
            console.error("Error cargando eventos:", e);
        } finally {
            setLoadingEvents(false);
        }
    };

    /// <summary>
    /// Renderiza cada grupo de evento y sus asistencias.
    /// </summary>
    const renderEventSection = ({ item }: { item: [string, AttendanceDto[]] }) => {
        const [eventName, list] = item;
        return (
            <View style={styles.eventSection}>
                <Text style={styles.eventHeader}>{eventName}</Text>
                {list.map((att) => (
                    <View key={att.id} style={styles.card}>
                        <Text style={styles.personName}>{att.personFullName}</Text>

                        {/* Entrada */}
                        <View style={styles.timeRow}>
                            <Text style={styles.time}>
                                Entrada: {new Date(att.timeOfEntry).toLocaleString()}
                            </Text>
                            {att.accessPointOfEntryName && (
                                <View style={styles.accessChip}>
                                    <Text style={styles.accessChipText}>{att.accessPointOfEntryName}</Text>
                                </View>
                            )}
                        </View>

                        {/* Salida */}
                        {!!att.timeOfExit && (
                            <View style={styles.timeRow}>
                                <Text style={styles.time}>
                                    Salida: {new Date(att.timeOfExit).toLocaleString()}
                                </Text>
                                {att.accessPointOfExitName && (
                                    <View style={styles.accessChip}>
                                        <Text style={styles.accessChipText}>{att.accessPointOfExitName}</Text>
                                    </View>
                                )}
                            </View>
                        )}

                    </View>
                ))}
            </View>
        );
    };

    /// <summary>
    /// Handlers de fechas.
    /// </summary>
    const onChangeFrom = (_: DateTimePickerEvent, date?: Date) => {
        setShowFromPicker(false);
        if (date) setFromDate(date);
    };
    const onChangeTo = (_: DateTimePickerEvent, date?: Date) => {
        setShowToPicker(false);
        if (date) setToDate(date);
    };

    /// <summary>
    /// Selección de persona/evento.
    /// </summary>
    const handleSelectPerson = (id?: number) => {
        setPersonId(id);
        setShowPersonModal(false);
    };
    const handleSelectEvent = (id?: number) => {
        setEventId(id);
        setShowEventModal(false);
    };

    return (
        <ImageBackground source={BG_IMAGE} style={styles.background} resizeMode="cover">

            <View style={styles.container}>

                <Text style={styles.title}>Registro de Asistencia</Text>

                {/*  Filtros */}
                <View style={styles.filterContainer}>
                <Text style={styles.filterTitle}>Filtros de búsqueda</Text>

                {/* Persona / Evento */}
                <View style={styles.filterRow}>
                    <TouchableOpacity style={styles.filterInput} onPress={openPersonModal}>
                    <View style={styles.filterHeader}>
                        <Ionicons name="person-outline" size={16} color="#64748B" />
                        <Text style={styles.filterPlaceholder}>Persona</Text>
                    </View>
                    <Text style={styles.filterValue}>
                        {personId
                        ? persons.find((x) => x.id === personId)?.label ?? "Seleccionada"
                        : "Seleccionar"}
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterInput} onPress={openEventModal}>
                    <View style={styles.filterHeader}>
                        <Ionicons name="calendar-outline" size={16} color="#64748B" />
                        <Text style={styles.filterPlaceholder}>Evento</Text>
                    </View>
                    <Text style={styles.filterValue}>
                        {eventId
                        ? events.find((x) => x.id === eventId)?.label ?? "Seleccionado"
                        : "Seleccionar"}
                    </Text>
                    </TouchableOpacity>
                </View>

                {/* Fechas */}
                <View style={styles.filterRow}>
                    <TouchableOpacity style={styles.filterInput} onPress={() => setShowFromPicker(true)}>
                    <View style={styles.filterHeader}>
                        <Ionicons name="time-outline" size={16} color="#64748B" />
                        <Text style={styles.filterPlaceholder}>Desde</Text>
                    </View>
                    <Text style={styles.filterValue}>
                        {fromDate ? fromDate.toLocaleDateString() : "Seleccionar"}
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.filterInput} onPress={() => setShowToPicker(true)}>
                    <View style={styles.filterHeader}>
                        <Ionicons name="hourglass-outline" size={16} color="#64748B" />
                        <Text style={styles.filterPlaceholder}>Hasta</Text>
                    </View>
                    <Text style={styles.filterValue}>
                        {toDate ? toDate.toLocaleDateString() : "Seleccionar"}
                    </Text>
                    </TouchableOpacity>
                </View>

                {/* Date pickers invisibles */}
                {showFromPicker && (
                    <DateTimePicker
                    value={fromDate || new Date()}
                    mode="date"
                    onChange={(_: any, date?: Date) => {
                        setShowFromPicker(false);
                        if (date) setFromDate(date);
                    }}
                    />
                )}
                {showToPicker && (
                    <DateTimePicker
                    value={toDate || new Date()}
                    mode="date"
                    onChange={(_: any, date?: Date) => {
                        setShowToPicker(false);
                        if (date) setToDate(date);
                    }}
                    />
                )}

                {/* Botón Buscar */}
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={fetchAttendances}
                    disabled={loading}
                >
                    <Ionicons name="search-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>
                </View>


                {/* 📋 Lista agrupada */}
                {loading ? (
                    <ActivityIndicator size="large" color="#007BFF" />
                ) : groupedByEvent.length === 0 ? (
                    <Text style={styles.noData}>No hay registros disponibles.</Text>
                ) : (
                    <FlatList
                        data={groupedByEvent}
                        keyExtractor={(i) => i[0]}
                        renderItem={renderEventSection}
                        contentContainerStyle={styles.list}
                    />
                )}

                {/* Modales de selección (personas/eventos) */}
                <Modal visible={showPersonModal} transparent animationType="fade">
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Seleccionar Persona</Text>
                            {loadingPersons ? (
                                <ActivityIndicator style={{ marginVertical: 12 }} />
                            ) : (
                                <>
                                    <Pressable style={styles.option} onPress={() => handleSelectPerson(undefined)}>
                                        <Text style={styles.optionText}>Todas</Text>
                                    </Pressable>
                                    <FlatList
                                        data={persons}
                                        keyExtractor={(i) => i.id.toString()}
                                        renderItem={({ item }) => (
                                            <Pressable style={styles.option} onPress={() => handleSelectPerson(item.id)}>
                                                <Text style={styles.optionText}>{item.label}</Text>
                                            </Pressable>
                                        )}
                                    />
                                </>
                            )}
                            <TouchableOpacity style={styles.modalClose} onPress={() => setShowPersonModal(false)}>
                                <Text style={styles.modalCloseText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal visible={showEventModal} transparent animationType="fade">
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Seleccionar Evento</Text>
                            {loadingEvents ? (
                                <ActivityIndicator style={{ marginVertical: 12 }} />
                            ) : (
                                <>
                                    <Pressable style={styles.option} onPress={() => handleSelectEvent(undefined)}>
                                        <Text style={styles.optionText}>Todos</Text>
                                    </Pressable>
                                    <FlatList
                                        data={events}
                                        keyExtractor={(i) => i.id.toString()}
                                        renderItem={({ item }) => (
                                            <Pressable style={styles.option} onPress={() => handleSelectEvent(item.id)}>
                                                <Text style={styles.optionText}>{item.label}</Text>
                                            </Pressable>
                                        )}
                                    />
                                </>
                            )}
                            <TouchableOpacity style={styles.modalClose} onPress={() => setShowEventModal(false)}>
                                <Text style={styles.modalCloseText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
}
