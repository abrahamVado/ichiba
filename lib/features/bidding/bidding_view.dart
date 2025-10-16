import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../shared_widgets/primary_button.dart';
import '../../shared_widgets/responsive_scaffold.dart';
import 'bidding_view_model.dart';

class BiddingView extends StatefulWidget {
  const BiddingView({super.key});

  @override
  State<BiddingView> createState() => _BiddingViewState();
}

class _BiddingViewState extends State<BiddingView> {
  final _priceController = TextEditingController(text: '12.5');
  final _riderIdController = TextEditingController();

  @override
  void initState() {
    super.initState();
    //1.- Initialize the WebSocket listener after the first frame.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      Provider.of<BiddingViewModel>(context, listen: false).initialize();
    });
  }

  @override
  void dispose() {
    //2.- Dispose controllers to prevent memory leaks.
    _priceController.dispose();
    _riderIdController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    //3.- Rebuild whenever the bidding state changes.
    return Consumer<BiddingViewModel>(
      builder: (context, viewModel, _) {
        return ResponsiveScaffold(
          title: 'Bidding',
          body: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextField(
                controller: _riderIdController,
                decoration: const InputDecoration(labelText: 'Rider ID'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _priceController,
                decoration: const InputDecoration(labelText: 'Price'),
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 12),
              PrimaryButton(
                label: 'Submit Bid',
                isLoading: viewModel.state.isSubmitting,
                onPressed: () {
                  //4.- Submit the bid when the inputs are valid.
                  final riderId = _riderIdController.text.trim();
                  final price = double.tryParse(_priceController.text) ?? 0;
                  if (riderId.isNotEmpty && price > 0) {
                    viewModel.submitBid(riderId: riderId, price: price);
                  }
                },
              ),
              const SizedBox(height: 16),
              Expanded(
                child: ListView.separated(
                  itemCount: viewModel.state.bids.length,
                  separatorBuilder: (_, __) => const Divider(),
                  itemBuilder: (context, index) {
                    //5.- Render each bid with selection feedback.
                    final bid = viewModel.state.bids[index];
                    final selected = bid.id == viewModel.state.selectedBidId;
                    final priceLabel = '\$${bid.price.toStringAsFixed(2)}';
                    final distanceLabel = '${(bid.distanceMeters / 1000).toStringAsFixed(2)} km';
                    return ListTile(
                      title: Text('Rider ${bid.riderId}'),
                      subtitle: Text('Price: ' + priceLabel + ' — ' + distanceLabel),
                      trailing: selected ? const Icon(Icons.check_circle, color: Colors.green) : null,
                      onTap: () => viewModel.selectBid(bid.id),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
