import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'shared/demo_data.dart';

//1.- MapReportScreen permite registrar incidentes urbanos de forma guiada.
class MapReportScreen extends StatefulWidget {
  const MapReportScreen({super.key});

  @override
  State<MapReportScreen> createState() => _MapReportScreenState();
}

class _MapReportScreenState extends State<MapReportScreen> {
  Offset? _relativePoint;
  double? _latitude;
  double? _longitude;
  DemoReportType? _selectedType;
  final List<DemoFolioEntry> _folios = List<DemoFolioEntry>.from(demoFolios);
  final TextEditingController _notesController = TextEditingController();

  @override
  void dispose() {
    _notesController.dispose();
    super.dispose();
  }

  //2.- _registerTap guarda el punto seleccionado sobre el mapa ilustrativo.
  void _registerTap(Offset position, Size size) {
    final normalized = Offset(
      (position.dx / size.width).clamp(0, 1),
      (position.dy / size.height).clamp(0, 1),
    );
    setState(() {
      _relativePoint = normalized;
      _latitude = 19.30 + normalized.dy * 0.4;
      _longitude = -99.25 + normalized.dx * 0.3;
    });
  }

  //3.- _openTypePicker presenta un selector modal con los tipos disponibles.
  Future<void> _openTypePicker() async {
    final type = await showModalBottomSheet<DemoReportType>(
      context: context,
      builder: (context) => ListView(
        padding: const EdgeInsets.all(24),
        children: [
          Text('Selecciona el tipo de incidente',
              style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 16),
          for (final type in demoReportTypes)
            ListTile(
              leading: Text(type.emoji, style: const TextStyle(fontSize: 24)),
              title: Text(type.name),
              onTap: () => Navigator.of(context).pop(type),
            ),
        ],
      ),
    );
    if (type != null && mounted) {
      setState(() => _selectedType = type);
    }
  }

  //4.- _submitReport valida que existan datos mínimos y agrega un folio local.
  void _submitReport() {
    if (_selectedType == null || _latitude == null || _longitude == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Selecciona un punto y un tipo de reporte.')),
      );
      return;
    }
    final newId = 'F-${math.Random().nextInt(9000) + 1000}';
    final entry = DemoFolioEntry(
      id: newId,
      type: _selectedType!.name,
      status: 'Pendiente',
      timestamp: DateTime.now(),
      latitude: _latitude!,
      longitude: _longitude!,
      notes: _notesController.text.trim().isEmpty ? null : _notesController.text.trim(),
    );
    setState(() {
      _folios.insert(0, entry);
      _notesController.clear();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Reporte $newId creado correctamente.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Reportes en el mapa')),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          Text('Selecciona la ubicación del incidente',
              style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 12),
          LayoutBuilder(
            builder: (context, constraints) {
              final size = Size(constraints.maxWidth, 240);
              return GestureDetector(
                onTapDown: (details) => _registerTap(details.localPosition, size),
                child: _MapCanvas(
                  size: size,
                  relativePoint: _relativePoint,
                  folios: _folios,
                ),
              );
            },
          ),
          const SizedBox(height: 12),
          if (_latitude != null && _longitude != null)
            Text('Coordenadas aproximadas: ${_latitude!.toStringAsFixed(4)}, '
                '${_longitude!.toStringAsFixed(4)}'),
          const SizedBox(height: 12),
          FilledButton.icon(
            onPressed: _openTypePicker,
            icon: const Icon(Icons.category_outlined),
            label: Text(_selectedType == null
                ? 'Elegir tipo de incidente'
                : 'Tipo: ${_selectedType!.emoji} ${_selectedType!.name}'),
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _notesController,
            maxLines: 3,
            decoration: const InputDecoration(
              labelText: 'Notas adicionales (opcional)',
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16),
          FilledButton.icon(
            onPressed: _submitReport,
            icon: const Icon(Icons.send),
            label: const Text('Registrar reporte'),
          ),
          const SizedBox(height: 24),
          Text('Reportes guardados', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 12),
          for (final entry in _folios)
            Card(
              margin: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                leading: const Icon(Icons.location_pin),
                title: Text('${entry.type} • ${entry.status}'),
                subtitle: Text(
                  'Folio ${entry.id} • ${formatDateTime(entry.timestamp)}\n'
                  'Ubicación: ${entry.latitude.toStringAsFixed(4)}, '
                  '${entry.longitude.toStringAsFixed(4)}',
                ),
              ),
            ),
        ],
      ),
    );
  }
}

//5.- _MapCanvas dibuja un panel con marcadores simples para cada folio.
class _MapCanvas extends StatelessWidget {
  const _MapCanvas({
    required this.size,
    required this.relativePoint,
    required this.folios,
  });

  final Size size;
  final Offset? relativePoint;
  final List<DemoFolioEntry> folios;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size.width,
      height: size.height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Color(0xFF4DB6AC), Color(0xFF00796B)],
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
          for (final entry in folios)
            Positioned(
              left: (((entry.longitude + 99.25) / 0.3).clamp(0, 1) as double) * size.width - 10,
              top: (((entry.latitude - 19.30) / 0.4).clamp(0, 1) as double) * size.height - 10,
              child: const Icon(Icons.location_on, color: Colors.amber, size: 20),
            ),
          if (relativePoint != null)
            Positioned(
              left: relativePoint!.dx * size.width - 12,
              top: relativePoint!.dy * size.height - 12,
              child: const Icon(Icons.my_location, color: Colors.white, size: 24),
            ),
        ],
      ),
    );
  }
}
