export default function ForgotPasswordForm() {
  return (
    <form className="bg-surface p-6 rounded">
      <h2 className="mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 bg-base border-muted"
      />
      <button className="btn-brand w-full py-2">
        Send Reset Link
      </button>
    </form>
  );
}
