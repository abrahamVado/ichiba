import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../shared/demo_data.dart';

//1.- AuctionScreen reproduce un flujo básico de selección y conteo regresivo.
class AuctionScreen extends StatefulWidget {
  const AuctionScreen({super.key});

  @override
  State<AuctionScreen> createState() => _AuctionScreenState();
}

enum _AuctionStage { selecting, countdown, prompt }

class _AuctionScreenState extends State<AuctionScreen> {
  static final _random = math.Random();
  late final List<double> _bids;
  double? _selectedBid;
  _AuctionStage _stage = _AuctionStage.selecting;
  Duration _remaining = const Duration(seconds: 20);
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    //2.- Generamos ofertas alrededor de una tarifa promedio del demo actual.
    final base = demoCurrentTrip.amount;
    _bids = List<double>.generate(5, (index) {
      final delta = (_random.nextDouble() - 0.5) * 40;
      return (base + delta).clamp(80, 260);
    })
      ..sort();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  //3.- _startCountdown cambia de etapa y actualiza el temporizador cada segundo.
  void _startCountdown() {
    if (_selectedBid == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Selecciona una oferta para continuar.')),
      );
      return;
    }
    setState(() {
      _stage = _AuctionStage.countdown;
      _remaining = const Duration(seconds: 20);
    });
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      if (_remaining <= Duration.zero) {
        timer.cancel();
        setState(() => _stage = _AuctionStage.prompt);
        return;
      }
      setState(() {
        _remaining -= const Duration(seconds: 1);
      });
    });
  }

  //4.- _reset reinicia el flujo permitiendo simular otra subasta.
  void _reset() {
    _timer?.cancel();
    setState(() {
      _stage = _AuctionStage.selecting;
      _selectedBid = null;
      _remaining = const Duration(seconds: 20);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Subasta de viaje')),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: switch (_stage) {
            _AuctionStage.selecting => _SelectingView(
                bids: _bids,
                selectedBid: _selectedBid,
                onSelect: (value) => setState(() => _selectedBid = value),
                onConfirm: _startCountdown,
              ),
            _AuctionStage.countdown => _CountdownView(
                selectedBid: _selectedBid!,
                remaining: _remaining,
                onCancel: _reset,
              ),
            _AuctionStage.prompt => _PromptView(
                selectedBid: _selectedBid!,
                onRetry: _reset,
              ),
          },
        ),
      ),
    );
  }
}

//5.- _SelectingView presenta la lista de ofertas simuladas.
class _SelectingView extends StatelessWidget {
  const _SelectingView({
    required this.bids,
    required this.selectedBid,
    required this.onSelect,
    required this.onConfirm,
  });

  final List<double> bids;
  final double? selectedBid;
  final ValueChanged<double> onSelect;
  final VoidCallback onConfirm;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Selecciona la mejor oferta para tu viaje',
            style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.separated(
            itemCount: bids.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (context, index) {
              final bid = bids[index];
              final isSelected = bid == selectedBid;
              return ListTile(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                tileColor: isSelected
                    ? Theme.of(context).colorScheme.primaryContainer
                    : Theme.of(context).colorScheme.surfaceVariant,
                title: Text(formatCurrency(bid)),
                subtitle: Text('Oferta #${index + 1}'),
                trailing: isSelected
                    ? Icon(Icons.check_circle, color: Theme.of(context).colorScheme.primary)
                    : const Icon(Icons.circle_outlined),
                onTap: () => onSelect(bid),
              );
            },
          ),
        ),
        const SizedBox(height: 12),
        FilledButton.icon(
          onPressed: onConfirm,
          icon: const Icon(Icons.play_arrow),
          label: const Text('Buscar conductor'),
        ),
      ],
    );
  }
}

//6.- _CountdownView muestra una cuenta regresiva sencilla.
class _CountdownView extends StatelessWidget {
  const _CountdownView({
    required this.selectedBid,
    required this.remaining,
    required this.onCancel,
  });

  final double selectedBid;
  final Duration remaining;
  final VoidCallback onCancel;

  @override
  Widget build(BuildContext context) {
    final timeLabel = '${remaining.inSeconds}s';
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.hourglass_top, size: 72, color: Theme.of(context).colorScheme.primary),
        const SizedBox(height: 24),
        Text('Buscando conductor...', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 12),
        Text('Oferta seleccionada: ${formatCurrency(selectedBid)}'),
        const SizedBox(height: 24),
        Text(timeLabel, style: Theme.of(context).textTheme.displayMedium),
        const SizedBox(height: 24),
        OutlinedButton(onPressed: onCancel, child: const Text('Cancelar subasta')),
      ],
    );
  }
}

//7.- _PromptView simula el mensaje posterior a un conteo sin resultados.
class _PromptView extends StatelessWidget {
  const _PromptView({required this.selectedBid, required this.onRetry});

  final double selectedBid;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.info_outline, size: 64, color: Theme.of(context).colorScheme.secondary),
        const SizedBox(height: 16),
        Text(
          'Aún no hay conductores disponibles.',
          style: Theme.of(context).textTheme.titleLarge,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 8),
        Text(
          'Oferta vigente: ${formatCurrency(selectedBid)}',
          style: Theme.of(context).textTheme.titleMedium,
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 24),
        FilledButton.icon(
          onPressed: onRetry,
          icon: const Icon(Icons.refresh),
          label: const Text('Intentar de nuevo'),
        ),
      ],
    );
  }
}
