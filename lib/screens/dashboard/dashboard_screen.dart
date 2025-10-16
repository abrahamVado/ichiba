import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../shared/demo_data.dart';
import 'bank/bank_information_screen.dart';
import 'panic/panic_button_screen.dart';
import 'profile/rider_profile_screen.dart';
import 'reservations/reservation_screen.dart';
import 'support/contact_us_screen.dart';
import 'trip/current_trip_details_screen.dart';
import 'trip/driver_profile_screen.dart';
import 'travel/travel_history_screen.dart';
import 'widgets/finance_overview.dart';

const dashboardCreateRideButtonKey = Key('dashboard_create_ride_button');

//1.- DashboardScreen sintetiza el tablero principal con métricas y accesos.
class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  FinanceRange _selectedRange = FinanceRange.week;
  late List<double> _rideTrend;

  @override
  void initState() {
    super.initState();
    //2.- Generamos la serie inicial del gráfico empleando datos de muestra.
    _rideTrend = _generateRideTrend(_selectedRange);
  }

  //3.- _generateRideTrend produce valores sintéticos para la gráfica de viajes.
  List<double> _generateRideTrend(FinanceRange range) {
    final base = range == FinanceRange.today
        ? const [6.0, 8.5, 5.0, 9.0, 7.5]
        : range == FinanceRange.week
            ? const [15.0, 18.0, 20.0, 17.0, 21.0, 24.0, 26.0]
            : const [80.0, 92.0, 105.0, 111.0, 124.0, 131.0];
    return List<double>.from(base);
  }

  //4.- _onRangeChanged refresca los indicadores al seleccionar otro periodo.
  void _onRangeChanged(FinanceRange range) {
    setState(() {
      _selectedRange = range;
      _rideTrend = _generateRideTrend(range);
    });
  }

  //5.- _openScreen navega a las pantallas hijas reutilizando MaterialPageRoute.
  Future<void> _openScreen(BuildContext context, Widget screen) {
    return Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => screen),
    );
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final currentTrip = demoCurrentTrip;
    final panicEnabled = currentTrip.status.toLowerCase().contains('destino');
    final rideTrend = _rideTrend;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Panel de control'),
        actions: [
          IconButton(
            tooltip: 'Historial de viajes',
            onPressed: () => _openScreen(context, const TravelHistoryScreen()),
            icon: const Icon(Icons.route),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _DashboardGreetingBanner(riderName: demoRider.name, metrics: demoMetrics),
          const SizedBox(height: 16),
          LayoutBuilder(
            builder: (context, constraints) {
              const spacing = 12.0;
              const minHeight = 220.0;
              final maxWidth = constraints.maxWidth;
              final isWide = maxWidth >= 900;
              final crossAxisCount = isWide ? 3 : 2;
              final totalSpacing = spacing * (crossAxisCount - 1);
              final availableWidth = math.max(maxWidth - totalSpacing, 0);
              final rawItemWidth = availableWidth / crossAxisCount;
              final itemWidth = rawItemWidth.clamp(160.0, double.infinity);
              final aspectRatio = itemWidth / minHeight;

              final quickStats = [
                _DashboardQuickStat(
                  icon: Icons.account_balance,
                  title: 'Banco',
                  value: demoMetrics.bankName,
                  description: 'Gestiona tus datos de depósito.',
                  background: colorScheme.primaryContainer,
                  foreground: colorScheme.onPrimaryContainer,
                  actionLabel: 'Actualizar',
                  onAction: () => _openScreen(context, const BankInformationScreen()),
                ),
                _DashboardQuickStat(
                  icon: Icons.credit_card,
                  title: 'Cuenta',
                  value: demoRider.email,
                  description: 'Edita tu perfil y teléfono.',
                  background: colorScheme.secondaryContainer,
                  foreground: colorScheme.onSecondaryContainer,
                  actionLabel: 'Editar',
                  onAction: () => _openScreen(context, const RiderProfileScreen()),
                ),
                _DashboardQuickStat(
                  icon: Icons.event_available,
                  title: 'Reserva',
                  value: 'Anticipa viajes',
                  description: 'Registra traslados programados.',
                  background: colorScheme.surfaceVariant,
                  foreground: colorScheme.onSurfaceVariant,
                  actionLabel: 'Crear',
                  onAction: () => _openScreen(context, const ReservationScreen()),
                ),
                _DashboardQuickStat(
                  icon: Icons.warning_amber_outlined,
                  title: 'Pánico',
                  value: panicEnabled ? 'Listo' : 'Sin viaje aceptado',
                  description: 'Activa ayuda inmediata si detectas riesgo.',
                  background: colorScheme.errorContainer,
                  foreground: colorScheme.onErrorContainer,
                  actionLabel: 'Abrir',
                  isEnabled: panicEnabled,
                  onAction: () => _openScreen(context, PanicButtonScreen(trip: currentTrip)),
                ),
                _DashboardQuickStat(
                  icon: Icons.support_agent,
                  title: 'Soporte',
                  value: 'Equipo 24/7',
                  description: 'Contáctanos para resolver dudas.',
                  background: colorScheme.inversePrimary,
                  foreground: colorScheme.onPrimary,
                  actionLabel: 'Llamar',
                  onAction: () => _openScreen(context, const ContactUsScreen()),
                ),
                _DashboardQuickStat(
                  icon: Icons.star_rate,
                  title: 'Evaluación',
                  value: '${demoMetrics.evaluationScore} / 5',
                  description: 'Opinión promedio de pasajeros.',
                  background: colorScheme.tertiaryContainer,
                  foreground: colorScheme.onTertiaryContainer,
                  actionLabel: 'Próximamente',
                  onAction: () => _showComingSoon(context),
                ),
              ];

              return GridView.count(
                crossAxisCount: crossAxisCount,
                crossAxisSpacing: spacing,
                mainAxisSpacing: spacing,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                childAspectRatio: aspectRatio,
                children: quickStats,
              );
            },
          ),
          const SizedBox(height: 24),
          Card(
            clipBehavior: Clip.antiAlias,
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  FinanceRangeSelector(
                    selectedRange: _selectedRange,
                    onChanged: _onRangeChanged,
                  ),
                  const SizedBox(height: 20),
                  FinanceStatsGrid(
                    snapshot: FinanceSnapshot(
                      tripCount: demoMetrics.completedTrips,
                      totalAmount: demoMetrics.totalEarnings,
                      averagePrice: demoMetrics.averageFare,
                    ),
                    acceptanceRate: demoMetrics.acceptanceRate,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Tendencia de viajes', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 180,
                    child: _RideTrendChart(values: rideTrend),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Viaje en curso', style: Theme.of(context).textTheme.titleMedium),
                  const SizedBox(height: 12),
                  Text('Pasajero: ${currentTrip.passengerName}'),
                  Text('Destino: ${currentTrip.dropoffAddress}'),
                  Text('Monto estimado: ${formatCurrency(currentTrip.amount)}'),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      FilledButton.icon(
                        onPressed: () => _openScreen(
                          context,
                          CurrentTripDetailsScreen(trip: currentTrip),
                        ),
                        icon: const Icon(Icons.map_outlined),
                        label: const Text('Detalles'),
                      ),
                      const SizedBox(width: 12),
                      OutlinedButton.icon(
                        onPressed: () => _openScreen(
                          context,
                          DriverProfileScreen(trip: currentTrip),
                        ),
                        icon: const Icon(Icons.person_outline),
                        label: const Text('Conductor'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          FilledButton.icon(
            key: dashboardCreateRideButtonKey,
            onPressed: () => _openScreen(context, const ReservationScreen()),
            icon: const Icon(Icons.add_circle_outline),
            label: const Text('Crear nuevo viaje programado'),
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  //6.- _showComingSoon comunica funcionalidades aún no implementadas.
  void _showComingSoon(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Esta sección estará disponible pronto.')),
    );
  }
}

//7.- _DashboardGreetingBanner da la bienvenida con métricas resumidas.
class _DashboardGreetingBanner extends StatelessWidget {
  const _DashboardGreetingBanner({required this.riderName, required this.metrics});

  final String riderName;
  final DemoDashboardMetrics metrics;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          colors: [
            theme.colorScheme.primary,
            theme.colorScheme.primaryContainer,
          ],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Hola, $riderName',
            style: theme.textTheme.headlineSmall?.copyWith(
              color: theme.colorScheme.onPrimary,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Completaste ${metrics.completedTrips} viajes recientes con una tasa de aceptación '
            'del ${metrics.acceptanceRate.toStringAsFixed(1)}%.',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onPrimary,
            ),
          ),
        ],
      ),
    );
  }
}

