import 'package:flutter/material.dart';

import '../../shared/demo_data.dart';

//1.- FinanceRange describe los periodos disponibles en la sección de finanzas.
enum FinanceRange { today, week, month }

//2.- FinanceSnapshot agrupa los valores que alimentan las tarjetas resumen.
class FinanceSnapshot {
  const FinanceSnapshot({
    required this.tripCount,
    required this.totalAmount,
    required this.averagePrice,
  });

  final int tripCount;
  final double totalAmount;
  final double averagePrice;
}

//3.- FinanceRangeSelector permite alternar rápidamente el periodo analizado.
class FinanceRangeSelector extends StatelessWidget {
  const FinanceRangeSelector({
    super.key,
    required this.selectedRange,
    required this.onChanged,
  });

  final FinanceRange selectedRange;
  final ValueChanged<FinanceRange> onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text('Periodo de análisis', style: theme.textTheme.titleSmall),
        DropdownButton<FinanceRange>(
          value: selectedRange,
          onChanged: (value) {
            if (value != null) {
              onChanged(value);
            }
          },
          items: FinanceRange.values
              .map(
                (range) => DropdownMenuItem(
                  value: range,
                  child: Text(_financeRangeLabel(range)),
                ),
              )
              .toList(),
        ),
      ],
    );
  }
}

//4.- FinanceStatsGrid muestra los indicadores clave derivados del snapshot.
class FinanceStatsGrid extends StatelessWidget {
  const FinanceStatsGrid({
    super.key,
    required this.snapshot,
    required this.acceptanceRate,
  });

  final FinanceSnapshot snapshot;
  final double acceptanceRate;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            _FinanceStatTile(
              label: 'Viajes',
              value: snapshot.tripCount.toString(),
              icon: Icons.route,
            ),
            _FinanceStatTile(
              label: 'Monto total',
              value: formatCurrency(snapshot.totalAmount),
              icon: Icons.payments,
            ),
            _FinanceStatTile(
              label: 'Precio promedio',
              value: formatCurrency(snapshot.averagePrice),
              icon: Icons.attach_money,
            ),
          ],
        ),
        const SizedBox(height: 20),
        _AcceptanceRateMeter(rate: acceptanceRate),
      ],
    );
  }
}

//5.- _FinanceStatTile estandariza la visualización de cada métrica individual.
class _FinanceStatTile extends StatelessWidget {
  const _FinanceStatTile({
    required this.label,
    required this.value,
    required this.icon,
  });

  final String label;
  final String value;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    return Container(
      width: 200,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: colorScheme.secondaryContainer,
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: SizedBox(
              width: 44,
              height: 44,
              child: ColoredBox(
                color: colorScheme.secondary,
                child: FittedBox(
                  fit: BoxFit.cover,
                  child: Icon(
                    icon,
                    size: 56,
                    color: colorScheme.onSecondary,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: theme.textTheme.titleSmall),
                const SizedBox(height: 4),
                Text(
                  value,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

String _financeRangeLabel(FinanceRange range) {
  //6.- _financeRangeLabel asigna textos legibles al menú desplegable.
  switch (range) {
    case FinanceRange.today:
      return 'Hoy';
    case FinanceRange.week:
      return 'Semana';
    case FinanceRange.month:
      return 'Mes';
  }
}

//7.- _AcceptanceRateMeter transforma la tasa en una barra de progreso.
class _AcceptanceRateMeter extends StatelessWidget {
  const _AcceptanceRateMeter({required this.rate});

  final double rate;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final normalized = (rate.clamp(0, 100)) / 100;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Tasa de aceptación', style: theme.textTheme.bodyMedium),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: LinearProgressIndicator(
            value: normalized,
            minHeight: 12,
          ),
        ),
        const SizedBox(height: 4),
        Text('${rate.toStringAsFixed(1)}% de viajes aceptados',
            style: theme.textTheme.bodySmall),
      ],
    );
  }
}
