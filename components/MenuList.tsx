import Menu from "./Menu";

interface MenuItem {
  imageSrc: string;
  name: string;
  description: string;
  abv: number;
}

interface MenuListProps {
  menuItems: MenuItem[];
}

const MenuList = ({ menuItems }: MenuListProps) => {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        marginBottom: "50px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.08)",
      }}
    >
      {menuItems.map((item: MenuItem, index: number) => (
        <Menu
          key={index}
          imageSrc={item.imageSrc}
          name={item.name}
          description={item.description}
          abv={item.abv}
        />
      ))}
    </div>
  );
};

export default MenuList;
