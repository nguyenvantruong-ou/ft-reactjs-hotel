import React from "react";
import Rooms from "./Rooms";

const SearchHome = () => {
    
    function A(){
        
        // remove items
        const boxes = document.querySelectorAll('#lis');
        boxes.forEach(box => {
            box.remove();
        })
 
        let dom = ``
        var kw = document.getElementById("text-search").value;  
        let api = kw.length > 0 ? "https://localhost:7034/api/Products/get-list-products?Kw=" + kw.trim() + "&Size=20&PageNumber=1" :
        "https://localhost:7034/api/Products/get-list-products?Size=20&PageNumber=1";
            fetch(api)
            .then(res => res.json())
            .then(results => {
                
                results.map((data) => { 
                    const { productId, productName, companyName, categoryName,
                        quantityPerUnit, unitPrice, unitsInStock, unitsOnOrder, reorderLevel } = data; 
                    dom +=
                            `<tr  id="lis" key={productId}>
                                <td>${productId}</td>
                                <td>${productName}</td>
                                <td>${companyName}</td>
                                <td>${categoryName}</td>
                                <td>${quantityPerUnit}</td>
                                <td>${unitPrice}</td>
                                <td>${unitsInStock}</td>
                                <td>${unitsOnOrder}</td>
                                <td>${reorderLevel}</td>
                            </tr>`;
                    
                })
                console.log(dom)
                document.getElementById('list-rooms-delete').insertAdjacentHTML('afterend', dom)
        
        });
    }
   
    return <>
        <div style={{marginLeft: "30%"}}>
            <input id="text-search" style={{width: "200px", height: "30px", marginRight: "5px"}}  type={"text"} />
            <input id="submit-search" style={{width: "70px", height: "35px", backgroundColor: "lightblue"}}  
            type={"button"} value={"Tìm"} onClick={A}/>
        </div>
        <Rooms/>
    </>
 }        
    


export default SearchHome;