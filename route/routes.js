export default function routes(logic) {

    const homeRoute = async (req, res) => {
        res.render('index');
    }


    
    const allShoes = async (req, res,next) => {
        try{

            const allShoesData = await logic.getAllShoes();
            res.render(allShoesData);
        }
        catch (err){
            next(err);
        }
        
    }


    const allSizes = async (req, res) => {
        const size = req.params.size;
        const selectShoeSize = await logic.getAllShoeSizes(size);
        res.json(selectShoeSize);
    }

    const allShoeColors = async (req, res) => {
        const color = req.params.color;
        const selectShoeColor = await logic.getShoeColors(color);
        res.json(selectShoeColor);
    }

    const allShoeBrandName = async (req, res) => {
        const brandname = req.params.brandname;
        const selectShoesBrand = await logic.shoeBrandName(brandname);
        res.json(selectShoesBrand);
    }

    const allShoeBrandNameAndSize = async (req, res) => {
        const {brandname,size} = req.params;
        const selectShoesBrandAndSize = await logic.shoeBrandNameAndSize(brandname,size);
        res.json(selectShoesBrandAndSize);
    }
    return {
        homeRoute,
        allShoes,
        allSizes,
        allShoeColors,
        allShoeBrandName,
        allShoeBrandNameAndSize

    }
}