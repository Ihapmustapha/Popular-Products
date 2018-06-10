class ProductList extends React.Component {
    handleProductUpVote(productId) {
        console.log(productId + ' was upvoted'); 
    }
    render () { 
        //To sort Array Items before it's constructed we use arr.sort([compareFunction])
        const products = Seed.products.sort((a, b) => (
            b.votes - a.votes //to do sorting in descending order 
        )); 
        //productComponents is a variable to store the return values of the arrow function in a new array
        const productComponents = Seed.products.map((product) => (
            <Product 
            //key is a unique proberty used by React to distinguish each item 
            key= {'product- ' + product.id}
            id= {product.id}
            title= {product.title}
            description= {product.description}
            url= {product.url}
            votes= {product.votes}
            submitterAvatarUrl= {product.submitterAvatarUrl}
            productImageUrl= {product.productImageUrl}
            //to pass the function handleProductListUpVote as a prop
            onVote= {this.handleProductUpVote}
        /> 
        )); 

        //to render all of the list items we just use {product Components}
        return (
            <div className='ui unstackable items'>
                
                {productComponents}
            </div> 
        );
    }
}

class Product extends React.Component {
    //Constructor function is used to define 'this' keyword to other component's functions, 
    //due to it's only refers to the component by default only inside render(), otherwise 'this' will refer to null
    constructor(props) {
        super(props); 
        //to bind the custom component method 'handleUpVote' to the component 'Product' 
        this.handleUpVote = this.handleUpVote.bind(this); 
    }

    handleUpVote() {
        this.props.onVote(this.props.id); 
    }

    render () {
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick = {this.handleUpVote}>
                            <i className='large caret up icon'/>
                        </a> 
                        {this.props.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>{this.props.description}</p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by: </span>
                        <img className='ui avatar image' src= {this.props.submitterAvatarUrl}/> 
                    </div>
                </div>
            </div>     
        ); 
    }
}

ReactDOM.render(
    <ProductList />, document.getElementById('content')
);