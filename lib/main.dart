import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/services/auth_service.dart';
import 'core/services/location_service.dart';
import 'core/services/secure_storage_service.dart';
import 'core/services/websocket_service.dart';
import 'features/auth/auth_view.dart';
import 'features/auth/auth_view_model.dart';
import 'features/bidding/bidding_view_model.dart';
import 'features/dashboard/dashboard_view.dart';
import 'features/tracking/tracking_view_model.dart';
import 'features/trip/trip_view_model.dart';

void main() {
  //1.- Prepare Flutter bindings before touching platform services.
  WidgetsFlutterBinding.ensureInitialized();
  //2.- Instantiate the shared services required across the application.
  final authService = AuthService();
  final secureStorage = SecureStorageService();
  final webSocketService = WebSocketService();
  final locationService = LocationService();
  //3.- Launch the widget tree with the constructed dependencies.
  runApp(DriverApp(
    authService: authService,
    secureStorageService: secureStorage,
    webSocketService: webSocketService,
    locationService: locationService,
  ));
}

class DriverApp extends StatelessWidget {
  const DriverApp({
    super.key,
    required this.authService,
    required this.secureStorageService,
    required this.webSocketService,
    required this.locationService,
  });

  final AuthService authService;
  final SecureStorageService secureStorageService;
  final WebSocketService webSocketService;
  final LocationService locationService;

  @override
  Widget build(BuildContext context) {
    //1.- Expose services and view models to the widget tree through providers.
    return MultiProvider(
      providers: [
        Provider.value(value: authService),
        Provider.value(value: secureStorageService),
        Provider.value(value: webSocketService),
        Provider.value(value: locationService),
        ChangeNotifierProvider(
          create: (context) => AuthViewModel(
            authService: authService,
            secureStorageService: secureStorageService,
            webSocketService: webSocketService,
            locationService: locationService,
          ),
        ),
        ChangeNotifierProvider(
          create: (_) => TrackingViewModel(webSocketService: webSocketService),
        ),
        ChangeNotifierProvider(
          create: (_) => BiddingViewModel(webSocketService: webSocketService),
        ),
        ChangeNotifierProvider(
          create: (_) => TripViewModel(webSocketService: webSocketService),
        ),
      ],
      //2.- Configure MaterialApp routes and theming for the experience.
      child: MaterialApp(
        title: 'Ride Hailing Driver',
        theme: ThemeData(colorSchemeSeed: Colors.indigo, useMaterial3: true),
        routes: {
          '/': (_) => const AuthView(),
          '/dashboard': (_) => const DashboardView(),
        },
      ),
    );
  }
}
