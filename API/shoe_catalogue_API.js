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


  async function filterShoesBySize(req, res){
    try{

      const filterBySize = req.params.size;
      const chooseShoeSize = await catalog.getAllShoeSizes(filterBySize);
      res.json({
        status: 'success',
        data: chooseShoeSize
      });
    }
    catch(err){
      res.json({
        status: "error",
        error: err.stack
      });
    }
    
  };


  async function filterShoeColors(req, res){
    try{

      const filterByColor = req.params.color;
      const chooseShoeColor = await catalog.getShoeColors(filterByColor);
      res.json({
        status: 'success',
        data: chooseShoeColor
      });
    }
    catch(err){
      res.json({
        status: "error",
        error: err.stack
      });
    }
    
  };

  async function filterShoeByBrandName(req, res){
    try{

      const filterByBrandName = req.params.brandname;
      const chooseShoeBrandName = await catalog.shoeBrandName(filterByBrandName);
      res.json({
        status: 'success',
        data: chooseShoeBrandName
      });
    }
    catch(err){
      res.json({
        status: "error",
        error: err.stack
      });
    }
    
  };


  async function filterShoeByBrandNameAndSize(req, res){
    try{

      const { brandname, size } = req.params;
      const chooseShoeBrandNameAndSize = await catalog.shoeBrandNameAndSize(brandname,size);
      res.json({
        status: 'success',
        data: chooseShoeBrandNameAndSize
      });
    }
    catch(err){
      res.json({
        status: "error",
        error: err.stack
      });
    }
    
  };



  return {
    showAllShoes,
    filterShoesBySize,
    filterShoeColors,
    filterShoeByBrandName,
    filterShoeByBrandNameAndSize

  }
}