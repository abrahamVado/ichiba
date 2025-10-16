//1.- Describe the data received for a rider near the driver.
class NearbyRider {
  const NearbyRider({
    required this.id,
    required this.name,
    required this.distanceMeters,
  });

  final String id;
  final String name;
  final double distanceMeters;
}

//2.- Track the current state of the tracking module.
class TrackingState {
  const TrackingState({
    this.riders = const [],
    this.isListening = false,
  });

  final List<NearbyRider> riders;
  final bool isListening;

  TrackingState copyWith({List<NearbyRider>? riders, bool? isListening}) {
    return TrackingState(
      riders: riders ?? this.riders,
      isListening: isListening ?? this.isListening,
    );
  }
}
