import { ChangeEvent, useEffect, useState, useRef } from "react";
import ProductCard from "./components/ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const ProductListing = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const [textString, setTextString] = useState<string>("");

  useEffect(() => {
    getProductList();
  }, []);

  //   function debounce(cb, time: number) {
  //     let timer: number;
  //     return function () {
  //       if (timer) clearTimeout(timer);
  //       timer = setTimeout(() => {
  //         cb()
  //       }, time);
  //     };
  //   }

  //   const data = debounce(getFilteredProduct, 1000);

  const myDebounced = (cb, d: number) => {
    let timer: number;

    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb();
      }, d);
    };
  };

  const getFilteredProduct = (): void => {
    console.log("clllll1111");
    if (textString.trim() === "") {
      setFilteredData(productsData);
    } else {
      const newData = productsData?.filter((item) =>
        item?.category?.toUpperCase().includes(textString?.toUpperCase())
      );

      setFilteredData(newData);
    }
  };
  const debouncedCall = useRef(myDebounced(getFilteredProduct, 1000)).current;

  useEffect(() => {
    //  This ome is first approach
    // const time = setTimeout(() => {
    //   getFilteredProduct();
    // }, 1000);
    // return () => clearTimeout(time);
    // debounce(getFilteredProduct, 1000);
    debouncedCall();
  }, [textString, productsData]);

  const getProductList = async () => {
    try {
      const productRes = await fetch("https://fakestoreapi.com/products");
      const data = await productRes.json();
      setProductsData(data);
    } catch (error) {
      console.log("error___", error);
    }
  };

  return (
    <div>
      <div
        style={style.inputContainer}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTextString(e.target.value);
        }}
      >
        <input
          type="text"
          placeholder="search item by category"
          style={{
            padding: "10px 10px",
            border: "1px solid #000",
            textAlign: "left",
            width: "30%",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={style.container}>
        {filteredData?.map((product) => (
          <ProductCard
            key={product.id}
            Title={product.title}
            description={product.description}
            price={product.price}
            category={product.category}
            image={product?.image}
          />
        ))}
      </div>
    </div>
  );
};

const style = {
  container: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  inputContainer: {
    margin: "20px",
  },
};

export default ProductListing;
