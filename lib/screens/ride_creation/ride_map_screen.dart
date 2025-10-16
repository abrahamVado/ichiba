import 'package:flutter/material.dart';

//1.- RideMapScreen muestra una vista resumida del recorrido calculado.
class RideMapScreen extends StatelessWidget {
  const RideMapScreen({
    super.key,
    required this.origin,
    required this.destination,
    required this.distanceKm,
    required this.durationMinutes,
    this.latitude,
    this.longitude,
  });

  final String origin;
  final String destination;
  final double distanceKm;
  final int durationMinutes;
  final double? latitude;
  final double? longitude;

  @override
  Widget build(BuildContext context) {
    final routeSummary = '${distanceKm.toStringAsFixed(1)} km • $durationMinutes minutos';
    return Scaffold(
      appBar: AppBar(title: const Text('Mapa del recorrido')),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          Text('Ruta sugerida', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 12),
          _MapPreview(latitude: latitude, longitude: longitude),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Origen: $origin'),
                  Text('Destino: $destination'),
                  Text('Resumen: $routeSummary'),
                  if (latitude != null && longitude != null)
                    Text('Marcador aproximado: ${latitude!.toStringAsFixed(4)}, '
                        '${longitude!.toStringAsFixed(4)}'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text('Indicaciones sugeridas', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 12),
          ..._buildSteps(),
        ],
      ),
    );
  }

  //2.- _buildSteps genera instrucciones genéricas a partir de la distancia.
  List<Widget> _buildSteps() {
    final steps = <String>[
      'Dirígete al punto de partida y verifica los datos del pasajero.',
      'Toma el carril central hasta la avenida principal.',
      'Mantente recto por 3 km y gira a la derecha en la glorieta.',
      'Continúa hacia el destino y estaciona en un punto seguro.',
    ];
    return [
      for (var i = 0; i < steps.length; i++)
        ListTile(
          leading: CircleAvatar(child: Text('${i + 1}')),
          title: Text(steps[i]),
        ),
    ];
  }
}

//3.- _MapPreview dibuja un contenedor decorativo emulando el mapa real.
class _MapPreview extends StatelessWidget {
  const _MapPreview({this.latitude, this.longitude});

  final double? latitude;
  final double? longitude;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 16 / 9,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          gradient: const LinearGradient(
            colors: [Color(0xFFB2DFDB), Color(0xFF80CBC4)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Stack(
          children: [
            const Positioned(
              left: 16,
              top: 16,
              child: Text('Mapa ilustrativo', style: TextStyle(color: Colors.white70)),
            ),
            if (latitude != null && longitude != null)
              Builder(
                builder: (context) {
                  final dx = (((longitude! + 99.25) / 0.3) - 1).clamp(-1.0, 1.0);
                  final dy = (((latitude! - 19.30) / 0.4) - 1).clamp(-1.0, 1.0);
                  return Align(
                    alignment: Alignment(dx, dy),
                    child: const Icon(Icons.location_on, size: 36, color: Colors.redAccent),
                  );
                },
              ),
          ],
        ),
      ),
    );
  }
}
