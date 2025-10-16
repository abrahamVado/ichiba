import 'package:flutter/material.dart';

import '../shared/demo_data.dart';

const loginSubmitButtonKey = Key('login_submit_button');

//1.- LoginScreen ofrece un acceso rápido utilizando credenciales demo.
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isSubmitting = false;
  String? _riderName;
  String? _email;

  //2.- _signInAsDemo simula la autenticación con retroalimentación visual.
  Future<void> _signInAsDemo() async {
    setState(() {
      _isSubmitting = true;
      _riderName = null;
      _email = null;
    });
    await Future<void>.delayed(const Duration(milliseconds: 600));
    if (!mounted) return;
    setState(() {
      _isSubmitting = false;
      _riderName = demoRider.name;
      _email = demoRider.email;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    //3.- La interfaz destaca las instrucciones y la acción principal de ingreso.
    return Scaffold(
      appBar: AppBar(title: const Text('Ingreso de riders')),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const _BrandingPreview(),
                Text(
                  'Accede a la versión demo sin crear una cuenta adicional. '
                  'Generamos credenciales temporales automáticamente.',
                  style: theme.textTheme.bodyMedium,
                ),
                const SizedBox(height: 24),
                if (_riderName != null) ...[
                  Card(
                    color: theme.colorScheme.primaryContainer,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Bienvenido, $_riderName',
                            style: theme.textTheme.titleMedium?.copyWith(
                              color: theme.colorScheme.onPrimaryContainer,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Sesión iniciada como $_email',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onPrimaryContainer,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
                FilledButton.icon(
                  key: loginSubmitButtonKey,
                  onPressed: _isSubmitting ? null : _signInAsDemo,
                  icon: _isSubmitting
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.play_arrow),
                  label: Text(_isSubmitting ? 'Ingresando...' : 'Entrar como Demo'),
                ),
                const SizedBox(height: 24),
                Wrap(
                  spacing: 8,
                  runSpacing: 4,
                  children: const [
                    Text('Riders de referencia:'),
                    Chip(label: Text('rider.001@panzerkraft.app')),
                    Chip(label: Text('rider.002@panzerkraft.app')),
                    Chip(label: Text('rider.003@panzerkraft.app')),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

//4.- _BrandingPreview emula el espacio reservado para recursos de marca.
class _BrandingPreview extends StatelessWidget {
  const _BrandingPreview();

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _BrandingImageTile(
              icon: Icons.directions_car,
              label: 'Flota segura',
              color: theme.colorScheme.primaryContainer,
            ),
            const SizedBox(width: 16),
            _BrandingImageTile(
              icon: Icons.navigation,
              label: 'Rutas inteligentes',
              color: theme.colorScheme.secondaryContainer,
            ),
          ],
        ),
        const SizedBox(height: 24),
      ],
    );
  }
}

//5.- _BrandingImageTile sustituye las imágenes configurables por íconos.
class _BrandingImageTile extends StatelessWidget {
  const _BrandingImageTile({
    required this.icon,
    required this.label,
    required this.color,
  });

  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Column(
      children: [
        Container(
          width: 96,
          height: 96,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Icon(icon, size: 48, color: theme.colorScheme.onPrimaryContainer),
        ),
        const SizedBox(height: 8),
        Text(label, style: theme.textTheme.labelMedium),
      ],
    );
  }
}
