import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { modalFunc } from "../redux/modalSlice";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { useLocation, useNavigate } from "react-router-dom";
import "../index.css"

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];

  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc]);

  const buttonFunc = () => {
    if (!productInfo.name || !productInfo.price || !productInfo.url) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };

  const buttonUpdateFunc = () => {
    if (!productInfo.name || !productInfo.price || !productInfo.url) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        value={productInfo?.name}
        type={"text"}
        placeholder={"Add Item..."}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
        required
      />
      <Input
        value={productInfo?.price}
        type={"text"}
        placeholder={"Add Price..."}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
        required
      />
      <Input
        type={"file"}
        placeholder={" Choose Image..."}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
        required
      />
      <Button
        btnText={loc ? "Edit Item" : "Create Item"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );

  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );

  useEffect(() => {
    if (modal && !loc) {
      setProductInfo({ name: "", price: "", url: "" });
    }
  }, [modal, loc]);

  const openModalFunc = () => {
    setProductInfo({ name: "", price: "", url: "" });
    dispatch(modalFunc());
  };

  return (
    <div>
      <Button onClick={openModalFunc} btnText="Add New Item" className={"add-btn"} />

      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Update" : "Create"}
        />
      )}
    </div>
  );
};

export default Product;
