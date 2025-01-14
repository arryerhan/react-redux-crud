import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteDataFunc } from "../redux/dataSlice";
import { updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ dt }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateFunc = () => {
    dispatch(modalFunc());
    setOpenEdit(false);
    navigate(`/?update=${dt?.id}`);
  };
  return (
    <div className="w-[230px] relative rounded-md m-2 mt-5">
      <img
        className="w-[230px] h-[230px] object-contain border "
        src={dt?.url}
        alt=""
      />
      <div className="bg-zinc-300 text-black w-full">
        <div className="text-lg font-bold text-gray-700 px-2">{dt?.name}</div>
        <div className="text-lg font-bold text-gray-700 px-2">${dt?.price}</div>
      </div>
      <div
        onClick={() => setOpenEdit(!openEdit)}
        className="absolute top-2 right-3"
      >
        <BsThreeDots color="white" size={24} />
      </div>
      {openEdit && (
        <div className="bg-zinc-600 border border-white text-white absolute top-3 right-2 p-1 text-sm">
          <div
            onClick={() => dispatch(deleteDataFunc(dt?.id))}
            className=" w-18 bg-red-700 cursor-pointer"
          >
            Delete
          </div>
          <div onClick={updateFunc} className=" w-18 mt-1 bg-blue-700 px-2 text-center cursor-pointer">
            Edit
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;