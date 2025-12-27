export default function EmptyState({ title = "No Data" }) {
  return (
    <div className="text-secondary text-center py-10">
      {title}
    </div>
  );
}
