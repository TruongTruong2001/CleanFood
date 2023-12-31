import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import "./AllQuidation.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../more/Metadata";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from "../../constans/ProductConstans";
import { useState } from 'react';

const AllQuidation = ({history}) => {

const dispatch = useDispatch();

const { error, products } = useSelector((state) => state.products);

const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const [daysLeft, setDaysLeft] = useState(7);

  const [filter, setFilter] = useState("");

  

  const filteredProduct1s = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  
  const filterProducts = (products) => {
    const [day, month, year] = products.expiration.split("/")
    const expirationDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    const timeDiff = expirationDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysDiff <= daysLeft && daysDiff >= 0) {
      return daysDiff === 0 ? <span className="red">Hết hạn</span> : <span className="green">Còn {daysDiff} ngày</span>;
    } else if (daysDiff < 0) {
      return  <span className="red">Hết hạn</span>
    }
    return null;
  };

useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success("Product Deleted Successfully");
        history.push("/dashboard");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, history]);

// const columns = [
//     { field: "id", headerName: "Id sản phẩm", minWidth: 100, flex: 0.2 },

//     {
//       field: "name",
//       headerName: "Tên sản phẩm",
//       Width: 150,
//       flex: 0.2,
//     },
//     {
//       field: "stock",
//       headerName: "Còn lại",
//       type: "number",
//       minWidth: 50,
//       flex: 0.2,
//     },

    

//     {
//       field: "expiration",
//       headerName: "HSD",
//       type: "string",
//       minWidth: 270,
//       flex: 0.3,
//     },
//     {
//       field: "status",
//       headerName: "Trạng thái",
//       type: "String",
//       minWidth: 70,
//       flex: 0.3,
//     },

//     {
//       field: "actions",
//       flex: 0.4,
//       headerName: "Chức năng",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (

          
//           <Fragment>


//             <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
//               <EditIcon />
//             </Link>

//             <Button
//             onClick={() =>
//                 deleteProductHandler(params.getValue(params.id, "id"))
//               }
//             >
//               <DeleteIcon />
//             </Button>
//           </Fragment>
          
//         );
//       },
//     },
//   ];
 
  
    // const rows = [
   

      
    // ];

    // products &&
    //   products.map((product, index) => {
    
    //     rows.push({
    //       id: product._id,
    //       stock: product.Stock,
    //       price: product.price,
    //       name: product.name,
    //       expiration:product.expiration, // status: filterProducts(product)
        
          
    //     });
    
    //   });
    return (

      <>

  <div>
  
    
    </div>
   {/* <ul>
      {products
      
      .map(product => (
        <li key={product.id}>
          {product.name} - Hạn sử dụng: {product.expiration}
        </li>
      ))}
    </ul>
  */}
       <Fragment>
      <MetaData title={`Danh sách sản phẩm - Admin`} />
      

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Danh sách sản phẩm thanh lý</h1>
{/* 
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> */}


      {/* <input type="text" value={filter} placeholder="Nhập vào tên sản phẩm" onChange={handleChange} /> */}
      <table class="table">

          <thead>
            <tr>
       
            {/* <th scope="col">Id</th> */}
            <th scope="col" style={{backgroudColor: "#33B77E"}}>Tên sản phẩm</th> 
            <th scope="col">Mã lô hàng</th>
            <th scope="col">Trạng thái </th>
            <th scope="col">Sắp hết hạn?
              <input
              
                type="number"
                id="daysLeft"
                value={daysLeft}
                onChange={(e) => setDaysLeft(parseInt(e.target.value))}
              />
            
            </th>
            <th scope="col">Chức năng</th>
            </tr>
          </thead>
            <tbody>
             
               {filteredProduct1s.map((product,index) => (
                 <tr>
                  
          
                      <td>
                        <img style={{width:"40px"}} src={product.images[0].url} alt="" />
                        {product.name}</td>
                      <td >{product.consignment}</td>
                      <td className={product.status == "Thanh lý" ? "red" : "greenColor"} >{product.status}</td>
                
                       <td>{filterProducts(product)}</td>
                       <td>
                                                      
                        <Fragment>

                            <Link to={`/edit/product/${product._id}`}>
                            <i class="fa-regular fa-pen-to-square" style={{color: "#0c121d"}} ></i>
                            </Link>

                            <Button
                            onClick={() =>
                                deleteProductHandler({id})
                              }
                            >
                               <i class="fa-solid fa-trash"></i>
                            </Button>
                            </Fragment>

                        
                       </td>
                  </tr>
                    ))}
            </tbody>
      </table>
        </div>
      </div>

     
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>

    </>
    )
}

export default AllQuidation;
