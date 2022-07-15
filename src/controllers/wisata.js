const { wisata } = require('../../models')

exports.addWisata = async (req, res) => {
    try {
        const data = {
            nama: req.body.nama,
            desc: req.body.desc,
            lokasi: req.body.lokasi,
            photo: req.body.photo,
            streetview: req.body. streetview,
        };

        let newWisata = await wisata.create(data);

        let wisataData = await wisata.findOne({
            where: {
                id: newWisata.id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        wisataData = JSON.parse(JSON.stringify(wisataData))

        res.send({
            status: "success",
            data: {
                wisata: {
                    ...wisataData,
                    bookPdf: process.env.FILE_PATH_WISATA 
                },
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "Failed",
            message: "Server Error",
        });
    }
};

// exports.getBooks = async (req, res) => {
//     try {
//         let data = await book.findAll({
//             where: {
//                 price: {
//                     [Op.gte]: 10,
//                 },
//             },
//             attributes: {
//                 exclude: ["createdAt", "updatedAt"],
//             },
//         });

//         data = JSON.parse(JSON.stringify(data))
//         data = data.map((item) => {
//             return {
//                 ...item,
//                 bookImg: process.env.FILE_PATH_IMAGE + item.bookImg,
//                 bookPdf: process.env.FILE_PATH_PDF + item.bookPdf
//             }
//         })

//         res.send({
//             status: "success",
//             data: {
//                 books: data,
//             },
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({
//             status: "Failed",
//             message: "Server Error",
//         });
//     }
// };

// exports.getBook = async (req, res) => {
//     try {
//         const { id } = req.params;

//         let data = await book.findOne({
//             where: {
//                 id,
//             },
//             attributes: {
//                 exclude: ["createdAt", "updatedAt"],
//             },
//         });

//         data = JSON.parse(JSON.stringify(data))
//         data = {
//             ...data,
//             bookImg: process.env.FILE_PATH_IMAGE + data.bookImg,
//             bookPdf: process.env.FILE_PATH_PDF + data.bookPdf
//         };

//         res.send({
//             status: "success",
//             data: {
//                 book: data,
//             },
//         });
//     } catch (error) {
//         res.send({
//             status: "Failed",
//             message: "Server Error",
//         });
//     }
// };

// exports.updateBooks = async (req, res) => {
//     try {
//         const { id } = req.params;

//         let data = {
//             price: req.body.price,
//         };

//         await book.update(data, {
//             where: {
//                 id,
//             },
//         });

//         let bookData = await book.findOne({
//             where: {
//                 id,
//             },
//             attributes: {
//                 exclude: ["createdAt", "updatedAt"],
//             },
//         });

//         res.send({
//             status: "success",
//             bookData,
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({
//             status: "Failed",
//             message: "Server Error",
//         });
//     }
// };

// exports.deleteBook = async (req, res) => {
//     try {
//         const { id } = req.params;

//         await book.destroy({
//             where: {
//                 id,
//             },
//         });

//         res.send({
//             status: "Delete success",
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({
//             status: "Failed",
//             message: "Server Error",
//         });
//     }
// };

// exports.promoBooks = async (req, res) => {
//     try {
//         let data = await book.findAll({
//             where: {
//                 price: {
//                     [Op.lte]: 100000,
//                 },
//             },
//             attributes: {
//                 exclude: ["createdAt", "updatedAt"],
//             },
//         });

//         data = data.map((item) => {
//             return {
//                 item,
//                 bookPdf: process.env.FILE_PATH_PDF + item.bookPdf,
//                 bookImg: process.env.FILE_PATH_IMAGE + item.bookImg,
//             }
//         });

//         res.send({
//             status: "success",
//             data: {
//                 promoBooks: data,
//             },
//         });
//     } catch (error) {
//         console.log(error);
//         res.send({
//             status: "Failed",
//             message: "Error Fetching Promo Books",
//         });
//     }
// };