//8.- _DashboardQuickStat encapsula la tarjeta utilizada en la cuadrícula.
class _DashboardQuickStat extends StatelessWidget {
  const _DashboardQuickStat({
    required this.icon,
    required this.title,
    required this.value,
    required this.description,
    required this.background,
    required this.foreground,
    required this.actionLabel,
    required this.onAction,
    this.isEnabled = true,
  });

  final IconData icon;
  final String title;
  final String value;
  final String description;
  final Color background;
  final Color foreground;
  final String actionLabel;
  final VoidCallback onAction;
  final bool isEnabled;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: foreground.withOpacity(0.16),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: foreground),
          ),
          const SizedBox(height: 12),
          Text(title, style: theme.textTheme.titleMedium?.copyWith(color: foreground)),
          const SizedBox(height: 6),
          Text(
            value,
            style: theme.textTheme.headlineSmall?.copyWith(
              color: foreground,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 6),
          Expanded(
            child: Text(
              description,
              style: theme.textTheme.bodySmall?.copyWith(color: foreground),
            ),
          ),
          const SizedBox(height: 12),
          OutlinedButton(
            onPressed: isEnabled ? onAction : null,
            style: OutlinedButton.styleFrom(
              foregroundColor: foreground,
              side: BorderSide(color: foreground.withOpacity(0.6)),
            ),
            child: Text(actionLabel),
          ),
        ],
      ),
    );
  }
}

