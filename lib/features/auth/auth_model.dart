//1.- Define the shape of credentials captured from the login form.
class AuthCredentials {
  const AuthCredentials({required this.email, required this.password});

  final String email;
  final String password;
}

//2.- Represent the UI state for the authentication screen.
class AuthViewState {
  const AuthViewState({
    this.isLoading = false,
    this.errorMessage,
  });

  final bool isLoading;
  final String? errorMessage;

  AuthViewState copyWith({bool? isLoading, String? errorMessage}) {
    return AuthViewState(
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage,
    );
  }
}
