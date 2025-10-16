import 'package:flutter/material.dart';

import 'auction_screen.dart';
import 'ride_map_screen.dart';

const routeSelectionOriginFieldKey = Key('route_selection_origin_field');
const routeSelectionDestinationFieldKey = Key('route_selection_destination_field');
const routeSelectionStartButtonKey = Key('route_selection_start_button');
const routeSelectionMapKey = Key('route_selection_map');
const routeSelectionCalculateButtonKey = Key('route_selection_calculate_button');

//1.- RouteSelectionScreen prepara los datos iniciales antes de lanzar la subasta.
class RouteSelectionScreen extends StatefulWidget {
  const RouteSelectionScreen({super.key});

  @override
  State<RouteSelectionScreen> createState() => _RouteSelectionScreenState();
}

class _RouteSelectionScreenState extends State<RouteSelectionScreen> {
  final _formKey = GlobalKey<FormState>();
  final _originController = TextEditingController(text: 'Parque México, CDMX');
  final _destinationController = TextEditingController(text: 'Aeropuerto AICM, CDMX');
  Offset? _relativeSelection;
  double? _selectedLatitude;
  double? _selectedLongitude;
  double? _estimatedDistanceKm;
  int? _estimatedDurationMin;

  static const _suggestions = [
    'Av. Reforma 123',
    'Insurgentes Sur 890',
    'WTC Ciudad de México',
    'Auditorio Nacional',
  ];

  @override
  void dispose() {
    _originController.dispose();
    _destinationController.dispose();
    super.dispose();
  }

  //2.- _registerTap traduce el toque en el mapa ficticio a coordenadas legibles.
  void _registerTap(Offset position, Size size) {
    final normalized = Offset(
      (position.dx / size.width).clamp(0, 1),
      (position.dy / size.height).clamp(0, 1),
    );
    setState(() {
      _relativeSelection = normalized;
      _selectedLatitude = 19.30 + (normalized.dy * 0.4);
      _selectedLongitude = -99.25 + (normalized.dx * 0.3);
    });
  }

  //3.- _calculateRoute genera estimaciones simples y abre el resumen con acciones.
  void _calculateRoute() {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    final baseDistance = 9.4;
    final baseDuration = 22;
    setState(() {
      _estimatedDistanceKm = baseDistance + (_relativeSelection?.dx ?? 0) * 3;
      _estimatedDurationMin = baseDuration + ((_relativeSelection?.dy ?? 0) * 10).round();
    });
    showModalBottomSheet<void>(
      context: context,
      builder: (context) => _RouteSummarySheet(
        origin: _originController.text,
        destination: _destinationController.text,
        distanceKm: _estimatedDistanceKm ?? baseDistance,
        durationMinutes: _estimatedDurationMin ?? baseDuration,
        onViewMap: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (_) => RideMapScreen(
                origin: _originController.text,
                destination: _destinationController.text,
                distanceKm: _estimatedDistanceKm ?? baseDistance,
                durationMinutes: _estimatedDurationMin ?? baseDuration,
                latitude: _selectedLatitude,
                longitude: _selectedLongitude,
              ),
            ),
          );
        },
        onStartAuction: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => const AuctionScreen()),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Selecciona tu ruta')),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            TextFormField(
              key: routeSelectionOriginFieldKey,
              controller: _originController,
              decoration: const InputDecoration(labelText: 'Origen'),
              validator: (value) =>
                  value == null || value.trim().isEmpty ? 'Ingresa un punto de partida' : null,
            ),
            const SizedBox(height: 16),
            TextFormField(
              key: routeSelectionDestinationFieldKey,
              controller: _destinationController,
              decoration: const InputDecoration(labelText: 'Destino'),
              validator: (value) =>
                  value == null || value.trim().isEmpty ? 'Ingresa un destino' : null,
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final suggestion in _suggestions)
                  ActionChip(
                    label: Text(suggestion),
                    onPressed: () {
                      //4.- Los chips permiten rellenar rápidamente campos frecuentes.
                      if (_originController.text.isEmpty) {
                        _originController.text = suggestion;
                      } else {
                        _destinationController.text = suggestion;
                      }
                      setState(() {});
                    },
                  ),
              ],
            ),
            const SizedBox(height: 24),
            Text('Marca en el mapa el punto de interés', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 12),
            LayoutBuilder(
              builder: (context, constraints) {
                final size = Size(constraints.maxWidth, 220);
                return GestureDetector(
                  key: routeSelectionMapKey,
                  onTapDown: (details) => _registerTap(details.localPosition, size),
                  child: Container(
                    width: size.width,
                    height: size.height,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      gradient: const LinearGradient(
                        colors: [Color(0xFFBBDEFB), Color(0xFF90CAF9)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Stack(
                      children: [
                        const Positioned(
                          left: 16,
                          top: 16,
                          child: Text('Vista previa simulada', style: TextStyle(color: Colors.white70)),
                        ),
                        if (_relativeSelection != null)
                          Positioned(
                            left: _relativeSelection!.dx * size.width - 12,
                            top: _relativeSelection!.dy * size.height - 12,
                            child: const Icon(Icons.place, color: Colors.redAccent, size: 24),
                          ),
                      ],
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 12),
            if (_selectedLatitude != null && _selectedLongitude != null)
              Text(
                'Coordenadas estimadas: '
                '${_selectedLatitude!.toStringAsFixed(4)}, ${_selectedLongitude!.toStringAsFixed(4)}',
              ),
            const SizedBox(height: 24),
            FilledButton.icon(
              key: routeSelectionCalculateButtonKey,
              onPressed: _calculateRoute,
              icon: const Icon(Icons.route),
              label: const Text('Calcular ruta y continuar'),
            ),
            const SizedBox(height: 24),
            FilledButton.tonalIcon(
              key: routeSelectionStartButtonKey,
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const AuctionScreen()),
                );
              },
              icon: const Icon(Icons.play_arrow),
              label: const Text('Ir directo a subasta'),
            ),
          ],
        ),
      ),
    );
  }
}

//5.- _RouteSummarySheet resume distancia y tiempo previo a la subasta.
class _RouteSummarySheet extends StatelessWidget {
  const _RouteSummarySheet({
    required this.origin,
    required this.destination,
    required this.distanceKm,
    required this.durationMinutes,
    required this.onViewMap,
    required this.onStartAuction,
  });

  final String origin;
  final String destination;
  final double distanceKm;
  final int durationMinutes;
  final VoidCallback onViewMap;
  final VoidCallback onStartAuction;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Resumen de ruta', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 12),
          Text('Origen: $origin'),
          Text('Destino: $destination'),
          Text('Distancia estimada: ${distanceKm.toStringAsFixed(1)} km'),
          Text('Duración estimada: $durationMinutes minutos'),
          const SizedBox(height: 20),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              FilledButton.icon(
                onPressed: () {
                  Navigator.of(context).pop();
                  onViewMap();
                },
                icon: const Icon(Icons.map_outlined),
                label: const Text('Ver mapa detallado'),
              ),
              OutlinedButton.icon(
                onPressed: () {
                  Navigator.of(context).pop();
                  onStartAuction();
                },
                icon: const Icon(Icons.local_taxi),
                label: const Text('Iniciar subasta'),
              ),
            ],
          ),
          const SizedBox(height: 12),
        ],
      ),
    );
  }
}