//9.- _RideTrendChart dibuja una línea simple con puntos destacados.
class _RideTrendChart extends StatelessWidget {
  const _RideTrendChart({required this.values});

  final List<double> values;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _RideTrendPainter(values: values),
      child: const SizedBox.expand(),
    );
  }
}

class _RideTrendPainter extends CustomPainter {
  const _RideTrendPainter({required this.values});

  final List<double> values;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.isEmpty) return;
    final paint = Paint()
      ..color = Colors.blueAccent
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke;
    final fillPaint = Paint()
      ..shader = LinearGradient(
        colors: [Colors.blueAccent.withOpacity(0.3), Colors.transparent],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    final points = <Offset>[];
    final maxValue = values.reduce(math.max);
    final minValue = values.reduce(math.min);
    final range = (maxValue - minValue).abs().clamp(1, double.infinity);
    for (var i = 0; i < values.length; i++) {
      final x = size.width * (i / (values.length - 1));
      final normalized = (values[i] - minValue) / range;
      final y = size.height - (normalized * size.height);
      points.add(Offset(x, y));
    }
    final path = Path()..moveTo(points.first.dx, points.first.dy);
    for (final point in points.skip(1)) {
      path.lineTo(point.dx, point.dy);
    }
    final fillPath = Path.from(path)
      ..lineTo(points.last.dx, size.height)
      ..lineTo(points.first.dx, size.height)
      ..close();
    canvas.drawPath(fillPath, fillPaint);
    canvas.drawPath(path, paint);
    final pointPaint = Paint()
      ..color = Colors.blueAccent
      ..style = PaintingStyle.fill;
    for (final point in points) {
      canvas.drawCircle(point, 4, pointPaint);
    }
  }

  @override
  bool shouldRepaint(covariant _RideTrendPainter oldDelegate) =>
      oldDelegate.values != values;
}
