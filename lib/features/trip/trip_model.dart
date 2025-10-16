//1.- Enumerate the statuses a trip can occupy.
enum TripStatus { idle, enRoute, arrived, completed }

//2.- Hold the data required to drive the trip view.
class TripState {
  const TripState({
    this.status = TripStatus.idle,
    this.elapsed = Duration.zero,
    this.isTimerRunning = false,
  });

  final TripStatus status;
  final Duration elapsed;
  final bool isTimerRunning;

  TripState copyWith({TripStatus? status, Duration? elapsed, bool? isTimerRunning}) {
    return TripState(
      status: status ?? this.status,
      elapsed: elapsed ?? this.elapsed,
      isTimerRunning: isTimerRunning ?? this.isTimerRunning,
    );
  }
}
