interface TitleProps {
  category: string;
  title: string;
}

const Title: React.FC<TitleProps> = ({ category, title }) => {
  return (
    <div style={{ marginLeft: "10px", marginBottom: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{category}</h2>
      <h4 style={{ fontSize: "14px", opacity: 0.5 }}>{title}</h4>
    </div>
  );
};

export default Title;
