const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname + '../../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controllers = {

  products: (req, res) => {

    res.render('./products/products',{products}); // TODOS LOS PRODUCTOS

  },

  productCreate: (req, res) => {

    res.render('./products/productCreate'); // RENDERIZA LA PAGINA DE CREACION DEL PRODUCTO

  },

  store: (req, res) => {

    let newProduct = {
      "id": products[products.length -1]["id"]+1,
      "imagen": req.file.filename,
      "nombre": req.body.titulo,
      "descripcion": req.body.descripcion,
      "precio": req.body.precio,
      "categoria": req.body.categoria,
      "oferta": req.body.oferta
    };

    products.push(newProduct);

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,''));

    res.redirect('/'); //CREA O GUARDA EL PRODUCTO

  },

 productEdit: (req, res) => {
 
  let product = products.find(product => product.id == req.params.id);

    res.render('./products/productEdit', {product}); // RENDERIZA LA PAGINA DE EDICION DEL PRODUCTO

  },

  productDetail: (req, res) => {
    
    let product = products.find(product => product.id == req.params.id);

      res.render('./products/productDetail', {product}); // RENDERIZA LA PAGINA DETALLE DEL PRODUCTO

  },

  productCart: (req, res) => {

    res.render('./products/productCart'); // CONTROLADOR CARRITO DE COMPRAS

  },

  delete: (req, res) => {

    let productDelete = req.params.id;

    let product = products.filter(product => product.id != productDelete);

    let productStore = JSON.stringify(product);
    
    //fs.unlinkSync(path.resolve('./public/images/products/' + product[0].imagen));

    fs.writeFileSync(__dirname + '../../database/products.json', productStore);

    res.redirect('/'); // ELIMINA EL PRODUCTO

  },
  
  update: (req,res) => {

    let product = products.find(product => product.id == req.params.id);

    let newProduct = {
      "id": product.id,
      "imagen": req.file.filename,
      "nombre": req.body.titulo,
      "descripcion": req.body.descripcion,
      "precio": req.body.precio,
      "categoria": req.body.categoria,
      "oferta": req.body.oferta
    };

		let productToEdit = products.map(product => {
			if(newProduct.id == product.id) {
		return	product = newProduct;  
	}
		return product;
	}); 

  fs.writeFileSync(productsFilePath, JSON.stringify(productToEdit, null, ''))

	res.redirect('/'); // EDITA EL PRODUCTO POR SU ID
  }

};

module.exports = controllers;