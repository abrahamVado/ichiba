import 'package:flutter/material.dart';

//1.- DemoRider representa un conductor autenticado en las pantallas.
class DemoRider {
  const DemoRider({required this.name, required this.email});

  final String name;
  final String email;
}

//2.- DemoDashboardMetrics resume cifras empleadas por el tablero.
class DemoDashboardMetrics {
  const DemoDashboardMetrics({
    required this.bankName,
    required this.completedTrips,
    required this.totalEarnings,
    required this.averageFare,
    required this.evaluationScore,
    required this.acceptanceRate,
  });

  final String bankName;
  final int completedTrips;
  final double totalEarnings;
  final double averageFare;
  final double evaluationScore;
  final double acceptanceRate;
}

//3.- DemoTrip agrupa la información principal de un viaje en progreso.
class DemoTrip {
  const DemoTrip({
    required this.passengerName,
    required this.status,
    required this.pickupAddress,
    required this.dropoffAddress,
    required this.amount,
    required this.durationMinutes,
    required this.distanceKm,
    required this.vehicleModel,
    required this.vehiclePlate,
    required this.driverName,
    required this.driverRating,
    required this.driverExperienceYears,
    required this.driverPhone,
  });

  final String passengerName;
  final String status;
  final String pickupAddress;
  final String dropoffAddress;
  final double amount;
  final int durationMinutes;
  final double distanceKm;
  final String vehicleModel;
  final String vehiclePlate;
  final String driverName;
  final double driverRating;
  final int driverExperienceYears;
  final String driverPhone;
}

//4.- DemoTravelHistoryEntry simula un viaje finalizado para las listas históricas.
class DemoTravelHistoryEntry {
  const DemoTravelHistoryEntry({
    required this.id,
    required this.date,
    required this.origin,
    required this.destination,
    required this.durationMinutes,
    required this.distanceKm,
    required this.fare,
    required this.paymentMethod,
  });

  final String id;
  final DateTime date;
  final String origin;
  final String destination;
  final int durationMinutes;
  final double distanceKm;
  final double fare;
  final String paymentMethod;
}

//5.- DemoReservation almacena la información ingresada desde la agenda.
class DemoReservation {
  const DemoReservation({
    required this.passenger,
    required this.pickup,
    required this.dropoff,
    required this.dateTime,
  });

  final String passenger;
  final String pickup;
  final String dropoff;
  final DateTime dateTime;
}

//6.- DemoFolioEntry describe un reporte de incidente creado desde el mapa.
class DemoFolioEntry {
  const DemoFolioEntry({
    required this.id,
    required this.type,
    required this.status,
    required this.timestamp,
    required this.latitude,
    required this.longitude,
    this.notes,
  });

  final String id;
  final String type;
  final String status;
  final DateTime timestamp;
  final double latitude;
  final double longitude;
  final String? notes;
}

//7.- DemoReportType centraliza la etiqueta y emoji de cada incidente.
class DemoReportType {
  const DemoReportType({
    required this.id,
    required this.name,
    required this.emoji,
  });

  final String id;
  final String name;
  final String emoji;
}

//8.- demoRider expone un conductor estático para conectar todas las vistas.
const demoRider = DemoRider(
  name: 'María López',
  email: 'maria.lopez@example.com',
);

//9.- demoMetrics sintetiza cifras coherentes con un día activo de viajes.
const demoMetrics = DemoDashboardMetrics(
  bankName: 'Banco Andariego',
  completedTrips: 24,
  totalEarnings: 3450.75,
  averageFare: 143.78,
  evaluationScore: 4.8,
  acceptanceRate: 92.4,
);

//10.- demoCurrentTrip representa un servicio actualmente aceptado.
const demoCurrentTrip = DemoTrip(
  passengerName: 'Luis Hernández',
  status: 'En camino al destino',
  pickupAddress: 'Av. Reforma 123, CDMX',
  dropoffAddress: 'Insurgentes Sur 890, CDMX',
  amount: 185.50,
  durationMinutes: 22,
  distanceKm: 9.4,
  vehicleModel: 'Nissan Versa 2021',
  vehiclePlate: 'ABC-123-CDMX',
  driverName: 'María López',
  driverRating: 4.9,
  driverExperienceYears: 5,
  driverPhone: '+52 55 4000 0000',
);

//11.- demoHistory agrupa viajes pasados para alimentar la sección histórica.
final List<DemoTravelHistoryEntry> demoHistory = List.generate(
  12,
  (index) {
    final date = DateTime.now().subtract(Duration(days: index * 3));
    return DemoTravelHistoryEntry(
      id: 'HX-${1000 + index}',
      date: date,
      origin: 'Colonia Centro ${index + 1}',
      destination: 'Terminal Norte ${index + 1}',
      durationMinutes: 18 + index,
      distanceKm: 7.5 + index * 0.6,
      fare: 120 + index * 6.5,
      paymentMethod: index.isEven ? 'Tarjeta' : 'Efectivo',
    );
  },
);

//12.- demoFolios simula reportes registrados previamente en el mapa.
final List<DemoFolioEntry> demoFolios = [
  DemoFolioEntry(
    id: 'F-8421',
    type: 'Bache',
    status: 'En proceso',
    timestamp: DateTime.now().subtract(const Duration(hours: 5)),
    latitude: 19.4326,
    longitude: -99.1332,
    notes: 'Bache profundo junto al carril derecho.',
  ),
  DemoFolioEntry(
    id: 'F-8422',
    type: 'Alumbrado',
    status: 'Pendiente',
    timestamp: DateTime.now().subtract(const Duration(days: 1, hours: 3)),
    latitude: 19.428,
    longitude: -99.12,
    notes: 'Farola apagada desde hace una semana.',
  ),
  DemoFolioEntry(
    id: 'F-8423',
    type: 'Basura',
    status: 'Resuelto',
    timestamp: DateTime.now().subtract(const Duration(days: 2, hours: 6)),
    latitude: 19.44,
    longitude: -99.14,
    notes: 'Acumulación de bolsas frente al parque.',
  ),
];

//13.- demoReportTypes contiene el catálogo base mostrado en el selector flotante.
const List<DemoReportType> demoReportTypes = [
  DemoReportType(id: 'pothole', name: 'Bache', emoji: '🕳️'),
  DemoReportType(id: 'light', name: 'Alumbrado', emoji: '💡'),
  DemoReportType(id: 'trash', name: 'Basura', emoji: '🗑️'),
  DemoReportType(id: 'water', name: 'Fuga de agua', emoji: '💧'),
];

//14.- formatCurrency simplifica el formato MXN usado por varias vistas.
String formatCurrency(double amount) => 'MXN ${amount.toStringAsFixed(2)}';

//15.- formatDate compone una fecha amigable reutilizada en varias tarjetas.
String formatDate(DateTime dateTime) {
  final day = dateTime.day.toString().padLeft(2, '0');
  final month = dateTime.month.toString().padLeft(2, '0');
  final year = dateTime.year;
  return '$day/$month/$year';
}

//16.- formatDateTime incluye hora y minuto para mensajes con más detalle.
String formatDateTime(DateTime dateTime) {
  final date = formatDate(dateTime);
  final hour = dateTime.hour.toString().padLeft(2, '0');
  final minute = dateTime.minute.toString().padLeft(2, '0');
  return '$date $hour:$minute';
}

//17.- travelHistoryVehicleEmojis sustituye miniaturas con íconos temáticos.
const List<IconData> travelHistoryVehicleEmojis = [
  Icons.directions_car,
  Icons.local_taxi,
  Icons.electric_car,
  Icons.two_wheeler,
];
