export default function ResetPasswordForm() {
  return (
    <form className="bg-surface p-6 rounded">
      <h2 className="mb-4">Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        className="w-full mb-3 p-2 bg-base border-muted"
      />
      <button className="btn-brand w-full py-2">
        Reset Password
      </button>
    </form>
  );
}
