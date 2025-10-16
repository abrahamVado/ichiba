//1.- Represent a single bid surfaced to the driver.
class Bid {
  const Bid({
    required this.id,
    required this.riderId,
    required this.price,
    required this.distanceMeters,
  });

  final String id;
  final String riderId;
  final double price;
  final double distanceMeters;
}

//2.- Store the overall bidding UI state.
class BiddingState {
  const BiddingState({
    this.bids = const [],
    this.selectedBidId,
    this.isSubmitting = false,
  });

  final List<Bid> bids;
  final String? selectedBidId;
  final bool isSubmitting;

  BiddingState copyWith({
    List<Bid>? bids,
    String? selectedBidId,
    bool? isSubmitting,
  }) {
    return BiddingState(
      bids: bids ?? this.bids,
      selectedBidId: selectedBidId ?? this.selectedBidId,
      isSubmitting: isSubmitting ?? this.isSubmitting,
    );
  }
}
