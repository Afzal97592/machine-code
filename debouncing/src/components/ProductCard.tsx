import "./productCard.css";

interface Props {
  Title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

const ProductCard = ({
  Title = "",
  description = "",
  category = "",
  price = 0,
  image = "",
}: Props) => {
  return (
    <div className="container">
      <div className="card">
        <h4>{Title}</h4>
        <img src={image} alt="productImg" />
        <p>{description}</p>
        <div className="bottom">
          <p className="category">{category}</p>
          <p className="price">{`Price - ${price}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
