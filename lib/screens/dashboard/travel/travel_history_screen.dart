import 'package:flutter/material.dart';

import '../../shared/demo_data.dart';

const travelHistoryThumbnailKey = Key('travel_history_thumbnail');

//1.- TravelHistoryScreen lista viajes completados con paginación manual.
class TravelHistoryScreen extends StatefulWidget {
  const TravelHistoryScreen({super.key});

  @override
  State<TravelHistoryScreen> createState() => _TravelHistoryScreenState();
}

class _TravelHistoryScreenState extends State<TravelHistoryScreen> {
  static const int _pageSize = 5;
  int _currentPage = 0;
  late List<DemoTravelHistoryEntry> _entries;

  @override
  void initState() {
    super.initState();
    //2.- Copiamos los viajes demo para no modificar la lista compartida.
    _entries = List<DemoTravelHistoryEntry>.from(demoHistory);
  }

  //3.- _refresh simula la actualización de datos con una breve espera.
  Future<void> _refresh() async {
    await Future<void>.delayed(const Duration(milliseconds: 400));
    if (!mounted) return;
    setState(() {
      _entries = List<DemoTravelHistoryEntry>.from(demoHistory);
      _currentPage = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    final totalPages = (_entries.length / _pageSize).ceil().clamp(1, 99);
        final startIndex = _currentPage * _pageSize;
    final endIndex = (_currentPage + 1) * _pageSize;
    final start = startIndex.clamp(0, _entries.length).toInt();
    final end = endIndex.clamp(0, _entries.length).toInt();
    final visibleEntries = _entries.sublist(start, end);

    return Scaffold(
      appBar: AppBar(title: const Text('Historial de viajes')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Expanded(
              child: RefreshIndicator(
                onRefresh: _refresh,
                child: ListView.separated(
                  physics: const AlwaysScrollableScrollPhysics(),
                  itemCount: visibleEntries.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final entry = visibleEntries[index];
                    return _TravelHistoryTile(entry: entry);
                  },
                ),
              ),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                OutlinedButton.icon(
                  onPressed: _currentPage > 0
                      ? () => setState(() => _currentPage--)
                      : null,
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('Anterior'),
                ),
                Text('Página ${_currentPage + 1} de $totalPages'),
                OutlinedButton.icon(
                  onPressed: _currentPage < totalPages - 1
                      ? () => setState(() => _currentPage++)
                      : null,
                  icon: const Icon(Icons.arrow_forward),
                  label: const Text('Siguiente'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

//4.- _TravelHistoryTile resume información puntual de cada viaje terminado.
class _TravelHistoryTile extends StatelessWidget {
  const _TravelHistoryTile({required this.entry});

  final DemoTravelHistoryEntry entry;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final vehicleIcon = travelHistoryVehicleEmojis[entry.id.hashCode % travelHistoryVehicleEmojis.length];
    return Card(
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: CircleAvatar(
          key: travelHistoryThumbnailKey,
          radius: 28,
          child: Icon(vehicleIcon, size: 28),
        ),
        title: Text('${entry.origin} → ${entry.destination}'),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text('Fecha: ${formatDate(entry.date)}'),
            Text('Duración: ${entry.durationMinutes} minutos'),
            Text('Distancia: ${entry.distanceKm.toStringAsFixed(1)} km'),
            Text('Cobro: ${formatCurrency(entry.fare)} • ${entry.paymentMethod}'),
          ],
        ),
        trailing: IconButton(
          icon: const Icon(Icons.receipt_long),
          onPressed: () => _showReceipt(context, entry, theme),
        ),
      ),
    );
  }

  //5.- _showReceipt abre un diálogo con más detalles para fines demostrativos.
  void _showReceipt(
    BuildContext context,
    DemoTravelHistoryEntry entry,
    ThemeData theme,
  ) {
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Resumen de viaje'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('ID: ${entry.id}'),
            Text('Fecha: ${formatDateTime(entry.date)}'),
            Text('Origen: ${entry.origin}'),
            Text('Destino: ${entry.destination}'),
            const SizedBox(height: 8),
            Text('Duración: ${entry.durationMinutes} minutos'),
            Text('Distancia: ${entry.distanceKm.toStringAsFixed(1)} km'),
            const Divider(),
            Text(
              'Cobro total: ${formatCurrency(entry.fare)}',
              style: theme.textTheme.titleMedium,
            ),
            const SizedBox(height: 4),
            Text('Pagado con ${entry.paymentMethod}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cerrar'),
          ),
        ],
      ),
    );
  }
}
