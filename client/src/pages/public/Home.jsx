import LoginForm from "../../components/auth/LoginForm";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-10 max-w-5xl">
      <div>
        <h1 className="text-3xl text-primary mb-3">GearGuard</h1>
        <p className="text-secondary">
          Smart maintenance management for modern teams.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
