import Image from "next/image";

interface MenuProps {
  imageSrc: string;
  name: string;
  description: string;
  abv: number;
}

const Menu = ({ imageSrc, name, description, abv }: MenuProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "transparent",
        borderRadius: "16px",
      }}
    >
      <Image
        src={imageSrc}
        alt={name}
        width={80}
        height={80}
        style={{ borderRadius: "10px" }}
      />
      <div style={{ marginLeft: "16px" }}>
        <p style={{ fontSize: "10px", color: "#999", margin: 0 }}>
          {description}
        </p>
        <h3 style={{ fontSize: "14px", fontWeight: "bold", margin: "4px 0" }}>
          {name}
        </h3>
        <p style={{ fontSize: "12px", color: "#7174BE" }}>ABV {abv}%</p>
      </div>
    </div>
  );
};

export default Menu;
