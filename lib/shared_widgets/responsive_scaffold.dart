import 'package:flutter/material.dart';

class ResponsiveScaffold extends StatelessWidget {
  const ResponsiveScaffold({
    super.key,
    required this.title,
    required this.body,
    this.actions,
  });

  final String title;
  final Widget body;
  final List<Widget>? actions;

  @override
  Widget build(BuildContext context) {
    //1.- Determine whether to constrain the layout for larger screens.
    final isWide = MediaQuery.of(context).size.width > 600;
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
        actions: actions,
      ),
      //2.- Center and constrain the body for consistent spacing.
      body: Center(
        child: ConstrainedBox(
          constraints: BoxConstraints(maxWidth: isWide ? 600 : double.infinity),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: body,
          ),
        ),
      ),
    );
  }
}
