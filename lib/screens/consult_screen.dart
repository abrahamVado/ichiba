import 'package:flutter/material.dart';

import 'shared/demo_data.dart';

//1.- ConsultScreen lista los folios registrados y permite consultas manuales.
class ConsultScreen extends StatefulWidget {
  const ConsultScreen({super.key});

  @override
  State<ConsultScreen> createState() => _ConsultScreenState();
}

class _ConsultScreenState extends State<ConsultScreen> {
  final TextEditingController _filterController = TextEditingController();
  final TextEditingController _lookupController = TextEditingController();
  List<DemoFolioEntry> _entries = List<DemoFolioEntry>.from(demoFolios);
  DemoFolioEntry? _lookupResult;
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    //2.- Escuchamos cambios del filtro para actualizar la grilla en tiempo real.
    _filterController.addListener(() {
      final query = _filterController.text.trim().toLowerCase();
      setState(() {
        _entries = demoFolios
            .where((entry) => entry.id.toLowerCase().contains(query) ||
                entry.type.toLowerCase().contains(query) ||
                entry.status.toLowerCase().contains(query))
            .toList();
      });
    });
  }

  @override
  void dispose() {
    _filterController.dispose();
    _lookupController.dispose();
    super.dispose();
  }

  //3.- _lookup busca un folio por ID en la lista local simulando latencia.
  Future<void> _lookup() async {
    final query = _lookupController.text.trim();
    if (query.isEmpty) {
      setState(() => _lookupResult = null);
      return;
    }
    setState(() => _loading = true);
    await Future<void>.delayed(const Duration(milliseconds: 400));
    if (!mounted) return;
    setState(() {
      _lookupResult = demoFolios.firstWhere(
        (entry) => entry.id.toLowerCase() == query.toLowerCase(),
        orElse: () => DemoFolioEntry(
          id: query,
          type: 'Sin resultados',
          status: 'No encontrado',
          timestamp: DateTime.now(),
          latitude: 0,
          longitude: 0,
          notes: 'El folio no existe en los datos de ejemplo.',
        ),
      );
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Consulta de folios')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TextField(
              controller: _filterController,
              decoration: const InputDecoration(
                labelText: 'Filtrar folios guardados',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _lookupController,
                    decoration: const InputDecoration(
                      labelText: 'Buscar folio por ID',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: (_) => _lookup(),
                  ),
                ),
                const SizedBox(width: 12),
                FilledButton(
                  onPressed: _loading ? null : _lookup,
                  child: _loading
                      ? const SizedBox(
                          width: 18,
                          height: 18,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Consultar'),
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (_lookupResult != null)
              Card(
                child: ListTile(
                  title: Text('${_lookupResult!.id} • ${_lookupResult!.status}'),
                  subtitle: Text(
                    'Tipo: ${_lookupResult!.type}\n'
                    'Generado: ${formatDateTime(_lookupResult!.timestamp)}',
                  ),
                ),
              ),
            const SizedBox(height: 16),
            Expanded(
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final width = constraints.maxWidth;
                  final crossAxisCount = width >= 960
                      ? 3
                      : width >= 640
                          ? 2
                          : 1;
                  final aspectRatio = crossAxisCount == 1 ? 3.2 : 1.8;
                  return GridView.builder(
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: crossAxisCount,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      childAspectRatio: aspectRatio,
                    ),
                    itemCount: _entries.length,
                    itemBuilder: (context, index) {
                      final entry = _entries[index];
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(entry.id,
                                  style: Theme.of(context).textTheme.titleMedium),
                              const SizedBox(height: 8),
                              Text('Estado: ${entry.status}'),
                              Text('Tipo: ${entry.type}'),
                              const Spacer(),
                              Text('Última actualización: ${formatDateTime(entry.timestamp)}'),
                            ],
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
