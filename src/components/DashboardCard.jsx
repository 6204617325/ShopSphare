
function DashboardCard({ icon, title, description }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default DashboardCard;