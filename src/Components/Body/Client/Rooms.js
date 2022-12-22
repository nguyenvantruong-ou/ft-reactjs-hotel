import React  from "react";

export default class Rooms extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            response: []
        }
        
    }
    

    componentDidMount() { 
        var kw = document.getElementById("text-search").value;
        let api = kw.length > 0 ? "https://localhost:7034/api/Products/get-list-products?Kw=" + kw + "&Size=20&PageNumber=1" :
        "https://localhost:7034/api/Products/get-list-products?Size=20&PageNumber=1";
        fetch(api)
          .then(res => res.json())
          .then(results => { 
            this.setState({
                response: results,
            });
            console.log(this.state.response)
        })
        .catch(error => console.log('error', error));
      }

    renderTableData() {
        return this.state.response.map(data => { 
          const { productId, productName, companyName, categoryName,
            quantityPerUnit, unitPrice, unitsInStock, unitsOnOrder, reorderLevel } = data
          return (
            <tr id="lis" key={productId}>
              <td>{productId}</td>
              <td>{productName}</td>
              <td>{companyName}</td>
              <td>{categoryName}</td>
              <td>{quantityPerUnit}</td>
              <td>{unitPrice}</td>
              <td>{unitsInStock}</td>
              <td>{unitsOnOrder}</td>
              <td>{reorderLevel}</td>
            </tr>
          )
        })
      }


    render () {
        return <> <div>ABC</div>
            <table id="list-rooms" style={{border: "1px solid", width: "100%"}}>
                <thead style={{ backgroundColor: "lightblue"}}>
                    <tr>
                        <th>productId</th>
                        <th>productName</th>
                        <th>supplierName</th>
                        <th>categoryName</th>
                        <th>quantityPerUnit</th>
                        <th>unitPrice</th>
                        <th>unitsInStock</th>
                        <th>unitsOnOrder</th>
                        <th>reorderLevel</th>
                    </tr>
                </thead>
                
                <tbody id="list-rooms-delete" style={{textAlign: "center"}}>
                    {this.renderTableData()}
                </tbody>
            </table>
        </> 
    }
}

// function renderArticles(articles) {
//     if (articles.length > 0) {      
//         return articles.map((article, index) => (
//             <Article key={index} article={article} />
//         ));
//     }
//     else return [];
// }

// const Article = ({article}) => {
//     return ( 
//         <article key={article.id}>
//             <a href={article.link}>{article.title}</a>
//             <p>{article.description}</p>
//         </article>
//     );
// };
