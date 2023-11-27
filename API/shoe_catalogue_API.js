export default function shoe_catalogue(catalog) {

  async function showAllShoes(req, res) {
    try {
      let shoes = await catalog.getAllShoes();
      res.json({
        status: 'success',
        data: shoes
      });
    }
    catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }
  };


  async function filterShoesBySize(req, res) {
    try {

      const filterBySize = req.params.size;
      const chooseShoeSize = await catalog.getAllShoeSizes(filterBySize);
      res.json({
        status: 'success',
        data: chooseShoeSize
      });
    }
    catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }

  };


  async function filterShoeColors(req, res) {
    try {

      const filterByColor = req.params.color;
      const chooseShoeColor = await catalog.getShoeColors(filterByColor);
      res.json({
        status: 'success',
        data: chooseShoeColor
      });
    }
    catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }

  };

  async function filterShoeByBrandName(req, res) {
    try {

      const filterByBrandName = req.params.brandname;
      const chooseShoeBrandName = await catalog.shoeBrandName(filterByBrandName);
      res.json({
        status: 'success',
        data: chooseShoeBrandName
      });
    }
    catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }

  };


  async function filterShoeByBrandNameAndSize(req, res) {
    try {

      const { brandname, size } = req.params;
      const chooseShoeBrandNameAndSize = await catalog.shoeBrandNameAndSize(brandname, size);
      res.json({
        status: 'success',
        data: chooseShoeBrandNameAndSize
      });
    }
    catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }

  };



  async function sold_shoes(req, res) {
    try {
      const shoeId = req.params.id;
      const stockUpdate = await catalog.update_sold_shoes(shoeId);
      res.json({
        status: "success",
        data: stockUpdate,
      });
    }
    catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }
  }



  async function insert(req, res) {
    try {
      const { name, brand, size, color, price, in_stock, image_url } = req.body;
      const insertShoe = await catalog.insert_shoes(name, brand, size, color, price, in_stock, image_url);
      res.status(201).json({
        status: "success",
        data: insertShoe,
      });
    } catch (err) {
      res.json({
        status: "error",
        error: err.stack
      });
    }
  }

  return {
    showAllShoes,
    filterShoesBySize,
    filterShoeColors,
    filterShoeByBrandName,
    filterShoeByBrandNameAndSize,
    sold_shoes,
    insert
  }
}