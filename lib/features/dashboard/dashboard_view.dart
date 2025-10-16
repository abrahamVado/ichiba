import 'package:flutter/material.dart';

import '../bidding/bidding_view.dart';
import '../tracking/tracking_view.dart';
import '../trip/trip_view.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    //1.- Provide a tab scaffold that switches between the feature areas.
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Driver Dashboard'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Tracking'),
              Tab(text: 'Bidding'),
              Tab(text: 'Trip'),
            ],
          ),
        ),
        //2.- Map each tab to its respective feature screen.
        body: const TabBarView(
          children: [
            TrackingView(),
            BiddingView(),
            TripView(),
          ],
        ),
      ),
    );
  }
}
