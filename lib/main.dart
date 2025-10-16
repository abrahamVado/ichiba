import 'package:flutter/material.dart';

import 'screens/auth/login_screen.dart';
import 'screens/consult_screen.dart';
import 'screens/dashboard/bank/bank_information_screen.dart';
import 'screens/dashboard/dashboard_screen.dart';
import 'screens/dashboard/panic/panic_button_screen.dart';
import 'screens/dashboard/profile/rider_profile_screen.dart';
import 'screens/dashboard/reservations/reservation_screen.dart';
import 'screens/dashboard/support/contact_us_screen.dart';
import 'screens/dashboard/trip/current_trip_details_screen.dart';
import 'screens/dashboard/trip/driver_profile_screen.dart';
import 'screens/dashboard/travel/travel_history_screen.dart';
import 'screens/map_report_screen.dart';
import 'screens/ride_creation/auction_screen.dart';
import 'screens/ride_creation/ride_map_screen.dart';
import 'screens/ride_creation/route_selection_screen.dart';
import 'screens/shared/demo_data.dart';

void main() {
  runApp(const IchibaApp());
}

//1.- IchibaApp configura el MaterialApp y delega en el catálogo de pantallas.
class IchibaApp extends StatelessWidget {
  const IchibaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ichiba Screens',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
      ),
      home: const ScreenCatalog(),
    );
  }
}

//2.- ScreenCatalog lista accesos directos a cada pantalla implementada.
class ScreenCatalog extends StatelessWidget {
  const ScreenCatalog({super.key});

  @override
  Widget build(BuildContext context) {
    final entries = _buildEntries();
    return Scaffold(
      appBar: AppBar(title: const Text('Catálogo de pantallas')), 
      body: ListView.separated(
        padding: const EdgeInsets.all(24),
        itemCount: entries.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final entry = entries[index];
          return ListTile(
            tileColor: Theme.of(context).colorScheme.surfaceVariant,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            title: Text(entry.title),
            subtitle: Text(entry.description),
            trailing: const Icon(Icons.arrow_forward_ios),
            onTap: () => Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => entry.builder()),
            ),
          );
        },
      ),
    );
  }

  //3.- _buildEntries centraliza los enlaces con títulos y descripciones útiles.
  List<_ScreenEntry> _buildEntries() {
    return [
      _ScreenEntry(
        title: 'Login',
        description: 'Flujo simplificado de acceso demo.',
        builder: () => const LoginScreen(),
      ),
      _ScreenEntry(
        title: 'Dashboard',
        description: 'Panel con métricas, viaje actual y accesos.',
        builder: () => const DashboardScreen(),
      ),
      _ScreenEntry(
        title: 'Historial de viajes',
        description: 'Listado paginado con viajes completados.',
        builder: () => const TravelHistoryScreen(),
      ),
      _ScreenEntry(
        title: 'Perfil del rider',
        description: 'Formulario editable con validaciones básicas.',
        builder: () => const RiderProfileScreen(),
      ),
      _ScreenEntry(
        title: 'Información bancaria',
        description: 'Formulario para capturar datos de depósito.',
        builder: () => const BankInformationScreen(),
      ),
      _ScreenEntry(
        title: 'Reservas',
        description: 'Agenda de viajes programados con selección de fecha.',
        builder: () => const ReservationScreen(),
      ),
      _ScreenEntry(
        title: 'Botón de pánico',
        description: 'Protocolo de confirmación para alertas.',
        builder: () => PanicButtonScreen(trip: demoCurrentTrip),
      ),
      _ScreenEntry(
        title: 'Perfil del conductor',
        description: 'Resumen de datos del viaje en curso.',
        builder: () => DriverProfileScreen(trip: demoCurrentTrip),
      ),
      _ScreenEntry(
        title: 'Detalles del viaje',
        description: 'Información extendida del servicio aceptado.',
        builder: () => CurrentTripDetailsScreen(trip: demoCurrentTrip),
      ),
      _ScreenEntry(
        title: 'Soporte',
        description: 'Listado de canales de contacto disponibles.',
        builder: () => const ContactUsScreen(),
      ),
      _ScreenEntry(
        title: 'Subasta de viaje',
        description: 'Simulación de ofertas y conteo regresivo.',
        builder: () => const AuctionScreen(),
      ),
      _ScreenEntry(
        title: 'Selección de ruta',
        description: 'Formulario con mapa ilustrativo y estimaciones.',
        builder: () => const RouteSelectionScreen(),
      ),
      _ScreenEntry(
        title: 'Mapa del recorrido',
        description: 'Visualización estática con pasos sugeridos.',
        builder: () => RideMapScreen(
          origin: 'Parque México, CDMX',
          destination: 'Aeropuerto AICM, CDMX',
          distanceKm: 12.4,
          durationMinutes: 28,
          latitude: 19.38,
          longitude: -99.12,
        ),
      ),
      _ScreenEntry(
        title: 'Reportes en mapa',
        description: 'Captura y listado de incidentes urbanos.',
        builder: () => const MapReportScreen(),
      ),
      _ScreenEntry(
        title: 'Consulta de folios',
        description: 'Filtros y búsqueda puntual de reportes.',
        builder: () => const ConsultScreen(),
      ),
    ];
  }
}

//4.- _ScreenEntry agrupa los metadatos de cada destino en el catálogo.
class _ScreenEntry {
  const _ScreenEntry({
    required this.title,
    required this.description,
    required this.builder,
  });

  final String title;
  final String description;
  final Widget Function() builder;
}
