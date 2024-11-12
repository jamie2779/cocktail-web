interface NavItemProps {
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      {icon}
      <span style={{ marginLeft: "8px", fontSize: "14px", color: "#30336b" }}>
        {label}
      </span>
    </div>
  );
};

export default NavItem;
